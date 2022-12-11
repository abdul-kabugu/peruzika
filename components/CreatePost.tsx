// @ts-nocheck
import {useState, useRef} from 'react'
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import { FiPlus } from 'react-icons/fi';
import { BiHash } from 'react-icons/bi';
import { useCreatePost, useDisplayImage, useUploadMedia } from '../hooks/orbis-react';

import {Orbis} from '@orbisclub/orbis-sdk'
import { useSelector } from 'react-redux';
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
      
     console.log('this  is  uploaded  file ', uploadedFile)

       const fetchPosts =  async () => {
        let { data, error } = await orbis.getPosts({
          context : "peruzi100"
        });
          console.log("the  reyrned  posts ", data)
          settheData(data)
       }
    const postMetadata = {
      body : postTxt, 
      media : [uploadedFile],
      context : "peruzi100",
      tags :[ {
        slug : "peruzi testing",
        title : 'peruzi testing'
      }],
    }
     
    
    const  handleCreatingPost = async () => {
       try{
       // await uploadFile(postFile)
         const thePostRef = await createPost(postMetadata)
         alert("congrat", thePostRef)
         console.log('created post refrences ', thePostRef)
       }catch (error){
        alert(error)
       }
       
       
    }
   
      const  handleCreatePost2 = async () => {
         
          let res = await orbis.createPost({  body: "hellow  world"})
          console.log("the res", res)
       
      }

      const isAuthenticated = async () => {
        let res = await orbis.isConnected();
        console.log("connected user", res)
      }

      console.log("the orbis project", orbis)
    
  return (
    <div className='border-b-2 border-gray-200 shadow-sm py-2 px-4'>
      <div className='w-[100%] flex gap-4 justify-between '>
         <div   className='ring-2 ring-purple-500 w-[50px] h-[50px] flex items-center justify-center
           rounded-full
         '>
         <Image   src='/img/peruzi.png' width={40}  height={40} alt="user" 
             
         />
         </div>
         <div className='w-[90%]' onClick={toggleIsAddMedia}>
     <TextareaAutosize  
       className=' resize-none w-[100%] placeholder:text-xl py-1 px-2 placeholder:font-serif
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
            <FiPlus className='w-9 h-9 text-purple-700' />
              <h4 className='text-xl font-serif text-purple-900' >Add a picture or  video</h4>
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
        <BiHash className='text-purple-800 w-8 h-8 cursor-pointer' />
         <div className='flex gap-4 py-3 items-center '>
           <p>{postTxt.length} / 300</p>
            <button className='bg-purple-500 py-1 rounded-lg font-semibold text-white px-5' onClick={() => handleCreatingPost()} >Post</button>
         </div>
      </div>
    
     <button className='py-3 px-4 bg-yellow-50' onClick={fetchPosts}>fetch  posts</button>
     <button className='' onClick={ isAuthenticated }>get user</button>
     {theData &&
     <div>
      <h3>data testing</h3>
        {theData?.map((post, i) => {

          return(
            <duv key={i} >
            <h1>{post.content.body}</h1>
             {post.content?.media.map((med, i) => {

              return(
                <Image key={i} src={med.url}  width={100} height={100} />
              )
             })}  
             </duv>
          )
        })}
     </div>
     }
    </div>
  )
}
