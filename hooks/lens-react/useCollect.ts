// @ts-nocheck
import {gql} from '@apollo/client'
import {signText, splitSignature, signedTypeData} from '../../utils/ether-service'
import {useAccount} from "wagmi"
import {lensHub} from '../../utils/lens-hub'

import {useState} from 'react'
import { apolloClient } from '../../graphql/apollo/apolloClient'
import { useGetUserProfiles } from './useGetUserProfiles'
import useUploadToIPFS from './useIPFSUpload'

const CREATE_COLLECT_TYPED_DATA = `
  mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        pubId
        data
      }
     }
   }
 }
`;

// TODO typings
const createCollectTypedData = (createCollectTypedDataRequest) => {
    return apolloClient.mutate({
      mutation: gql(CREATE_COLLECT_TYPED_DATA),
      variables: {
        request: createCollectTypedDataRequest,
      },
    });
  };

  const useCollect = () => {
    const [isCollecting, setisCollecting] = useState(false)
    const [isCollectingError, setisCollectingError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

  //const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
  const {userProfiles} = useGetUserProfiles()
   const FIRST_USER_ID = userProfiles?.profiles?.items[0] 

    const collecPublication = async (postId) => {
        setisCollecting(true)
        const collectRequest = {
            publicationId: postId,
         }

         try{
            const result = await createCollectTypedData(collectRequest);
            const typedData = result.data.createCollectTypedData.typedData;
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
       
            const tx = await lensHub.collectWithSig({
               collector: address,
               profileId: typedData.value.profileId,
               pubId: typedData.value.pubId,
               data: typedData.value.data,
               sig: {
                 v,
                 r,
                 s,
                 deadline: typedData.value.deadline,
               },
             });
             console.log(tx.hash);
             setisCollecting(false)
             setisSuccess(true)
           } 
               
           
            catch (error) {
               alert(error)
               setisCollecting(false)
               setisCollectingError(true)
               setErrror(error.message)
               
            }
    }
    return{
        collecPublication,
        isCollectingError,
        isCollecting,
        isSuccess,
        Errror
    }
  }

  export default useCollect