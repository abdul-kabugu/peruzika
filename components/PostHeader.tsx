// @ts-nocheck
import Image from 'next/image'
import {useState} from 'react'
import { HiOutlineDotsHorizontal, HiPencil } from 'react-icons/hi';
import { truncatetext } from '../hooks/useSubstring'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import {PINATA_GATEWAY} from '../assets/constants'
import { useFollow, useGetUserProfiles } from '../hooks/lens-react';

export default function PostHeader({post}) {
  const [isEditModal, setisEditModal] = useState(false)
const {userProfiles, isUserProfilesLoading} = useGetUserProfiles()
const {followUser, isLoading, isError} = useFollow()
const userProfileId = userProfiles?.profiles?.items[0].handle
  console.log("user profile", userProfileId)
     const toggleIsEditPostModal = () => {
      isEditModal ? setisEditModal(false) : setisEditModal(true)
     }
  const  getRightButtons  = () => {
      if(userProfileId  && userProfileId === post?.profile?.handle){
        return(
          <div className='relative'>
          <HiOutlineDotsHorizontal className='cursor-pointer' onClick={toggleIsEditPostModal} />
            {isEditModal  &&
               <div className='w-[150px] h-[80px] bg-white absolute right-1 py-2 px-3 rounded-md'>
                   <div className='flex items-center gap-2 cursor-pointer'>
                    <HiPencil  className='w-5 h-5'  />  <p className='font-semibold'>Edit again</p>
                   </div>
                   <div className='flex items-center mt-3 gap-2 cursor-pointer'>
                    <IoMdClose className='w-5 h-5' /> <p className='font-semibold'>Delete post</p>
                   </div>
               </div>
            }
          </div>
        )
      }else  {
        return(
        <div className='flex items-center gap-2'>
           <button className='py-1 px-3 border border-purple-500 rounded-lg' onClick={followUser}>Follow </button>
              <HiOutlineDotsHorizontal className='cursor-pointer' />
        </div>
      )}
    }

 

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const  pfpUrl = post?.profile?.picture?.original.url.replace("ipfs://", PINATA_GATEWAY)
  return (
    <div className='flex gap-1 justify-between items-center  mb-2 py-2 px-3 xs:hidden sm:flex '>
      <div className='flex gap-3'>
        <div>
          {post?.profile?.picture?.original?.url ?
          <Image  src={pfpUrl} width={25} height={25} alt="profile"   className='w-14 h-14 rounded-full object-cover' /> : 
          <Image src="https://nftcoders.com/avatar/avatar-cool.svg" width={25} height={25} alt="profile" 
            className='w-14 h-14 rounded-full object-cover'
          />
        
        }
        </div>

         <div className=''>
          <div className='flex items-center gap-3'>
          <h2 className='text-lg font-serif'> <Link href={`/profile/${post?.profile?.id}`}> { post?.profile?.handle &&  post?.profile.handle} </Link> </h2>
           <p className=' text-gray-600'>{post  &&  new Intl.DateTimeFormat('en-US', options).format(new Date(post?.createdAt))}</p>
          </div>
           <h4 className='text-gray-500'>{post.profile?.bio ? truncatetext(post?.profile?.bio, 30) : "BIO"}</h4>
            
         </div>
         </div>
        
          {
           getRightButtons()
          }
        
    </div>
  )
}
