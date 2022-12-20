// @ts-nocheck
import Image from 'next/image'
import React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { truncatetext } from '../hooks/useSubstring'
import Link from 'next/link';
export default function PostHeader({post}) {
  const dateOptions = {
    timeZone: "UTC",
    language: "en-US",
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  const date = new Date(post.timestamp * 1000);
  const humanReadableString = date.toLocaleString("en-US", dateOptions);
  return (
    <div className='flex gap-1 justify-between items-center  mb-2 py-2 px-3 xs:hidden sm:flex '>
      <div className='flex gap-3'>
        <div>
          {post?.creator_details?.porofile ?
          <Image  src={post?.creator_details?.profile}   /> : 
          <Image src="https://nftcoders.com/avatar/avatar-cool.svg" width={25} height={25} alt="profile" 
            className='w-14 h-14 rounded-full'
          />
        
        }
        </div>

         <div className=''>
          <div className='flex items-center gap-3'>
          <h2 className='text-lg font-serif'> <Link href={`/profile/${post?.creator}`}> { post.creator_details &&  truncatetext(post.creator_details.metadata.address, 10)} </Link> </h2>
           <p className=' text-gray-600'>{humanReadableString}</p>
          </div>
           <h4 className='text-gray-500'>{post.creator_details && "bio of  creator"}</h4>
            
         </div>
         </div>
         <div className='flex items-center gap-2'>
         <button className='py-1 px-3 border border-purple-500 rounded-lg'>Follow </button>
              <HiOutlineDotsHorizontal className='cursor-pointer' />
              </div>
    </div>
  )
}
