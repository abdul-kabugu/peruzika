// @ts-nocheck
import {useState, useEffect} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {AiOutlineSetting} from 'react-icons/ai'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import UserStats from './UserStats'
import { useSelector } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'

export default function UserBanner({toggleIsTokenGateModal, toggleIsEditProfile, userInfo, userPosts }) {
   const [theUserData, settheUserData] = useState()
   const {user, orbis} = useSelector(state => state.user)

     useEffect(() => {
         const fetchUserDetails = async () =>  {
          let orbis = new Orbis();
          let { data, error } = await orbis.getProfile(user.did);
          settheUserData(data)
         }
         fetchUserDetails()
     }, [user])
     
    console.log("the user data", theUserData)
  return (
    <div className=' xs:mt-[55px] md:mt-1'>
       <div className='flex justify-between items-center py-4 px-4 z-10 bg-black/40 fixed top-0
        xs:w-[100%] sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]  xs:top-[50px] md:top-0
        
       '>
                  <div className='flex items-center justify-between gap-3 '>
                        <BiArrowBack  className='cursor-pointer text-white xs:w-5 xs:h-5 lg:w-7 lg:h-7' />
                       <h4 className='lg:font-semibold xs:font-normal xs:text-lg lg:text-xl text-white z-10'>Abdul kabugu</h4>
                  </div>
                    <AiOutlineSetting className="cursor-pointer xs:w-5 xs:h-5 lg:w-7 lg:h-7 text-white" onClick={toggleIsTokenGateModal}/>
              </div>
            <div className='w-[100%] xs:h-[250px] lg:h-[330px] border border-green-800 relative
              userProfileBanner 
            '>
              
            <div className=' w-[100%] absolute xs:top-[150px] lg:top-[170px] px-4 flex items-end justify-between'>
              <div className=' xs:w-[80px] xs:h-[80px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] rounded-full border border-purple-700 ring-2 ring-purple-800
                flex items-center justify-center
              '>
                 <img  src='https://nftcoders.com/avatar/avatar-cool.svg' 
                   className='w-[90%] rounded-full'
                 />
              </div>
              <div className='bg-purple-600 text-white flex items-center gap-4 xs:px-2 md:px-3 md:py-2 xs:py-1 lg:px-3 lg:py-3 rounded-lg cursor-pointer' onClick={toggleIsEditProfile}>
                 <HiOutlinePencilAlt className='cursor-pointer xs:w-4 xs:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
                   <p className='font-semibold xs:text-base md:font-semibold text-lg'>Edit profile</p>
              </div>
            </div>
            </div>
              <UserStats  user = {userInfo} userPosts = {userPosts} />
           
       </div>
  )
}
