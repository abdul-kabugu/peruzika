// @ts-nocheck
import React from 'react'
import { AiOutlinePlus, AiOutlineReload } from 'react-icons/ai'
import CreatePost from './CreatePost'
import Post from './Post'
import TestComponent from './TestComponent'
import {useRouter} from "next/router"
import { useDiscoverFeeds } from '../hooks/lens-react'


export default function Main({posts, postsError}) {
  const router = useRouter()
  const handleNavigateTcreatePost = () => {
     router.push("/create-post")
  }
   
    console.log("the psost", posts)
  return (
    <div className=' xs:w-[100vw] xs:h-screen sm:h-screen  sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
      overflow-y-scroll hide-scrollbar xs:mb-7 sm:mb-0
    '>
        <div className='flex justify-between items-center py-3 px-3 mb-3
          xs:mt-[55px] md:mt-1
        '>
          <h3 className='text-2xl font-bold'>For U</h3>
           <AiOutlineReload className='cursor-pointer text-gray-500 w-6 h-6'  />
        </div>

        <div className='bg-white w-12 h-12 rounded-full flex justify-center items-center z-10 border border-purple-600 cursor-pointer
          absolute bottom-16 right-6 sm:hidden
        '>
          <AiOutlinePlus className='w-9 h-9 text-purple-700' onClick = {handleNavigateTcreatePost}  />
        </div>
          <CreatePost  />
           {posts?.explorePublications?.items.map((post, i) => {

            return(
              <Post key={i} post = {post}     />
            )
           })}
    </div>
  )
}
