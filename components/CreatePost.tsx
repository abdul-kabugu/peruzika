// @ts-nocheck
import {useState, useRef} from 'react'
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import { FiPlus } from 'react-icons/fi';
import { BiHash } from 'react-icons/bi';
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'
import { CircleLoader } from 'react-spinners';
import { RiImageAddFill } from 'react-icons/ri';
import { useUploadToIPFS, useGetUserProfiles, usePublish } from '../hooks/lens-react';
import { useDisplayImage } from '../hooks/orbis-react';

export default function CreatePost() {
    const [postTxt, setpostTxt] = useState("")
   // const orbis = new Orbis()
    const [isAddMedia, setisAddMedia] = useState(false)
    const [postFile, setpostFile] = useState([])
   
    const [theData, settheData] = useState()
    const {userProfiles, isUserProfileError, isUserProfilesLoading} = useGetUserProfiles()
      console.log("the user profiles", userProfiles)
    
    const toggleIsAddMedia = () => {
      isAddMedia ? setisAddMedia(false) : setisAddMedia(true)
    }
    const imgRef = useRef(null)
    
      //const pfpUrl = user?.details?.profile?.pfp?.replace("ipfs://", PINATA_GATEWAY)
      const handleOpenInput = () => {
         imgRef.current.click()
      }
      
      
          
       //USE_DISPLAY  MESSAGE HOOK
      const { result, uploader } = useDisplayImage();

      //USE_CREATE_POST_HOOK
      const {publishPost, isPublishing} = usePublish()
     //  USE_UPLOAD  MEDIA HOOK
     const {uploadToIpfs, isUploading, isUploadingError, fileCID} = useUploadToIPFS()

   
   
     
    const handleTestUpload = async () =>  {
     const uploadedFile =  await uploadToIpfs(postFile)
      console.log("the uploaded", uploadedFile)
    }

     const handlePublishPost = async () =>  {
      const ipfsResult =  await uploadToIpfs(postFile) 
        await publishPost(postTxt, `https://gateway.pinata.cloud/ipfs/${ipfsResult?.path}`)
     }
   
  
    
  return (
    <div className='border-b-2 border-gray-200 shadow-sm py-2 px-4 xs:hidden sm:block'>
      <div className='w-[100%] flex gap-4 justify-between '>
         <div   className='ring-2 ring-purple-500 xs:w-9 xs:h-9 sm:w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
           rounded-full
         '>
         <img   src={  "/img/peruzi.png"}  alt="user" 
           className=' xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover'  
         />
         </div>
         <div className='w-[90%]' onClick={toggleIsAddMedia}>
     <TextareaAutosize  
       className=' resize-none w-[100%] md:placeholder:text-xl xs:placeholder:text-sm sm:placeholder:text-lg py-1 px-2 placeholder:font-serif
         focus:outline-none
       
       '
        maxLength={300}
       minRows={1}
       placeholder="Share something  to the  world"
       value={postTxt}
       onChange={e => setpostTxt(e.target.value)}
       disabled={postTxt.length === 300}
      
     />
         </div>
      </div>
        {isAddMedia && (
          <div className='w-[100%] h-[130px] custom-border mt-4
            p-4 rounded-xl flex items-center justify-center gap-4 cursor-pointer 
          ' onClick={handleOpenInput}>
            <RiImageAddFill className='md:w-9 md:h-9 text-purple-700 xs:w-7 xs:h-7' />
              <h4 className='md:text-xl font-serif text-purple-900 xs:text-lg' >Add a post cover</h4>
     <input   type="file" accept='image/*'
      onChange={e => {setpostFile(e.target.files[0]) 
        uploader(e)
      }}
       ref={imgRef}  hidden
     />
         </div>
        )}
     { result  ?
     <div className='pt-3'>
          {postFile?.type === "image/png" || postFile.type === "image/jpeg" ? (
             
       <img  src={result}   alt='selected  media'
        className='w-[70px] h-[70px] rounded-sm'
       />
      
      ):(
       
        <video src={result} className="first-letter:
          w-[70px] h-[70px] object-cover
        
        "></video>
        
      )
      
     } </div> : ""}
      <div className='flex justify-between items-center py-1 mt-2 px-3  '>
        <BiHash className='text-purple-800 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 cursor-pointer' />
         <div className='flex gap-4 py-3 items-center '>
           <p>{postTxt.length} / 300</p>
            <button className='bg-purple-500 py-1 xs:px-3  rounded-lg font-semibold text-white sm:px-5 sm:py-1' onClick={() => handlePublishPost()} disabled={ ! postFile}>Post</button>
         </div>
      </div>
       {isPublishing   && <CircleLoader  /> }
    </div>
  )
}
