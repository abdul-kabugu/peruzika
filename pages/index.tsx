// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { Main, Sidebar, TopNav, TrendingBar } from '../components'
import {Orbis} from '@orbisclub/orbis-sdk'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser, setOrbisObject} from '../redux/userSlice'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'
import { useDiscoverFeeds } from '../hooks/lens-react'
import { BiLoader } from 'react-icons/bi'
import { HashLoader } from 'react-spinners'

export default function Home() {
  

  const {posts, isPostsLoading, isPostsError} = useDiscoverFeeds()

   if(isPostsLoading) {
    return(
      <div className='w-[100%] h-screen flex items-center justify-center'>
        <HashLoader  size={100}  />
      </div>
    )
   }
  return (
    <div className='max-w-[1300px] mx-auto  '  >
      <TopNav   />
        <div className='flex gap-1 lg:px-5 lg:justify-center md:justify-center  sm:justify-center xl:justify-center '>
            <Sidebar />
             <Main posts = {posts}  postsError = {isPostsError} postsLoading = {isPostsLoading} />
              <TrendingBar />
        </div>
       
       
    </div>
  )
}

  /*export  async function getServerSideProps() {
   /* const orbis = new Orbis()
    let { data, error } = await orbis.getPosts({
      context : "peruzi10",
      only_master : true
    });
     const {posts, isPostsError} = useDiscoverFeeds()

    return {
      props : {
        posts : posts,
        PostsError : isPostsError
      }
    }
  }
*/