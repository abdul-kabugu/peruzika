// @ts-nocheck
import {gql} from '@apollo/client'
import {signText, splitSignature, signedTypeData} from '../../utils/ether-service'
import {useAccount} from "wagmi"
import {lensHub} from '../../utils/lens-hub'
import {useState} from 'react'
import { apolloClient } from '../../graphql/apollo/apolloClient'
import { useGetUserProfiles } from './useGetUserProfiles'


const CREATE_MIRROR_TYPED_DATA = `
mutation($request: CreateMirrorRequest!) { 
  createMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
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
      profileIdPointed
      pubIdPointed
      referenceModuleData
      referenceModule
      referenceModuleInitData
    }
   }
 }
}
`;

// TODO types
const createMirrorTypedData = (createMirrorTypedDataRequest) => {
return apolloClient.mutate({
  mutation: gql(CREATE_MIRROR_TYPED_DATA),
  variables: {
    request: createMirrorTypedDataRequest,
  },
});
};

const useMirror = () => {
    const [isMirroring, setisMirroring] = useState(false)
    const [isMirrorError, setisMirrorError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

  //const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
  const {userProfiles} = useGetUserProfiles()
   const FIRST_USER_ID = userProfiles?.profiles?.items[0] 

  

  const mirrorPublications = async (postId) => {
    setisMirroring(true)
    const createMirrorRequest = {
        profileId : FIRST_USER_ID.id,
        publicationId: postId,
        referenceModule: {
            followerOnlyReferenceModule: false,
          },
      }

      try{
        const result = await createMirrorTypedData(createMirrorRequest);
        const typedData = result.data.createMirrorTypedData.typedData;
        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);
  
        const tx = await lensHub.mirrorWithSig({
          profileId: typedData.value.profileId,
          profileIdPointed: typedData.value.profileIdPointed,
          pubIdPointed: typedData.value.pubIdPointed,
          referenceModuleData: typedData.value.referenceModuleData,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        });

        setisMirroring(false)
        setisSuccess(true)
      } catch (error) {
          console.log(error)
          setisMirroring(false)
          setisMirrorError(true)
          setErrror(error.message)
          
      }
    
  }

  return {
    mirrorPublications,
    isMirrorError,
    isMirroring,
    Errror
  }
}
export default useMirror