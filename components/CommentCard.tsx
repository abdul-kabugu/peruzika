// @ts-nocheck
import React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {PINATA_GATEWAY} from '../assets/constants'
export default function CommentCard({comment}) {
  console.log("the comments", comment)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
     const  pfpUrl = comment?.profile?.picture?.original.url.replace("ipfs://", PINATA_GATEWAY)

  return (
    <div className='mb-3'>
    <div className='flex items-center justify-between'>
       <div className='flex items-center gap-3'>
           <div className='w-[50px] h-[50px] rounded-full ring-2 ring-purple-400 flex items-center justify-center'>
              <img   src={pfpUrl || "/img/peruzi.png"} className="w-[80%] rounded-full" />
           </div>
            <div>
                <h1 className='font-semibold'>{comment?.profile?.handle}</h1>
                 <p className='text-gray-500'>{comment  &&  new Intl.DateTimeFormat('en-US', options).format(new Date(comment?.createdAt))}</p>
            </div>
       </div>
        <div>
            <HiOutlineDotsHorizontal className='cursor-pointer' />
        </div>
    </div>
    <div className='px-4 py-2'>
      <p className='font-serif'>{comment?.metadata?.description}</p>
      </div>
      <div>
     
      </div>
    </div>
  )
}
