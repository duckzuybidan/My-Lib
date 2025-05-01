import { IModalState } from "@/types/modal-type";
import { create } from "zustand";


/**
 * `useModal` is a Zustand store for managing the state of modals in the application.
 * It supports different modal types (e.g., "DELETE") with associated data and actions.
 * The store provides functions to open and close modals, with customizable content and submission behavior.
 * 
 * The store maintains the following state:
 * - `isOpen`: A boolean indicating whether the modal is open or not.
 * - `type`: The type of the modal, which corresponds to a key in the `IModalData` type (e.g., "DELETE").
 * - `data`: The modal data associated with the current modal type, structured according to the `IModalData` type.
 * - `onSubmit`: A callback function triggered when the modal's submit action is executed, with optional submit data.
 * 
 * The store exposes the following actions:
 * - `openModal`: Opens the modal, sets its type, data, and submission handler.
 * - `closeModal`: Closes the modal and resets the state.
 * - `setData`: Updates the modal data without changing the modal type.
 * 
 * Example usage:
 * ```tsx
 * const { isOpen, openModal, closeModal, type, data, onSubmit, setData } = useModal();
 * 
 * // To open the modal
 * openModal({
 *   type: 'DELETE',
 *   data: { title: 'Delete Item', description: 'Are you sure you want to delete this item?' },
 *   onSubmit: (data) => { console.log('Item deleted:', data); },
 * });
 * 
 * // To update the modal data without changing the modal type
 * setData({ data: { title: 'Update Item', description: 'Are you sure you want to update this item?' } });
 * 
 * // To close the modal
 * closeModal();
 * ```
 */
const useModal = create<IModalState>((set) => ({
  isOpen: false,
  type: "",
  data: undefined,
  onSubmit: () => { },
  openModal: ({ type, data, onSubmit }) =>
    set({
      isOpen: true,
      type,
      data,
      onSubmit,
    }),
  setData: ({ data }) => set((state) => ({ ...state, data })),
  closeModal: () =>
    set({
      isOpen: false,
      type: "",
      data: undefined,
      onSubmit: () => { },
    }),
}));

export default useModal;
