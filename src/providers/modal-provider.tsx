import DeleteModal from "@/components/modals/delete-modal"
import EditImageModal from "@/components/modals/edit-image-modal"
import useModal from "@/hooks/useModal"


const ModalProvider = () => {
  const {
    isOpen,
    type
  } = useModal()
  if (!isOpen) {
    return null
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50">
      {type === "DELETE" && <DeleteModal />}
      {type === "EDIT_IMAGE" && <EditImageModal />}
    </div>
  )
}

export default ModalProvider