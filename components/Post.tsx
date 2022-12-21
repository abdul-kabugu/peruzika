// @ts-nocheck

import Image from "next/image"
import { AiOutlineLock } from "react-icons/ai"
import PostCardFooter from "./PostCardFooter"
import PostHeader from "./PostHeader"

export default function Post({post}) {
    console.log("the posts from post", post)
         //REMOVED_ THE  HEIGHT  DIMENSIONS 
          //xs:h-[210px] sm:h-[310] md:h-[326px] lg:h-[386px]
      const  displayPosts  = () =>  {
        if(!("title" in post?.content)){
          return(
            <div className="py-1 px-2">
            <p className="font-sans text-lg">{post?.content?.body}</p>
             <div className="bg-gray-400 w-[100%]   rounded-md ">
                {post?.content?.media?.map((img, i) => {
                  const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
                  return(
                  <img key={i} src={imgUrl} alt='picture ' 
                    className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
                  />
                  )
                })}
             </div>
             
          </div>
          )
        }else if(post?.content.body  === ""){
          return(
            <div className="py-1 px-2 relative ">
            
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
            <div className="w-[100%] h-[100%] bg-black/80 absolute z-10 top-0 left-0 backdrop-blur-md rounded-md
              flex items-center justify-center text-white flex-col
            ">
                   <AiOutlineLock className="w-11 h-11 mb-2"  />
                   <p className="font-semibold">Unlock full content  by <br /> subscribing to creator</p>
                    <button className="mt-2 py-2 px-3 border border-purple-400 rounded-md">Buy membership</button>
            </div>
              
            </div>
          )
        }else {
          return(
            <div className="py-1 px-2">
            
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
             <p className="font-sans text-lg">{post?.content?.title}</p>
          </div>
          )
        }

        
      }
  return (
    <div className="w-[100%] border border-gray-300 my-2  rounded-lg  py-2 px-2">
       <PostHeader post = {post} />
      
         {/*!post?.content?.hasOwnProperty("title")  ? (
          <div className="py-1 px-2">
            <p className="font-sans text-lg">{post?.content?.body}</p>
             <div className="bg-gray-400 w-[100%] xs:h-[210px] sm:h-[310] md:h-[326px] lg:h-[386px]  rounded-md ">
                {post?.content?.media?.map((img, i) => {
                  const imgUrl = img.url?.replace("ipfs://", `${img.gateway}`)
                  return(
                  <img key={i} src={imgUrl} alt='picture ' 
                    className="w-[100%] xs:h-[210px] sm:h-[310px]  max-h-[100%]  lg:h-[386px] object-cover rounded-md "
                  />
                  )
                })}
             </div>
             
          </div>
          
          ) : 
         
         (
          <h1>there  is title property</h1>
         )
         */
           displayPosts()
         }
         
         <PostCardFooter post = {post} />
    </div>
  )
}
