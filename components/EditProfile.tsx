// @ts-nocheck
import {useState, useRef} from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useUploadMedia, useDisplayImage} from '../hooks/orbis-react'
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import {PINATA_GATEWAY} from '../assets/constants'
export default function EditProfile({ toggleIsEditProfile}) {
  const [newProfileFile, setnewProfileFile] = useState([])
  const [userName, setuserName] = useState("")
  const [userBio, setuserBio] = useState("")
  const [isUpdatingProfile, setisUpdatingProfile] = useState(false)
   const avatarRef = useRef()
   const  {result, uploader} = useDisplayImage()
    const {user, isAuthenticated,  orbis} = useSelector(state => state.user)
   //const {description, pfp, username   } = user?.details?.profile
     // console.log("the orbis", user.details?.profile?.description)
     const handleSelectFile = ( ) =>  {
        avatarRef.current.click()
     }

       const  handleUpdateProfile = async () =>  {
             setisUpdatingProfile(true)
              
                let avatar = await orbis.uploadMedia(newProfileFile);
                 if(user.details?.profile?.data){
                  let res = await orbis.updateProfile({
                    pfp: avatar.result.url || user.details?.profile?.pfp,
                    username:  userName || user.details?.profile?.username,
                    description : userBio  || user.details?.profile?.description,
                    data : user.details?.profile?.data?.peruziMemberships,
                  });
                }else {
                  let res = await orbis.updateProfile({
                    pfp: avatar.result.url || user.details?.profile?.pfp,
                    username:  userName || user.details?.profile?.username,
                    description : userBio  || user.details?.profile?.description,
                    //data : user.details?.profile?.data?.peruziMemberships,
                  });
                }

                setisUpdatingProfile(false)
              } 
               
            // GET_AVATAR  STATE
            
            const getAavatar = () =>  {
              const pfpUrl = user?.details?.profile?.pfp?.replace("ipfs://", PINATA_GATEWAY)
              if(user.details?.profile?.pfp && ! result){
                return(
                  <img   src={pfpUrl}   className='w-[90%] rounded-full z-0'     />
                )
              } else if(! user.details?.profile?.pfp && ! result){
                return(
                   <img   src='https://nftcoders.com/avatar/avatar-cool.svg' 
                   className='w-[90%] rounded-full z-0'    />
                )
              }else if(result){
                return (
                   <img   src={result}   className='w-[90%] max-h-[85px] object-cover rounded-full z-0'     /> 
                )
              }
            }
       
  return (
    <div>
        <h1 className='py-2 text-center font-semibold text-xl'>Profile settings</h1>
         <div className='w-[100%] h-[150px] rounded-lg userProfileBanner border border-purple-600 relative px-3'>
           <div className='absolute top-[80px] w-[100px] h-[100px] rounded-full flex items-center justify-center ring-2 bg-purple-400 ring-purple-800'>
               <div className='w-[100%] flex items-center justify-center  rounded-full relative'>
                 {
                    getAavatar()
                 }
              
                     <div className='absolute z-10 text-white bg-black/60 rounded-lg cursor-pointer ' onClick={handleSelectFile}>
                      <AiOutlineCamera className='w-7 h-7 z-20' />

                       <input  type="file" onChange={e =>  {
                        setnewProfileFile(e.target.files[0])
                        uploader(e)
                       }} accept="image/*" ref={avatarRef} hidden />
                     </div>
                   </div>
           </div>
            
         </div>
         <div className='mt-[40px]'>
         <div>
              <h4 className='font-semibold'>Name</h4> 
               <input  type="text"  value={userName} onChange = {e => setuserName(e.target.value)}
                  className="focus:outline-none border border-purple-300 py-2 px-3 rounded-lg w-[100%]"
                   placeholder='Kabugu'
               /> 

          <h4 className='font-semibold'>Bio</h4>  
             <TextareaAutosize
             minRows={3}
              value={userBio}
               onChange = {e => setuserBio(e.target.value)}
                className="resize-none w-[100%] focus:outline-none border border-purple-300 rounded-lg px-3 py-2"
              />
         </div>
         </div>

          <div className='mt-[15px] w-[90%] mx-auto flex items-center justify-between'>
              <button onClick={toggleIsEditProfile}
                 className='py-2 px-4 w-[40%] border border-gray-300 rounded-lg'
              >Cancel</button>

              <button onClick={handleUpdateProfile}
                 className='py-2 px-4 w-[40%] border border-gray-300 rounded-lg bg-purple-600 text-white'
              >
                {isUpdatingProfile ?  <BeatLoader size={9} /> : "Save"}
              </button>
           </div>

          
    </div>
  )
}
