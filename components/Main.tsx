// @ts-nocheck
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import CreatePost from './CreatePost'
import Post from './Post'
import TestComponent from './TestComponent'

export default function Main({posts, postsError}) {

  return (
    <div className=' xs:w-[100vw] h-screen sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
      overflow-y-scroll hide-scrollbar
    '>
        <div className='flex justify-between items-center py-3 px-3 mb-3
          xs:mt-[55px] md:mt-1
        '>
          <h3 className='text-2xl font-bold'>For U</h3>
           <AiOutlineReload className='cursor-pointer text-gray-500 w-6 h-6'  />
        </div>

          <CreatePost  />
           {posts?.map((post, i) => {

            return(
              <Post key={i} post = {post}     />
            )
           })}
    </div>
  )
}
