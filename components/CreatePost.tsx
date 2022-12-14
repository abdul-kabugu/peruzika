// @ts-nocheck
import {useState, useRef} from 'react'
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import { FiPlus } from 'react-icons/fi';
import { BiHash } from 'react-icons/bi';
import { useCreatePost, useDisplayImage, useUploadMedia } from '../hooks/orbis-react';
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'
import {Orbis} from '@orbisclub/orbis-sdk'
import { useSelector } from 'react-redux';
import { CircleLoader } from 'react-spinners';
export default function CreatePost() {
    const [postTxt, setpostTxt] = useState("")
   // const orbis = new Orbis()
    const [isAddMedia, setisAddMedia] = useState(false)
    const [postFile, setpostFile] = useState([])
    const {orbis} = useSelector(state => state.user)
    const [theData, settheData] = useState()
    const toggleIsAddMedia = () => {
      isAddMedia ? setisAddMedia(false) : setisAddMedia(true)
    }
    const imgRef = useRef(null)
   
      const handleOpenInput = () => {
         imgRef.current.click()
      }
      
      
          
       //USE_DISPLAY  MESSAGE HOOK
      const { result, uploader } = useDisplayImage();

      //USE_CREATE_POST_HOOK
      const {createPost, isCreating, isCreated, error, isError} = useCreatePost()
     //  USE_UPLOAD  MEDIA HOOK
     const {uploadFile, isUploading, isUploadingError, uploadingError, uploadedFile} = useUploadMedia()
      
    


    const postMetadata = {
      body : postTxt, 
      media : [uploadedFile],
      context : "peruzi10",
      tags :[ {
        slug : "peruzi testing",
        title : 'peruzi testing'
      }],
    }
     
      const  handleCreatingPost = async () => {
         //const theFile =  await uploadFile(postFile)
         let res = await orbis.uploadMedia(postFile);
         console.log("the file", res)
        const thePostRef = await createPost({
          body : postTxt, 
          media : [res.result],
          context : "peruzi10",
          tags :[ {
            slug : "peruzi testing",
            title : 'peruzi testing'
          }],
        })
     }
   
  
    
  return (
    <div className='border-b-2 border-gray-200 shadow-sm py-2 px-4 xs:hidden sm:block'>
      <div className='w-[100%] flex gap-4 justify-between '>
         <div   className='ring-2 ring-purple-500 xs:w-9 xs:h-9 sm:w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
           rounded-full
         '>
         <img   src='/img/peruzi.png'  alt="user" 
           className=' xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10'  
         />
         </div>
         <div className='w-[90%]' onClick={toggleIsAddMedia}>
     <TextareaAutosize  
       className=' resize-none w-[100%] md:placeholder:text-xl xs:placeholder:text-sm sm:placeholder:text-lg py-1 px-2 placeholder:font-serif
         focus:outline-none
       
       '
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
            <FiPlus className='md:w-9 md:h-9 text-purple-700 xs:w-7 xs:h-7' />
              <h4 className='md:text-xl font-serif text-purple-900 xs:text-lg' >Add a picture or  video</h4>
     <input   type="file" 
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
            <button className='bg-purple-500 py-1 xs:px-3  rounded-lg font-semibold text-white sm:px-5 sm:py-1' onClick={() => handleCreatingPost()} >Post</button>
         </div>
      </div>
       {isCreating   && <CircleLoader  /> }
    </div>
  )
}
