// @ts-nocheck
import {useContext, useEffect, useState} from 'react'
import OrbisProvider from '../context/orbisProvider'
import {AiOutlineLeft, AiOutlineLock} from 'react-icons/ai'
import Link from 'next/link'
import { truncatetext } from '../hooks/useSubstring'
import PostReactions from './PostReactions'
import PostCardFooter from './PostCardFooter'
import TextareaAutosize from 'react-textarea-autosize';
import { BeatLoader } from 'react-spinners'
import Comments from './Comments'
import { useRouter } from 'next/router'
export default function PostPageMain({post}) {
  const [decryptedPost, setdecryptedPost] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [status, setstatus] = useState()
  const [isCommenting, setisCommenting] = useState(false)
  const [commentTxt, setcommentTxt] = useState("")
  const context = useContext(OrbisProvider)
   const router = useRouter()
  useEffect(() => {
    // decrypt  post
  
   
     setisLoading(true)
   const decryptPosts = async () => { if(post.content?.body){
    setdecryptedPost(post.content.body)
 }else if(post.content?.encrypteBody?.encryptedString != {}){
   let res = await context.decryptPost(post.content);
   if(res.status === 300){
     setstatus(300)
   }else{
     setdecryptedPost(res.result)
     setisLoading(false)
   }


 }}

    decryptPosts()
    console.log("the context")
}, [decryptedPost])

const dateOptions = {
  timeZone: "UTC",
  language: "en-US",
  month: "short",
  day: "numeric",
  year: "numeric"
};
const date = new Date(post.timestamp * 1000);
const humanReadableString = date.toLocaleString("en-US", dateOptions);
  const handleGoBack = () =>  {
    router.back()
  }
const  displayPosts  = () =>  {
  if(!("title" in post?.content)){
    return(
      <div className="py-1 px-2">
     <p className="text-lg font-serif">{decryptedPost}</p> 
       <div className="bg-gray-400 w-[100%]   rounded-md ">
          {post?.content?.media?.map((img, i) => {
            const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
            return(
            <img key={i} src={imgUrl} alt='picture'
              className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
            />
            )
          })}
       </div>
       
    </div>
    )
  }else if(post?.content.body  === "" ){
    return(
      <div>
        <div className="py-1 px-4 w-[100%] mb-2">
    <h1 className="font-semibold text-3xl font-sans">{post?.content  && truncatetext(post.content.title, 100)}</h1>
      </div>
        <div className='px-5 mb-3'>
          <h2>{humanReadableString}</h2>
        </div>
      <div className="py-1 px-2 relative">
        
      <div className="bg-gray-400 w-[100%] -order-first  rounded-md ">
         {post?.content?.media?.map((img, i) => {
           const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
           return(
           <img key={i} src={imgUrl} alt='picture ' 
             className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
           />
           )
         })}
      </div>
      <div className="w-[100%]  h-[100%] bg-black/80 absolute z-0 top-0 left-0 backdrop-blur-md rounded-md
        flex items-center justify-center text-white flex-col
      ">
             <AiOutlineLock className="w-11 h-11 mb-2"  />
             <p className="font-semibold">Unlock full content  by <br /> subscribing to creator</p>
             <button className="mt-2 py-2 px-3 border border-purple-400 rounded-md" onClick={() => handleBuyMembership(post?.content?.data.purchaseUrl)}>Buy membership</button> 
      </div>
        
      </div>
          <div className='px-2 py-2'>
            <p className='text-lg font-serif'>{decryptedPost}</p>
          </div>
      </div>
    )
  }else  {
    return(
      <div className="py-1 px-2">
             <div className="py-1 px-4 w-[100%] mb-2">
    <h1 className="font-semibold text-3xl font-sans">{post?.content  && truncatetext(post.content.title, 100)}</h1>
      </div>
        <div className='px-5 mb-3'>
          <h2>{humanReadableString}</h2>
        </div>
       <div className="bg-gray-400 w-[100%]  rounded-md ">
          {post?.content?.media?.map((img, i) => {
            const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
            return(
            <img key={i} src={imgUrl} alt='picture ' 
              className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
            />
            )
          })}
       </div>
       <div className='px-2 py-2'>
            <p className='text-lg font-serif'>{decryptedPost}</p>
          </div>
    </div>
    )
  }
 
}

const  handleComment  =  async () => {
  setisCommenting(true)
  let res = await context.createPost({
    body : commentTxt,
    master :  post.stream_id
  });
  setisCommenting(false)
}

  console.log("stream id", post.stream_id)
  return (
    <div  className=' xs:w-[100vw] xs:h-screen sm:h-screen  sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
    overflow-y-scroll hide-scrollbar xs:mb-7 sm:mb-0 '>
          <div className='w-[100%] h-[65px] bg-white flex items-center px-3 '>
            <div className='flex items-center gap-2 cursor-pointer' onClick={handleGoBack}>
             <AiOutlineLeft className='xs:w-6 xs:h-6 lg:w-8 lg:h-8' />
              <h1 className='text-2xl font-semibold'>Back</h1>
             </div>
              
          </div>
          <div>{displayPosts()}</div>
            <PostCardFooter  post={post}  />
             
              <div className='px-3 w-[100%] flex flex-col gap-2'>
                
                <TextareaAutosize  
                minRows={2}
                  value={commentTxt}
                   onChange ={e => setcommentTxt(e.target.value)}
                   className="focus:outline-none w-[100%]  border border-purple-300 rounded-md py-1 px-2 resize-none" 
                   placeholder='comment  to  this post'
                />
                 <button className='py-2 px-4 bg-purple-600 text-white  inline-block rounded-lg ml-auto' onClick={handleComment}>
                  {isCommenting ? <BeatLoader size={9} /> : "Comment" }
                </button>
              </div>

                <div className='mt-[10px] px-3'>
                  <h1 className='text-xl font-semibold mb-3'>Comments</h1>
                    <Comments  post = {post} />
                </div>
    </div>
  )
}
