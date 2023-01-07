// @ts-nocheck
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'
import { setUser, setOrbisObject } from '../../redux/userSlice'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../../assets/constants'
import { Sidebar, TopNav, TrendingBar } from '../../components'
import ProfileMain from '../../components/ProfileMain'
import { useGetUserPosts, useGetUserProfileInfo, useGetUserProfiles } from '../../hooks/lens-react'

export default function UserProfile() {
const {userProfiles, isUserProfilesLoading, isUserProfileError} = useGetUserProfiles()
const FIRST_USER_ID = userProfiles?.profiles?.items[0]
 const {userProfile, isUserInfoProfileLoading, isUserInfoProfileError} = useGetUserProfileInfo(FIRST_USER_ID?.id)
 const {userPosts, isGetUserPostsLoading, isGetUserPostsError} = useGetUserPosts(FIRST_USER_ID?.id)
  console.log("the user posts", userPosts)

     
         
  
  
  return (
    <div className='max-w-[1300px] h-screen mx-auto'>
      <TopNav  />
     <div className='flex sm:justify-center  hide-scrollbar '>
        <Sidebar   />
         <ProfileMain userDetails = {userProfile} userPosts = {userPosts} />
          <TrendingBar />
          </div>
    </div>
  )
}

 /*export async function getServerSideProps(){
  let orbis = new Orbis();
  let { data, error } = await orbis.getProfile(user.id);

  return {
    props : {
      userData : data,
       userError : error
    }
  }
}*/
