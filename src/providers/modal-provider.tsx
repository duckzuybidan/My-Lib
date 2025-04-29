import DeleteModal from "@/components/modals/delete-modal"
import useModal from "@/hooks/useModal"


const ModalProvider = () => {
  const {
    isOpen,
    type
  } = useModal()
  if(!isOpen){
    return null
  }
  return (
    <>
      {type === "DELETE" && <DeleteModal />}
    </>
  )
}

export default ModalProvider