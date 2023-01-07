// @ts-nocheck
import  { useContext, useEffect, useState } from 'react'
import { PostPageMain, RelatePosts, Sidebar, TopNav, TrendingBar } from '../../components'
import OrbisProvider from '../../context/orbisProvider'
import {Orbis} from '@orbisclub/orbis-sdk'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setOrbisObject } from '../../redux/userSlice'
import { useGetPostDetails } from '../../hooks/lens-react/useGetPostDetails'
import { useRouter } from 'next/router'
import { useGetPostComments } from '../../hooks/lens-react'
import { HashLoader } from 'react-spinners'

export default function PostPage({postId}) {
 /* console.log("the post details", postDetails)
  const orbis = useContext(OrbisProvider)
   const dispatch =  useDispatch()
 useEffect(() => {
    const  getConnectedAccount  =  async () =>  {
      const getSession = async () => {
        const res = await orbis.isConnected();
         return res
}
 
const  getConnectedUser = async () => {
  const currentUser = await getSession()
   dispatch(setUser({currentUser}))
   dispatch(setOrbisObject(orbis))
   console.log("conneted user", currentUser )
  
}
getConnectedUser()

}

    getConnectedAccount()
 }, []) /*/
    const router = useRouter()
    const {id} = router.query
    const {postDetails, isPostDetailsError, isPostDetailsLoading} = useGetPostDetails(postId) 
    const {postComments, isGetPostComentsLoading, isGetPostCommentsError} = useGetPostComments(postId)
     
    if(isPostDetailsLoading || isGetPostComentsLoading) {
      return(
        <div className='w-[100%] h-screen flex items-center justify-center'>
          <HashLoader size={100}  />
        </div>
      )
     }
  return (
    <div>
        <div className='max-w-[1300px] h-screen mx-auto'>
    <TopNav />
   <div className='flex sm:justify-center  hide-scrollbar '>
      <Sidebar  />
      
        <PostPageMain post = {postDetails} postComments = {postComments} isGetPostComentsLoading = {isGetPostComentsLoading}
        isGetPostCommentsError = {isGetPostCommentsError}   
  />
        
         <TrendingBar  />
        </div>
  </div>
    </div>
  )
}

export const  getServerSideProps = async (context) => {

      const  {params} = context
      const {postId} = params
   
    return {
      props : {
        postId : postId,
     
       
      }
    }
}
