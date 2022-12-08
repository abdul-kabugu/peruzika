type ModalTypes = {
    children : string
   
}

  
function Modal(props : ModalTypes) {
  return (
    <div  className="absolute w-[100vw] flex h-screen items-center justify-center
     bg-white/75
    ">
    <div className="w-[300px]  rounded-xl drop-shadow-2xl py-2 px-4 xs:w-4/5 sm:w-4/6 bg-gray-100 border border-gray-300  
    animate-slidedown
    ">
         

        {props.children}
    </div>
    </div>
  )
}

export default Modal