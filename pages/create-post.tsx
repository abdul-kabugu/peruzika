import React from 'react'
import { CreateFullPost, Sidebar } from '../components'

export default function PostPage() {
  return (
    <div className='px-1 flex gap-2'>
       <Sidebar  />
        <CreateFullPost  />
    </div>
  )
}

