import {gql} from '@apollo/client'
import {signText, splitSignature, signedTypeData} from '../../utils/ether-service'
import {useAccount} from "wagmi"
import {lensHub} from '../../utils/lens-hub'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
import { apolloClient } from '../../graphql/apollo/apolloClient'
import { useGetUserProfiles } from './useGetUserProfiles'
import useUploadToIPFS from './useIPFSUpload'

const CREATE_FOLLOW_TYPED_DATA = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

// TODO sort typed!
const createFollowTypedData = (followRequestInfo) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: {
        follow: followRequestInfo,
      },
    },
  });
};

const useFollow = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

 // const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
 const {userProfiles, isUserProfileError, isUserProfilesLoading} = useGetUserProfiles()
   const FIRST_USER_ID = userProfiles?.profiles?.items[0]
 
     const followUser= async () => {
        setisLoading(true)
        const followRequest = [
            {
                profile : FIRST_USER_ID.id,

            }
        ]
    
        try{
            const result = await createFollowTypedData(followRequest);
            const typedData = result.data.createFollowTypedData.typedData;
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
            const tx = await lensHub.followWithSig({
                follower:  address, //account,
                profileIds: typedData.value.profileIds,
                datas: typedData.value.datas,
                sig: {
                  v,
                  r,
                  s,
                  deadline: typedData.value.deadline,
                },
              });
              console.log('follow: tx hash', tx.hash);
              //return tx.hash;
               setisLoading(false)
               setisSuccess(true)
            } catch (error) {
                console.log("this erro from follow", error)
                 setisLoading(false)
                 setErrror(error.message)
                 setisError(true)
            }
        
     }
     return{
        followUser,
        isLoading,
        isError,
        Errror
     }
}

export default useFollow
