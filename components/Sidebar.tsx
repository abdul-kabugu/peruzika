// @ts-nocheck
import Image from 'next/image'
import {useState} from 'react'
import Link from 'next/link'
import {Links} from '../assets/constants'
import { AiOutlineUpload } from 'react-icons/ai'
import { RiBookOpenLine, RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
export default function Sidebar() {
   const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false)
      const GetNavbar = ({handleClick}) =>  {
         
          return(
            <>
             {Links.map((item, i) => {

               return(
                <div className='' key={item.to}>
                <Link href={item.to} onClick={handleClick && handleClick()}>
                  <div className={`flex items-center gap-4 py-2 my-4  hover:text-purple-500 
                    ${item.isFirst && "text-purple-700"}
                  `}>
                  <item.icon   size={25} className={`${item.isFirst && "text-2xl"}`} />
                   <p className={`font-semibold hover:text-xl ${item.isFirst && "text-2xl"} `}>{item.name}</p>
                  </div>
                </Link>
                </div>
               )
             })}
              <div className='flex gap-2 items-center bg-purple-600 w-[180px] py-3 px-5 rounded-lg text-white justify-center cursor-pointer'>
      <AiOutlineUpload size={25} />
        <button className='capitalize text-xl font-semibold'> post</button>
        </div>
             </>
          )
          
      }
  return (
    <>
    <div className='md:flex hidden flex-col w-[300px] h-screen border-r-2 border-purple-500 pt-3 px-4' >
        <div className='flex items-end gap-2 mb-4'>
            <Image  src="/img/peruzi.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
        <GetNavbar  />
        
            
    </div>
    <div className='absolute md:hidden block top-6 left-3'>
             
              <HiOutlineMenu onClick={() => setIsmobileMenuOpen(true)}/>
             
           </div>

           <div className={`absolute top-0 h-screen w-2/3 z-10 backdrop-blur-lg px-4 py-4 md:hidden
             bg-black text-white smooth-transition ${isMobileMenuOpen ? "left-0" : "-left-full "}
           `} >
             <div className='flex items-center justify-between'>
        <div className='flex items-end gap-2 mb-4'>
            <Image  src="/img/black-logo.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
          <RiCloseLine   size={30} className="cursor-pointer" onClick={() => setIsmobileMenuOpen(false)}  />
        </div>
        <GetNavbar  />
        
            
    </div>
    </>
  )
}
