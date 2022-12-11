// @ts-nocheck
import Image from 'next/image'
import {useState} from 'react'
import Link from 'next/link'
import {Links} from '../assets/constants'
import { AiOutlineUpload } from 'react-icons/ai'
import { RiBookOpenLine, RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNavbar } from '../redux/toggleSlice'

export default function Sidebar() {
   //const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false)
   const {isMobileMenuOpen} = useSelector(state => state.navbar)

       const dispatch  =  useDispatch()

       const toggleNavigation = () => {
        dispatch(toggleNavbar(false))
      
     }
      const GetNavbar = ({handleClick}) =>  {
         
          return(
            <>
             {Links.map((item, i) => {

               return(
                <div className='' key={item.to}>
                <Link href={item.to} onClick={handleClick && handleClick()}>
                  <div className={`flex items-center gap-3 py-2 my-2  hover:text-purple-500 
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
        <div className='flex items-end gap-2 mb-4 mt-1 '>
            <Image  src="/img/peruzi.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
        <GetNavbar  />
        
            
    </div>
    {/*
    <div className='absolute xs:hidden sm:block md:hidden block top-6 left-3'>
    <HiOutlineMenu onClick={() => setIsmobileMenuOpen(true)}/>
     </div>
  */}
           <div className={`absolute top-0 h-screen w-2/3 z-10 backdrop-blur-lg px-4 py-4 xs:hidden sm:block md:hidden
             bg-black text-white smooth-transition ${isMobileMenuOpen ? "left-0" : "-left-full "}
           `} >
             <div className='flex items-center justify-between'>
        <div className='flex items-end gap-2 mb-4'>
            <Image  src="/img/black-logo.png" alt='logo' width={60} height={60} />
             <p className='text-gray-400 font-semibold'>Beta</p>
        </div>
          <RiCloseLine   size={30} className="cursor-pointer" onClick={() => toggleNavigation()}  />
        </div>
        <GetNavbar  />
        
            
    </div>
      <div className='absolute top-auto bottom-2 sm:hidden w-[100vw] bg-gray-300 z-10 rounded-t-xl py-3'>
         <div className='flex gap-4 justify-between px-6'>
         {Links.map((link, i) => {

          return(
            <Link key={i} href={link.to} >
                <div className=''>
                  <link.icon className='w-8 h-8' />
                </div>
            </Link>
          )
         })}
      </div>
      </div>
    </>
  )
}
