import React from 'react'
import { Sidebar } from '../../components'

export default function Messages() {
  return (
    <div className='flex gap-3 max-w-[1300px] mx-auto'>
         <Sidebar  />
         <div className='w-[100%] h-screen flex flex-col gap-2 items-center justify-center'>
          <img  src='/img/waiting.svg'  alt='welcome' className='w-[300px] h-[300px]' />
           <p className='font-semibold text-xl'>Our Team Is at hard  work to bring this feature</p>
        </div>
    </div>
  )
}
