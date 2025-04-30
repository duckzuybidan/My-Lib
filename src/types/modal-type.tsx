export type ModalType = "DELETE" | "";
export interface IGenericModalData {
  title: string;
  description?: string;
}
export interface IDeleteModalData extends IGenericModalData { }
export interface IModalData {
  "DELETE": IDeleteModalData
  "": null;
}
export interface ISubmitDeleteData { }
export interface ISubmitData {
  "DELETE": ISubmitDeleteData
}


export interface IModalState {
  isOpen: boolean;
  type: ModalType;
  data: IModalData[ModalType]
  onSubmit: (value?: ISubmitData) => void;
  openModal: (payload: { type: ModalType; data: IModalData[ModalType]; onSubmit: (value?: ISubmitData) => void }) => void;
  closeModal: () => void;
};