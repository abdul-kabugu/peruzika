// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'
import UserBanner from '../../components/UserBanner'
import { TopNav, Sidebar, ProfileMain, TrendingBar, UserIdMain } from '../../components'
import UserStats from '../../components/UserStats'
import OrbisProvider from '../../context/orbisProvider'
import { setUser } from '../../redux/userSlice'
import { useGetUserProfileInfo, useGetUserPosts } from '../../hooks/lens-react'


function UserDetails({userId}) {
 const [isGetUserLoading, setisGetUserLoading] = useState(false)
 // console.log("the user details from  user details page", userDetails)
  const {user} = useSelector(state => state.user)
   const context = useContext(OrbisProvider)
  // const dispatch = useDispatch()
    //console.log("the user from  user id", user)

     /* useEffect(() => {
        const getConnectedAccount  =  async () => {
          let res = await context.isConnected();
            return res
        }
      
         const setConnectedUser =  async () =>  {
            const currentUser =  await getConnectedAccount()
              dispatch(setUser({currentUser}))
         }

          setConnectedUser()
        
      }, [])*/
      
     const {userProfile, isUserInfoProfileError, isUserInfoProfileLoading} = useGetUserProfileInfo( userId)
     const {userPosts, isGetUserPostsError, isGetUserPostsLoading} = useGetUserPosts(userId)
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
  let orbis = new Orbis();
      const  {params} = context
      const {userId} = params
    
    return {
      props : {
        userId: userId,
       
      }
    }
}