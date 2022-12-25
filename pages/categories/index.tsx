import React from 'react'
import { CategoriesMain, Sidebar, TopNav, TrendingBar } from '../../components'

export default function Categories() {
  return (
    <div className='max-w-[1300px] mx-auto  '  >
    <TopNav  />
      <div className='flex gap-1 lg:px-5 lg:justify-center md:justify-center  sm:justify-center xl:justify-center '>
          <Sidebar />
            <CategoriesMain   />
            <TrendingBar   />
      </div>
     
     
  </div>
  )
}
