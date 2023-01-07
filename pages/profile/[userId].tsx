// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserBanner from '../../components/UserBanner'
import { TopNav, Sidebar, ProfileMain, TrendingBar, UserIdMain } from '../../components'
import UserStats from '../../components/UserStats'

import { setUser } from '../../redux/userSlice'
import { useGetUserProfileInfo, useGetUserPosts } from '../../hooks/lens-react'
import { HashLoader } from 'react-spinners'


function UserDetails({userId}) {
 
      
     const {userProfile, isUserInfoProfileError, isUserInfoProfileLoading} = useGetUserProfileInfo( userId)
     const {userPosts, isGetUserPostsError, isGetUserPostsLoading} = useGetUserPosts(userId)

     if(isUserInfoProfileLoading || isGetUserPostsLoading) {
      return(
        <div className='w-[100%] h-screen flex items-center justify-center'>
          <HashLoader size={100}  />
        </div>
      )
     }
     console.log("the user details from  user details page", userProfile)
     console.log("the user posts from  user details page", userPosts)
  return (
    <div className='max-w-[1300px] h-screen mx-auto'>
    <TopNav  />
   <div className='flex sm:justify-center  hide-scrollbar '>
      <Sidebar   />
      
       <UserIdMain userDetails = {userProfile} userPosts = {userPosts}   />
        
        <TrendingBar />
        </div>
  </div>
  )
}

export default UserDetails


export const  getServerSideProps = async (context) => {
 
      const  {params} = context
      const {userId} = params
    
    return {
      props : {
        userId: userId,
       
      }
    }
}