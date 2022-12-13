// @ts-nocheck

import {useState} from 'react'
import { AiOutlineClose, AiOutlineComment, AiOutlineLike } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { HiOutlineDotsHorizontal, HiOutlineShare } from 'react-icons/hi'
import { IoMdStarOutline } from 'react-icons/io'
import {TwitterIcon, TwitterShareButton, fac} from 'react-share'
import FacebookIcon from 'react-share/lib/FacebookIcon'
import FacebookShareButton from 'react-share/lib/FacebookShareButton'
import RedditIcon from 'react-share/lib/RedditIcon'
import RedditShareButton from 'react-share/lib/RedditShareButton'
import WhatsappIcon from 'react-share/lib/WhatsappIcon'
import WhatsappShareButton from 'react-share/lib/WhatsappShareButton'
export default function PostCardFooter({post}) {
  const [isShareModal, setisShareModal] = useState(false)
      const shareUrl  = "peruzi.xyz"
    const toggleIsShareModal = () => {
    isShareModal ?   setisShareModal(false) : setisShareModal(true)
    }
  return (
    <div className=' mt-2 relative'>
       {
          isShareModal  &&
           <div className='w-[200px] h-[220px] absolute top-0 z-10 bg-white rounded-lg
             border border-gray-200 p-2 smooth-transition
           '>
             <div></div>
               <div className='flex gap-3 justify-between items-center'>
                 <p className='text-sm'>Share to  social media</p>
                   <AiOutlineClose onClick={toggleIsShareModal} className="cursor-pointer w-4 h-4" />
               </div>
                <div className='pt-3'>
               <TwitterShareButton url={shareUrl}>
                  <div className='flex items-center gap-3 border px-3 py-1 mt-2 rounded-lg border-gray-300'>
                  <TwitterIcon  size={25} round={true} />
                   <p className='font-semibold'>Share  to  twitter</p>
                  </div>
               </TwitterShareButton>
                <RedditShareButton url={shareUrl}>
                <div className='flex items-center gap-3 border px-3 py-1 mt-2 rounded-lg border-gray-300'>
                  <RedditIcon  size={25} round={true} />
                   <p className='font-semibold'>Share  to  reddit</p>
                  </div>
                </RedditShareButton>
                <FacebookShareButton url={shareUrl}>
                <div className='flex items-center gap-1 border px-3 py-1 mt-2 rounded-lg border-gray-300'>
                  <FacebookIcon  size={25} round={true} />
                   <p className='font-semibold'>Share to Facebok</p>
                  </div>
                </FacebookShareButton>

                 <WhatsappShareButton url={shareUrl}>
                 <div className='flex items-center gap-1 border px-3 py-1 mt-2 rounded-lg border-gray-300'>
                  <WhatsappIcon  size={20} round={true} />
                   <p className='font-semibold'>Share to WhatsUp</p>
                  </div>
                 </WhatsappShareButton>
           </div>
           </div>
         }
        <div className='flex items-center gap-4 py-2 px-4 justify-between sm:hidden'>
            <div className='flex gap-2 items-center'>
              <div className='w-7 h-7 border border-purple-500 cursor-pointer rounded-full flex items-center justify-center'>
                <img   src='https://nftcoders.com/avatar/avatar-cool.svg'  alt='logo'
                  className='rounded-full w-6 h-6 '
                />
              </div>
                <BiUserPlus className='text-gray-500 cursor-pointer' />
            </div>
            <div className='flex gap-2 items-center cursor-pointer' onClick={toggleIsShareModal}>
         <HiOutlineShare className='w-5 h-5 cursor-pointer'  />
          <p className='xs:hidden sm:block'>Share</p>
         </div>
         <div className='flex gap-2 items-center'>
         <AiOutlineComment className='w-5 h-5 cursor-pointer' />
         {post?.count_replies ? <p>{post?.count_replies }</p> :
          <p className='xs:hidden sm:block'>comments</p>
          }
         </div>

         <div className='flex gap-2 items-center'>
            <IoMdStarOutline className='w-5 h-5 cursor-pointer' />
          {post?.count_haha ? 
          <p>{post?.count_haha}</p> :
           <p className='xs:hidden sm:block'>Favourite</p>
        }
         </div>

         <div className='flex gap-2 items-center'>
          <AiOutlineLike className='w-5 h-5 cursor-pointer' />
          {post?.count_likes ? 
          <p>{post?.count_likes}</p> :
          <p className='xs:hidden sm:block'>likes</p>
        }
          
         </div>
        <div className='sm:hidden'>
        <HiOutlineDotsHorizontal className='cursor-pointer'  />
        </div>
      </div> 
        
    </div>
  )
}
