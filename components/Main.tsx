import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import CreatePost from './CreatePost'

export default function Main() {
  return (
    <div className='border-x-2 border-gray-400 xs:w-[100vw] h-screen sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]'>
        <div className='flex justify-between items-center py-3 px-3 mb-3
          xs:mt-[55px] md:mt-1
        '>
          <h3 className='text-2xl font-bold'>For U</h3>
           <AiOutlineReload className='cursor-pointer text-gray-500 w-6 h-6'  />
        </div>

          <CreatePost  />
    </div>
  )
}
