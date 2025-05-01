import { Area, Point } from "react-easy-crop";

export type ModalType = "DELETE" | "EDIT_IMAGE" | "";
interface IGenericModalData {
  title: string;
  description?: string;
}
interface IDeleteModalData extends IGenericModalData { }
interface IEditImageModalData extends IGenericModalData {
  imageSrc: string;
  width: number;
  height: number;
  shape: "rect" | "round";
  crop: Point;
  zoom: number;
  onCropChange: (crop: Point) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}
export interface IModalData {
  "DELETE": IDeleteModalData
  "EDIT_IMAGE": IEditImageModalData
  "": undefined;
}

export interface IModalState {
  isOpen: boolean;
  type: ModalType;
  data: IModalData[ModalType]
  onSubmit: () => void;
  openModal: (payload: { type: ModalType; data: IModalData[ModalType]; onSubmit: () => void }) => void;
  setData: (payload: { data: IModalData[ModalType] }) => void;
  closeModal: () => void;
};