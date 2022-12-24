type ModalTypes = {
    children : string
   
}

  
function PostSettingsModal(props : ModalTypes) {
  return (
    <div  className="absolute left-0 top-0 bottom-0 w-[100vw] flex h-screen items-center justify-center
    bg-black/60 overflow-y-scroll hide-scrollbar z-20
    ">
    <div className="w-[300px] md:w-[490px] rounded-xl drop-shadow-2xl py-2 px-4 xs:w-4/5 sm:w-4/6 bg-gray-100 border border-gray-300 
    animate-slidedown mt-[410px] xs:mt-[450px] xs:mb-[60px] z-30
    ">
         

        {props.children}
    </div>
    </div>
  )
}

export default PostSettingsModal