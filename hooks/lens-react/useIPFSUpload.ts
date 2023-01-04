// @ts-nocheck
import {create} from 'ipfs-http-client'
import {useState} from 'react'
import {Buffer} from 'buffer'
const useUploadToIPFS = () => {
const [isUploading, setisUploading] = useState(false)
const [isUploadingError, setisUploadingError] = useState(false)
const [isUploadingSuccess, setisUploadingSuccess] = useState(false)
const [Error, setError] = useState("")
const [fileCID, setfileCID] = useState("")
  const projectId = "2DClJGZe7gt4xvK5ptGTyyFq1pw";
const secret = "e9d5f0790bcf561e07f7a4779589f4c7";
  const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Basic ${Buffer.from(`${projectId}:${secret}`, 'utf-8').toString('base64')}`,
      },
    });
  const uploadToIpfs = async (file) => {
    try {
      setisUploading(true)
     const uploadedfile = await client.add(file) 
     setisUploading(false)
     setisUploadingSuccess(true)
     setfileCID(uploadedfile?.path)
     return uploadedfile

  } catch (error){
    setisUploading(false)
    setisUploadingError(true)
     setError(error.message)
  }}

  return {
      uploadToIpfs,
      isUploading,
      isUploadingError,
      isUploadingSuccess,
      Error,
      fileCID
  }
}
export default useUploadToIPFS