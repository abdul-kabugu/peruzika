// @ts-nocheck

import Image from "next/image"
import PostCardFooter from "./PostCardFooter"
import PostHeader from "./PostHeader"

export default function Post({post}) {
    console.log("the posts from post", post)
  return (
    <div className="w-[100%] border border-gray-300 my-2  rounded-lg  py-2 px-2">
       <PostHeader post = {post} />
      
         {! post?.hasOwnProperty("title")  ? (
          <div className="py-1 px-2">
            <p className="font-sans text-lg">{post?.content?.body}</p>
             <div className="bg-gray-400 w-[100%] xs:h-[210px] sm:h-[310] md:h-[326px] lg:h-[386px]  rounded-md ">
                {post?.content?.media?.map((img, i) => {
                  const imgUrl = img.url.replace("ipfs://", `${img.gateway}`)
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
         }
         
         <PostCardFooter post = {post} />
    </div>
  )
}
