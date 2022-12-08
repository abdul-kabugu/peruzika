// @ts-nocheck
import {Orbis} from '@orbisclub/orbis-sdk'
import { toggleNavbar } from '../redux/toggleSlice';
import {useSelector, useDispatch} from 'react-redux'
import { HiOutlineMenu, HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineLogin, AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import Modal from './Modal';
import { useAuthenticate } from '../hooks/orbis-react';
import {ClipLoader} from 'react-spinners'


export default function TopNav() {
  const [searchTxt, setsearchTxt] = useState("")
  const [isConnectWallet, setisConnectWallet] = useState(false)
   const {metamaskAuth, walletConnectAuth, phantomWalletAuth, isConnecting, isConnected, error, isError} = useAuthenticate()
   const dispatch = useDispatch()
    const orbis = new Orbis()
      const authenticate = async () => {
        let res = await orbis.connect();
         console.log(res)
      }
      const toggleNavigation = () => {
        dispatch(toggleNavbar(true))
       
     }

      const toggleConnectWallet = () =>  {
          isConnectWallet ? setisConnectWallet(false) : setisConnectWallet(true)  
      }

      console.log("the  error", error)
  return (
    <div className='border-y-2  flex gap-8 justify-between bg-gray-100  md:hidden px-6 py-1 fixed top-0 w-[100vw] z-10'>
       <>
       <div className='flex items-center gap-5'>
        <Image src="/img/peruzi.png"  width={28}  height={28}  alt="logo"  />
        <HiOutlineMenu onClick={() => toggleNavigation()}
          className='cursor-pointer w-8 h-8 xs:hidden sm:block'
        />
        </div>
         <div className='flex gap-3 items-center border border-gray-300 w-[330px] py-1 px-4
           rounded-lg  xs:hidden sm:flex
         '>
            <input value={searchTxt} onChange={e => setsearchTxt(e.target.value)}   
              placeholder="Search by name or tag" className=' py-1  px-4
               focus:outline-none rounded-lg w-[280px]
              '
            />
            <AiOutlineSearch className='w-8 h-8 cursor-pointer text-gray-400' />
         </div>
         </>
          <button className='bg-purple-500 xs:py-2 xs:px-8 rounded-lg px-5 text-white font-semibold'
            onClick={toggleConnectWallet}
          >Log in</button>
           { isConnectWallet &&
           <Modal>
            <div className='flex items-center justify-between 
              py-2 px-1 border-b pb-3 border-b-gray-300 shadow-sm
            '>
                <div className='flex items-center gap-4'>
                    <AiOutlineLogin   className="text-gray-600 w-7 h-7" />
                    <p className='text-xl font-semibold'>Login</p>
                </div>
                  <AiOutlineClose  className="text-gray-600 w-6 h-6 cursor-pointer"
                    onClick={toggleConnectWallet}
                  />
            </div>
              <div className='mt-2'>
                <h3 className='text-xl font-semibold'>Connect your wallet.</h3>
                <p className='text-gray-600 py-1'>Connect with one of our available wallet providers </p>
                <div className='mt-1 py-3'>
                 <div className='flex items-center justify-between  
                  cursor-pointer border border-gray-300 py-2 px-4 rounded-xl
                 ' onClick={metamaskAuth}>
                 <h4 className=' font-semibold'>Browser Wallets </h4>
                   { isConnecting  ? (
                    <ClipLoader   />
                  ):
                  <Image  src='/img/browser-wallet.svg' width={30} height={30} alt="metamsak"  />
                   }
                   
                
                 </div>

                 <div className='flex items-center justify-between mt-3
                   cursor-pointer border border-gray-300 py-2 px-4 rounded-xl
                 '  onClick={() => walletConnectAuth()}>
                 <h4 className=' font-semibold'>Wallet Connect </h4>
                   { isConnecting  ? (
                    <ClipLoader   />
                  ):
                  <Image  src='/img/walletconnect.svg' width={30} height={30} alt="wallet connect" />
                   }
                   
                   
                 </div>

                 <div className='flex items-center justify-between mt-3
                   cursor-pointer border border-gray-300 py-2 px-4 rounded-xl
                 ' onClick={phantomWalletAuth}>
                 <h4 className=' font-semibold'>Phantom wallet </h4>
                  { isConnecting  ? (
                    <ClipLoader   />
                  ):
                   <Image  src='/img/phantom.jpg' width={30} height={30} alt="wallet connect" />
                   }
                   
                 
                 </div>
                </div>
              </div>
           </Modal>
}
    </div>
  )
}
