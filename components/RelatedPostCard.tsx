// @ts-nocheck
import Link from 'next/link'
import {useState} from 'react'
import {PINATA_GATEWAY} from '../assets/constants'
import { truncatetext } from '../hooks/lens-react/useSubstring'

export default function RelatedPostCard({post}) {
 
    const postMedia =  post?.content?.media?.map((media) => {
    return media
    })[0]
    
     const pfpUrl = post?.creator_details?.profile?.pfp?.replace("ipfs://", PINATA_GATEWAY)
      const postMediaUrl = postMedia?.url?.replace("ipfs://", PINATA_GATEWAY)

       if(!post) {
        return(
          <p>No related to this post</p>
        )
       }
  return (
    <div className='flex items-center justify-between mb-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <img  src={pfpUrl || "/img/peruzi.png"} 
               className="w-7 h-7 rounded-full object-fill"
            />

            <p className='text-lg font-semibold'>{post?.creator_details?.profile?.username}</p>
        </div>
        <div className='px-3'>
        <Link href={`/post/${post.stream_id}`}>  <p className='text-gray-700 font-semibold'>{post?.content.title ? truncatetext(post.content.title, 20) : truncatetext(post.content.body, 20)}</p> </Link>
          </div>
        </div>
         <div className='w-[80px] h-[80px] bg-gray-400 rounded-lg'>
            <img  src={postMediaUrl}  className="w-[100%] h-[100%] rounded-lg object-cover"  />
         </div>
    </div>
  )
}
