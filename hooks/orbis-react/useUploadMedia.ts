// @ts-nocheck
import {useState} from 'react'
import {Orbis} from '@orbisclub/orbis-sdk'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../../assets/constants'
const useUploadMedia = () =>  {
    const [isUploading, setisUploading] = useState(false)
    const [uploadingError, setuploadingError] = useState()
    const [isUploadingError, setisUploadingError] = useState(false)
    const [uploadedFile, setuploadedFile] = useState()

    let orbis = new Orbis({
        PINATA_GATEWAY: PINATA_GATEWAY,
        PINATA_API_KEY: PINATA_KEY,
        PINATA_SECRET_API_KEY: PINATA_SECRET
      });

      const uploadFile = async (file) =>  {
        try{
          setisUploading(true)
          let res = await orbis.uploadMedia(file);
          setuploadedFile(res.result)
          setisUploading(false)
        } catch (error) {
           setisUploading(false)
           setisUploadingError(true)
           setuploadingError(error)
        }
       }

       return{
        uploadFile,
        isUploading,
        uploadedFile,
        isUploadingError,
        uploadingError
       }
}
export default useUploadMedia