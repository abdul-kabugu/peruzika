// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import {PINATA_GATEWAY} from '../assets/constants'
import { useFollow, useGetUserProfileInfo } from '../hooks/lens-react'

import Post from './Post'
import UserPost from './UserPost'

  
export default function UserIdMain({userDetails, userPosts, userAccount }) {
 // const [isFollowing, setisFollowing] = useState(false)
 // const [isFollowLoading, setisFollowLoading] = useState(false)
  const {followUser, isLoading} = useFollow()
    console.log("the user informatin", userDetails)
   

      /* useEffect(() => {
        const isUserFollowing =  async () => {
         if(isAuthenticated){
          let { data, error } = await context.getIsFollowing(
            user?.did,
            userDetails?.details.did
         ); 
          setisFollowing(data)
         }}
         isUserFollowing()
       }, [isFollowing, user]) /*/

       /*  const handleFollow =  async () => {
          setisFollowLoading(true)
          let res = await context.setFollow(userDetails?.details?.did, true);
          setisFollowLoading(false)
         
         }
         console.log("is Following", isFollowing)
           const  handleUnFollow =  async() =>  {
            setisFollowLoading(true)
            let res = await context.setFollow(userDetails?.details?.did, false);
            setisFollowLoading(false)
           }*/
          //  console.log("is following  information", isFollowing)
          const {address} = useAccount()
    const  pfpUrl = userDetails?.profile?.picture?.original.url.replace("ipfs://", PINATA_GATEWAY)
      console.log('the user profile data', userDetails)
      console.log('the user posts data', userPosts)
  return (
    <div className='xs:w-[100vw] xs:h-screen sm:h-screen  sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
    overflow-y-scroll xs:mb-[58px] hide-scrollbar sm:mb-0 '>
        <div className='relative w-[100%] '>
        <div className='w-[100%] h-[250px]  userIdBanner  rounded-sm'>
           
        </div>
        <div className='absolute top-[200px] px-4 flex justify-between  w-[100%] items-start '>
            <div className='flex items-center gap-3'>
              <div className='w-[110px] h-[110px] rounded-lg ring-4 bg-purple-200 ring-white flex items-center justify-center'>
                <img  src={pfpUrl || "/img/peruzi.png"}  className="max-w-[105px] max-h-[105px] rounded-lg"   />
              </div>
              <div className='mt-9 '>
              <h1 className='font-semibold text-xl'>{userDetails?.profile?.handle || "-"}</h1>
               <div className='flex gap-6 xs:gap-2'>
                  <div className='flex items-center gap-2'>
                         <h3  className='font-bold text-lg'>{userDetails?.profile?.stats?.totalFollowers || "-"}</h3>
                       <h2>FolLowers</h2>
                  </div>
                  <div className='flex items-center gap-2'>
                         <h3 className='font-bold text-lg'>{userDetails?.profile?.stats?.totalFollowing || "-"}</h3>
                       <h2>Following</h2>
                  </div>
                  <div className='flex items-center gap-2  '>
                         <h3 className='font-bold text-lg'>{userDetails?.profile?.stats?.totalPosts || "-"}</h3>
                       <h2>Posts</h2>
                  </div>
               </div>
              </div>
              </div>
                 <div className='flex items-center gap-4 '>
                    {/*} <div className='bg-purple-600 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer' >
                         <HiOutlineMail className='w-7 h-7 text-white'  />
  </div>*/}
                     {
                      userDetails && ! userDetails?.profile?.ownedBy === address ? (
                        <button className='bg-purple-600 text-white py-2 px-4 rounded-lg' disabled ={!userDetails} onClick ={handleFollow}>
                        {isLoading? <BiLoader size={9} /> : "Following"}
                        </button> 
                      ) : (
                        <button className='bg-purple-600 text-white py-2 px-4 rounded-lg' disabled ={!userDetails} onClick = {followUser} >
                        {isLoading ? "Following" : "Follow"}
                        </button>
                      )}
                    
                      
                 </div>
           </div>
        </div>
          <div className='mt-[85px]'>
          {userPosts?.publications?.items.map((post, i) =>  {

            return(
              <Post  key={i} post = {post} />
          
             )
            })}
          </div>
        
    </div>
  )
}


 {/*<Post  key={i} post = {post} />*/}