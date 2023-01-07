// @ts-nocheck
import {gql} from '@apollo/client'
import useSignIn from './useSignIn'
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'
import {useAccount} from 'wagmi'
import { apolloClient } from '../../graphql/apollo/apolloClient'
import { signText, signedTypeData, splitSignature } from '../../utils/ether-service'
import { lensHub } from '../../utils/lens-hub'
import useUploadToIPFS from '../lens-react/useIPFSUpload'
import { useGetUserProfiles } from './useGetUserProfiles'
import {useState} from 'react'
const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
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
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

//TODO typings
const createPostTypedData = (createPostTypedDataRequest) => {
    return apolloClient.mutate({
      mutation: gql(CREATE_POST_TYPED_DATA),
      variables: {
        request: createPostTypedDataRequest,
      },
    });
  };

  
const  usePublish = () => {
   const [isPublishing, setisPublishing] = useState(false)
   const {address} = useAccount()
  const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles()
  const FIRST_USER_ID = userProfiles?.profiles?.items[0] 
  const  thePrfId =  FIRST_USER_ID?.id
             //"0x41cd"   ||  //user?.attributes.lensProfileId
   const {uploadToIpfs : saveFile, isUploading, isUploadingError : uploadingError} = useUploadToIPFS()
  const {signIn} = useSignIn()
  const publishPost = async (description,  postCover, tags) => {
         //Initialize  post  metadata
         if(!thePrfId){
            alert("connect  your  profile first")
         }
        setisPublishing(true)
    const metadata = {
          version: '2.0.0',
        
          metadata_id: uuidv4(),
          description: description,
          content: description,
          locale : "en-US",
           tags : tags,
           mainContentFocus :  'ARTICLE',
           external_url: null,
          image: postCover,
          imageMimeType: "image/jpeg",
          name: description,
          attributes: [],
          media  :[{
            item : postCover
          }],
          appId: 'peruzika2',
        }

        
          const  ipfsResult = await saveFile(
          
            JSON.stringify(metadata)
           
          )
        console.log("post ipfs hash", ipfsResult?.path)

          //await Moralis.enableWeb3()

        const createPostRequest = {
            profileId: thePrfId,
            contentURI: `https://gateway.pinata.cloud/ipfs/${ipfsResult?.path}`,
              collectModule :  {
                "freeCollectModule":  {
                    "followerOnly": true
                 }
            },
               referenceModule: {
                "followerOnlyReferenceModule": false
            }
        
             }
           try{
        const result = await createPostTypedData(createPostRequest)
        const typedData = result.data.createPostTypedData.typedData;
        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensHub.postWithSig({
          profileId: typedData.value.profileId,
          contentURI:typedData.value.contentURI,
          collectModule: typedData.value.collectModule,
          collectModuleInitData: typedData.value.collectModuleInitData,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        });
        console.log(tx.hash);
        setisPublishing(false)
        // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
        // you can look at how to know when its been indexed here: 
        //   - https://docs.lens.dev/docs/has-transaction-been-indexed
        }catch (error)  {
          //alert(error)
          setisPublishing(false)
          toast(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            
          })

          console.log(error)
        }
          
        
        
       

    
   
      
}
return {publishPost, isPublishing}
}

export default usePublish