import { IModalState } from "@/types/modal-type";
import { create } from "zustand";



const useModal = create<IModalState>((set) => ({
  isOpen: false,
  type: "",
  data: null,
  onSubmit: () => {},
  openModal: ({type, data, onSubmit}) =>
    set({
      isOpen: true,
      type,
      data,
      onSubmit,
    }),
  closeModal: () => 
    set({
      isOpen: false,
      type: "",
      data: null,
      onSubmit: () => {},
    }),
}));

export default useModal;
