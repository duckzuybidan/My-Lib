

import CustomSelectImage from "./components/custom/custom-select-image";
import ModalProvider from "./providers/modal-provider";

const App = () => {
  return (
    <>
      <ModalProvider />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <CustomSelectImage width={100} height={100} onChange={(file) => console.log(file)}>
          <CustomSelectImage.ImageContainer className="shadow-xl inset-shadow-accent-foreground" />
          <CustomSelectImage.EmptyContainer />
        </CustomSelectImage>
      </div>
    </>
  )
}

export default App