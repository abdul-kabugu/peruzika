// @ts-nocheck
import omitDeep from 'omit-deep';
import { ethers, utils } from 'ethers';
import {isBrowser} from 'next/config'
 
 let ethersProvider
if( typeof window !== "undefined"){
  ethersProvider =  new ethers.providers.Web3Provider(window.ethereum);
}

  export const signText = (text) => {
   // console.log("sign me ")
   return ethersProvider?.getSigner().signMessage(text);
 }

 export const getSigner = () => {
    return ethersProvider?.getSigner();
}

export const signedTypeData = (domain, types, value) => {
    const signer = getSigner();
    // remove the __typedname from the signature!
    return signer._signTypedData(
      omitDeep(domain, '__typename'),
      omitDeep(types, '__typename'),
      omitDeep(value, '__typename')
    );
  }

  export const splitSignature = (signature) => {
    return utils.splitSignature(signature)
}

export const sendTx = (transaction) => {
    const signer = ethersProvider.getSigner();
    return signer.sendTransaction(transaction);
  }