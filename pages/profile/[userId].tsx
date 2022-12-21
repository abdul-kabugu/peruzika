// @ts-nocheck
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'
import UserBanner from '../../components/UserBanner'
import { TopNav, Sidebar, ProfileMain, TrendingBar } from '../../components'
import UserStats from '../../components/UserStats'

function UserDetails({userDetails, userDetailsError, userPosts, postsError}) {
 const [isGetUserLoading, setisGetUserLoading] = useState(false)
  console.log("the user details from  user details page", userDetails)
  const {} = useSelector(state => state.user)
  
  return (
    <div className='max-w-[1300px] h-screen mx-auto'>
    <TopNav  />
   <div className='flex sm:justify-center  hide-scrollbar '>
      <Sidebar   />
      
       <ProfileMain  />
        
        <TrendingBar />
        </div>
  </div>
  )
}

export default UserDetails


export const  getServerSideProps = async (context) => {
  let orbis = new Orbis();
      const  {params} = context
      const {userId} = params
      
      let { data, error } = await orbis.getProfile(userId)

      let { data :userPosts, error : userPostsError } = await orbis.getPosts({
        context : "peruzi10",
        did : userId,
        only_master : true
      });
    return {
      props : {
        userDetails : data,
        UserDetailsError : error,
        userPosts : userPosts,
        postsError : userPostsError
      }
    }
}