import ReactDOM from "react-dom";
import DeleteModal from "@/components/modals/delete-modal";
import EditImageModal from "@/components/modals/edit-image-modal";
import useModal from "@/hooks/useModal";

const Modals = () => {
  const { isOpen, type } = useModal();

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50">
      {type === "DELETE" && <DeleteModal />}
      {type === "EDIT_IMAGE" && <EditImageModal />}
    </div>
  );

  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default Modals;
