// @ts-nocheck
import {useState} from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiArrowBack, BiLeftArrow } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import Modal from './Modal'
import Post from './Post'
import ProfileSettingsModal from './ProfileSettingsModal'
import TokenGateKeys from './TokenGateKeys'
import UserBanner from './UserBanner'
import UserStats from './UserStats'
import {HiOutlineMail} from 'react-icons/hi'
import {PINATA_GATEWAY} from '../assets/constants'
export default function ProfileMain({userInfo, userPosts}) {
const [isEditProfile,setisEditProfile] = useState(false)
const [isTokenGateModal, setisTokenGateModal] = useState(false)
const {user, orbis, isAuthenticated} = useSelector(state => state.user)

   
const toggleIsEditProfile = ( ) =>  {
   isEditProfile ? setisEditProfile(false) : setisEditProfile(true)
}

 const toggleIsTokenGateModal = () => {
  isTokenGateModal ? setisTokenGateModal(false) : setisTokenGateModal(true)
 }

 const pfpUrl = userInfo?.details?.profile?.pfp.replace("ipfs://", PINATA_GATEWAY)
  return (
    <div className='xs:w-[100vw] xs:h-screen sm:h-screen  sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
    overflow-y-scroll xs:mb-[58px] hide-scrollbar sm:mb-0  '>
     

<div className='relative w-[100%] '>
        <div className='w-[100%] h-[250px]  userIdBanner  rounded-sm'>
           
        </div>
        <div className='absolute top-[200px] px-4 flex justify-between  w-[100%] items-start '>
            <div className='flex items-center gap-3'>
              <div className='w-[110px] h-[110px] rounded-lg ring-4 bg-purple-200 ring-white flex items-center justify-center'>
                <img  src={pfpUrl || "/img/peruzi.png"}  className="max-w-[105px] max-h-[105px] rounded-lg"   />
              </div>
              <div className='mt-9 '>
              <h1 className='font-semibold text-xl'>{userInfo?.details?.profile?.username || "--"}</h1>
               <div className='flex gap-4 xs:gap-2'>
                  <div className='flex items-center gap-2'>
                         <h3  className='font-bold text-lg'>{userInfo?.count_followers || "--"}</h3>
                       <h2>FolLowers</h2>
                  </div>
                  <div className='flex items-center gap-2'>
                         <h3 className='font-bold text-lg'>{userInfo?.count_following || "--"}</h3>
                       <h2>Following</h2>
                  </div>
                  <div className='flex items-center gap-2 xs:hidden xl:flex '>
                         <h3 className='font-bold text-lg'>{userPosts?.length || "--"}</h3>
                       <h2>Posts</h2>
                  </div>
               </div>
              </div>
              </div>
                 <div className='flex items-center gap-4 '>
                 <div className='bg-purple-600 xs:w-[27px] xs:h-[27px] xl:w-[40px] xl:h-[40px] rounded-full flex items-center justify-center cursor-pointer' onClick={toggleIsTokenGateModal}>
                         <AiOutlineSetting className=' xs:w-4 xs:h-4 xl:w-7 xl:h-7 text-white' />
                     </div>
                    {/*} <div className='bg-purple-600 xs:w-[27px] xs:h-[27px] lg:w-[40px] lg:h-[40px] rounded-full flex items-center justify-center cursor-pointer'>
                         <HiOutlineMail className=' xs:w-4 xs:h-4 lg:w-7 lg:h-7 text-white' />
                   </div>*/}
                      <button className='bg-purple-600 text-white xs:py-1 xs:px-2 xl:py-2 xl:px-4 rounded-lg' onClick={toggleIsEditProfile}>Edit profile</button>
                 </div>
           </div>
        </div>

           {isEditProfile  &&
             <ProfileSettingsModal>
              <EditProfile   toggleIsEditProfile = {toggleIsEditProfile}
               
              />
            </ProfileSettingsModal>
           }

            {isTokenGateModal &&
             <ProfileSettingsModal>
             <TokenGateKeys toggleIsTokenGateModal ={toggleIsTokenGateModal} />
             </ProfileSettingsModal>
            }
             <div className='mt-[65px]'>
              {userPosts?.map((post, i) =>  {

                return(
                  <Post  key={i} post = {post} />
                )
              })}
        
    </div>
    </div>
  )
}
