
import { Check, ImageUp, Pencil } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Cropper from "react-easy-crop";
import { cn } from '@/lib/utils';
interface ICustomSelectImageContext {
  width: number
  height: number
  imageSrc: string | undefined
  setImageSrc: (imageSrc: string) => void
  crop: { x: number, y: number }
  setCrop: (crop: { x: number, y: number }) => void
  zoom: number
  setZoom: (zoom: number) => void
  handleCropComplete: (croppedArea: IArea, croppedAreaPixels: IArea) => void
  handleCrop: () => void
  triggerFileSelect: () => void
}
interface ISelectImageProps {
  width: number
  height: number
  onChange?: (imageSrc: string) => void
  children?: React.ReactNode
}
interface ISelectImageComponent extends React.FC<ISelectImageProps> {
  ImageContainer: React.FC<IImageContainer>;
  EmptyContainer: React.FC<IEmptyContainer>;
}

interface IArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface IContainer {
  className?: string
  style?: React.CSSProperties
}
interface IImageContainer extends IContainer { }
interface IEmptyContainer extends IContainer { }
const getCroppedImg = async (imageSrc: string, pixelCrop: IArea, zoom: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas is empty"));
        return;
      }
      canvas.width = pixelCrop.width * zoom;
      canvas.height = pixelCrop.height * zoom;

      ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width * zoom, pixelCrop.height * zoom
      );
      const dataUrl = canvas.toDataURL("image/jpeg");
      resolve(dataUrl);
    };
    image.onerror = (error) => reject(error);
  });
}
const SelectImageContext = React.createContext<ICustomSelectImageContext | null>(null);
const useSelectImageContext = ({ errorMessage }: { errorMessage: string }) => {
  const context = React.useContext(SelectImageContext);
  if (!context) {
    throw new Error(errorMessage);
  }
  return context;
}

/**
 * `SelectImage` is a component that allows the user to upload and crop an image. 
 * It provides context for managing the image's state, cropping behavior, zoom level, and file selection.
 * The component consists of two main containers: `ImageContainer` (for displaying the image and cropping controls)
 * and `EmptyContainer` (for displaying a button to trigger file selection).
 * 
 * @param {number} width - The width of the image container (both `ImageContainer` and `EmptyContainer`).
 * @param {number} height - The height of the image container (both `ImageContainer` and `EmptyContainer`).
 * @param {(imageSrc: string) => void} [onChange] - An optional callback function to handle the updated image source after cropping.
 * @param {React.ReactNode} [children] - Optional children to render inside the `SelectImage` component. 
 * The children can be `ImageContainer` or `EmptyContainer`.
 * 
 * @returns {JSX.Element} The `SelectImage` component that enables image selection and cropping functionality.
 * 
 * @example
 * ```tsx
 * <SelectImage width={500} height={500} onChange={(src) => console.log(src)}>
 *   <SelectImage.ImageContainer/>
 *   <SelectImage.EmptyContainer />
 * </SelectImage>
 * ```
 */
const SelectImage: React.FC<ISelectImageProps> = ({ width, height, onChange, children }) => {
  const [imageContainer, setImageContainer] = useState(React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ImageContainer
  ) || null);
  const [emptyContainer, setEmptyContainer] = useState(React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === EmptyContainer
  ) || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<IArea | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const triggerFileSelect = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result as string);
        onChange?.(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleCropComplete = (_: IArea, croppedAreaPixels: IArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }
  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels!, zoom);
      if (croppedImage) {
        onChange?.(croppedImage);
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  }
  useEffect(() => {
    setImageContainer(React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === ImageContainer
    ) || null)
    setEmptyContainer(React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === EmptyContainer
    ) || null)
  }, [children])
  const value = {
    width,
    height,
    imageSrc,
    setImageSrc,
    crop,
    setCrop,
    zoom,
    setZoom,
    handleCropComplete,
    handleCrop,
    triggerFileSelect
  }
  return (
    <SelectImageContext.Provider value={value}>
      <div
        style={{
          width: width,
          height: height,
        }}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        {imageSrc ? (
          <>{imageContainer}</>
        ) : (
          <>{emptyContainer}</>
        )}
      </div>
    </SelectImageContext.Provider>
  )
}

/**
 * `ImageContainer` is used within the `SelectImage` component to display the selected image and provides cropping controls. 
 * It utilizes `react-easy-crop` to enable users to crop the image, adjust the zoom, and reposition the crop area.
 * 
 * @param {string} [className] - Optional class name to apply custom styles to the container.
 * @param {React.CSSProperties} [style] - Optional inline styles to apply to the container.
 * 
 * @returns {JSX.Element} The `ImageContainer` component that displays the image along with crop and zoom functionality.
 * 
 */
const ImageContainer: React.FC<IImageContainer> = ({ className, style }) => {
  const {
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    width,
    height,
    handleCropComplete,
    handleCrop,
    triggerFileSelect
  } = useSelectImageContext(
    { errorMessage: "ImageContainer must be used within a CustomSelectImage" }
  );
  return (
    <div
      className={cn("relative overflow-hidden w-full h-full border-none", className)}
      style={style}
    >
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropComplete={handleCropComplete}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        cropSize={{
          width: width,
          height: height
        }}
      />
      <div
        className='absolute top-2 right-2 cursor-pointer bg-white/50 p-1 rounded-full hover:bg-white'
        onClick={triggerFileSelect}
      >
        <Pencil size={12} className='text-black' />
      </div>
      <div
        className='absolute top-1/2 left-1/2 cursor-pointer bg-white/50 p-1 rounded-full hover:bg-white'
        onClick={handleCrop}
        onMouseDown={(e => e.preventDefault())}
      >
        <Check size={12} className='text-black' />
      </div>
    </div>
  );
}

/**
 * `EmptyContainer` is used within the `SelectImage` component to provide a clickable area 
 * that allows users to trigger a file selection dialog for uploading an image. 
 * It is shown when no image has been selected.
 * 
 * @param {string} [className] - Optional class name to apply custom styles to the container.
 * @param {React.CSSProperties} [style] - Optional inline styles to apply to the container.
 * 
 * @returns {JSX.Element} The `EmptyContainer` component that allows users to upload an image.
 */
const EmptyContainer: React.FC<IEmptyContainer> = ({ className, style }) => {
  const { triggerFileSelect } = useSelectImageContext(
    { errorMessage: "EmptyContainer must be used within a CustomSelectImage" }
  );
  return (
    <div
      onClick={triggerFileSelect}
      className={cn('w-full h-full flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300', className)}
      style={style}
    >
      <ImageUp />
    </div>
  );
}
const CustomSelectImage = SelectImage as ISelectImageComponent;
CustomSelectImage.ImageContainer = ImageContainer;
CustomSelectImage.EmptyContainer = EmptyContainer;

export default CustomSelectImage;