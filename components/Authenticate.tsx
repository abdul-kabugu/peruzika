import Image from 'next/image'
import React from 'react'
import { ClipLoader, ClockLoader } from 'react-spinners'
import { useAuthenticate } from '../hooks/orbis-react'

export default function Authenticate() {
  const {metamaskAuth, walletConnectAuth, phantomWalletAuth, isConnecting, } = useAuthenticate()
  return (
    <div className='mt-2 py-2'>
       <h3 className='font-serif text-xl font-semibold'>Connect with one of our available wallet providers</h3>
         <div>
          <div className='flex border border-gray-300 justify-between gap-4 px-4 py-2 rounded-xl my-2 cursor-pointer'
            onClick={metamaskAuth}
          >
            <div className='flex gap-4 items-center'>
            <Image  src="/img/browser-wallet.svg"  width={25} height={25} alt="browser wallets" />
              <h3 className='font-semibold'>Browser wallets</h3>
              </div>
              <div>
                {isConnecting &&
                <ClipLoader  />
                }
              </div>
              </div>
              <div className='flex border border-gray-300 justify-between gap-4 px-4 py-2 rounded-xl my-2 cursor-pointer'
               onClick={walletConnectAuth} 
              >
                <div className='flex gap-4 items-center'>
            <Image  src="/img/walletconnect.svg"  width={25} height={25} alt="browser wallets" />
              <h3 className='font-semibold'>Wallet Connect</h3>
              </div>
              <div>
                {isConnecting && 
                <ClipLoader/>
                }
              </div>
              </div>
              <div className='flex border border-gray-300 gap-4 justify-between px-4 py-2 rounded-xl my-2 cursor-pointer'
                onClick={phantomWalletAuth}
              >
                <div className='flex gap-4 items-center'>
            <Image  src="/img/phantom.jpg"  width={25} height={25} alt="browser wallets" />
              <h3 className='font-semibold'>Phantom</h3>
              </div>
               <div>
                {isConnecting  &&
                  <ClipLoader   />
                }
               </div>
              </div>
         </div>
    </div>
  )
}
