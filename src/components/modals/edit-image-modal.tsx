import useModal from "@/hooks/useModal"
import { IModalData } from "@/types/modal-type"
import TemplateModal from "./template-modal"
import Cropper, { Area, Point } from "react-easy-crop"

const EditImageModal = () => {
  const { data, setData } = useModal() as { data: IModalData["EDIT_IMAGE"], setData: (payload: { data: IModalData["EDIT_IMAGE"] }) => void }
  const { imageSrc, crop, zoom, onCropChange, onZoomChange, onCropComplete, width, height, shape } = data
  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => onCropComplete(croppedArea, croppedAreaPixels)
  const handleCropChange = (crop: Point) => {
    setData({ data: { ...data, crop } })
    onCropChange(crop)
  }
  const hanZoomChange = (zoom: number) => {
    setData({ data: { ...data, zoom } })
    onZoomChange(zoom)
  }

  return (
    <TemplateModal className="min-w-1/2 min-h-1/2" submitText="Save">
      <div className="flex items-center justify-center">
        <div className="relative bg-neutral-500 h-[400px] w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            onCropComplete={handleCropComplete}
            onCropChange={handleCropChange}
            onZoomChange={hanZoomChange}
            restrictPosition={false}
            objectFit={shape === "rect" ? "contain" : "cover"}

            cropShape={shape}
            aspect={width / height}
            style={{
              cropAreaStyle: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0",
                border: "2px solid rgba(0, 0, 0, 0.5)",
                backgroundSize: `${width / 3}px 100%`,
                boxSizing: "border-box"
              },
            }}
            maxZoom={3}
            minZoom={0.1}
            zoomSpeed={0.01}
          />
        </div>
      </div>
    </TemplateModal>
  )
}

export default EditImageModal