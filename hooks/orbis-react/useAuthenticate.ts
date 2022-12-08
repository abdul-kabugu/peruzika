// @ts-nocheck
import {Orbis} from '@orbisclub/orbis-sdk'
import {useState} from 'react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import {INFURA_KEY} from '../../assets/constants'
  const  useAuthenticate = () =>  {
   const [isConnecting, setisConnecting] = useState(false)
   const [isConnected, setisConnected] = useState(false)
   const [error, setError] = useState()
   const [isError, setIsError] = useState(false)
     const orbis = new Orbis()
     let wallet_connect_provider = new WalletConnectProvider({
      infuraId: INFURA_KEY,
    });
    //METAMASK  AUTH
       const metamaskAuth = async () => {
         const metamaskOptions = {
          provider: window.ethereum,
          lit: true,
          chain : "ethereum"
         }
          try{
            setisConnecting(true)
            let res = await orbis.connect_v2(metamaskOptions)
           setisConnecting(false)
        setisConnected(true)

          }catch (error) {
            setisConnecting(false)
            setError(error)
            setIsError(true)
          }
       }
      //WALLET_CONNECT  AUTH
       const walletConnectAuth = async () => {

        const walletConnectOptions = {
         provider: wallet_connect_provider,
         lit: true,
         chain : "ethereum"
        }
         try{
          setisConnecting(true)
       let res = await orbis.connect_v2(walletConnectOptions);
       setisConnecting(false)
       setisConnected(true)

         }catch (error) {
           setError(error)
           setIsError(true)
           setisConnecting(false)
         }
      }

   //SOLANA   PHANTOM  AUTH

   const phantomWalletAuth = async () => {

    const phantomwalletOptions = {
      provider: window.phantom?.solana,
     chain: "solana",
       lit: true
    }
     try{
      setisConnecting(true)
   let res = await orbis.connect_v2(phantomwalletOptions);
   setisConnecting(false)
   setisConnected(true)

     }catch (error) {
       setError(error)
       setIsError(true)
       setisConnecting(false)
       
     }
  }


    return{
      metamaskAuth,
      walletConnectAuth,
      phantomWalletAuth,
      isConnecting,
      isConnected,
      error,
      isError,
      
    }
  }

  export default useAuthenticate