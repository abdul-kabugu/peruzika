// @ts-nocheck
import  { useContext, useEffect, useState } from 'react'
import { PostPageMain, RelatePosts, Sidebar, TopNav } from '../../components'
import OrbisProvider from '../../context/orbisProvider'
import {Orbis} from '@orbisclub/orbis-sdk'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setOrbisObject } from '../../redux/userSlice'

export default function PostPage({ postDetails}) {
  console.log("the post details", postDetails)
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
 }, [])
 
     
  return (
    <div>
        <div className='max-w-[1300px] h-screen mx-auto'>
    <TopNav />
   <div className='flex sm:justify-center  hide-scrollbar '>
      <Sidebar  />
      
        <PostPageMain post = {postDetails}  />
        
        <RelatePosts />
        </div>
  </div>
    </div>
  )
}

export const  getServerSideProps = async (context) => {
  let orbis = new Orbis();
      const  {params} = context
      const {postId} = params
     let { data, error } = await orbis.getPost(postId);
    return {
      props : {
        postDetails : data,
         postDetailsEror : error,
       
      }
    }
}
