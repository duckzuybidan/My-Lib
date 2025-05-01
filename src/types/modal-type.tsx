import { Area, Point } from "react-easy-crop";

export type ModalType = keyof IModalData;
interface IGenericModalData {
  title: string;
  description?: string;
}
interface IDeleteModalData extends IGenericModalData { }
interface IEditImageModalData extends IGenericModalData {
  imageSrc: string | undefined;
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
  data: IModalData[ModalType];
  onSubmit: () => void;
  openModal: <K extends ModalType>(payload: { type: K; data: IModalData[K]; onSubmit: () => void }) => void;
  setData: <K extends ModalType>(payload: { data: IModalData[K] }) => void;
  closeModal: () => void;
};