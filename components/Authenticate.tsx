// @ts-nocheck
import Image from 'next/image'
import {useState, useEffect} from 'react'
import { ClipLoader, ClockLoader } from 'react-spinners'
import { useSignIn } from '../hooks/lens-react'
import {useAccount, useConnect} from 'wagmi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { polygonMumbai } from 'wagmi/chains'

export default function Authenticate() {
  const [isShowLogouModal, setisShowLogouModal] = useState(false)
  const [LENS_ACCESS_TOKEN, setLENS_ACCESS_TOKEN] = useState("")
  const {isDisconnected, connector } = useAccount()
 const {signIn, isConnecting} = useSignIn() 
 const  {connectAsync, connect} = useConnect({
  chainId : polygonMumbai.id,
  connector : new InjectedConnector()
 })

   useEffect(() => {
     setLENS_ACCESS_TOKEN(sessionStorage.getItem('accessToken'))
   }, [])
   
     const handleConnectWallet =  async () =>  {
      const { connector } = await connectAsync();
     }
     const toggleShowLogout = ( ) => {
      isShowLogouModal ? setisShowLogouModal(false) : setisShowLogouModal(true)
     }
      const getAuthState = () => {
        if(isDisconnected){
          return(
            <div>
              <button className='py-2 px-4 border border-purple-200 font-semibold rounded-lg' onClick={handleConnectWallet}>connect wallet</button>
            </div>
          )
       }else if(LENS_ACCESS_TOKEN  === null ){
            return(
              <div className='flex border border-gray-300 justify-between gap-4 px-4 py-2 rounded-xl my-2 cursor-pointer'
              onClick={signIn}
           >
             <div className='flex gap-4 items-center' >
             <Image  src="/img/lens-logo.jpg"  width={25} height={25} alt="browser wallets" className='rounded-full' />
               <h3 className='font-semibold'>Log-in with Lens</h3>
               </div>
               <div>
                 {isConnecting &&
                 <ClipLoader  />
                 }
               </div>
               </div>
            )
       }else if(LENS_ACCESS_TOKEN !== null && ! isDisconnected){
        return(
            <div>
              {isShowLogouModal &&
                <div className='flex items-center gap-2 mb-4 cursor-pointer' onClick={toggleShowLogout}>
                  <p className='font-semibold '>logout</p> <p className='text-gray-400'>@ abdulkabu</p>
                </div>
              }
          <div className='w-[150px]  flex items-center justify-between py-1 px-3'>
          
            <img  src='/img/black-logo.png' className='w-10 h-10 rounded-full' />
             <HiOutlineDotsHorizontal className='cursor-pointer' onClick={toggleShowLogout}  />
          </div>
          </div>
        )
       }

      } 
  return (
    <div className='mt-2 py-2'>
     {getAuthState()}
              
        
    </div>
  )
}
