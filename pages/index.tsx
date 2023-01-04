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

export default function Home() {
    /*const [isDispacteched, setisDispacteched] = useState(false)
   const orbis = new Orbis({
      PINATA_GATEWAY: PINATA_GATEWAY,
      PINATA_API_KEY: PINATA_KEY,
      PINATA_SECRET_API_KEY: PINATA_SECRET
    }
     
    )

    
      
    
    
    
   
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
    const getSession = async () => {
          const res = await orbis.isConnected();
           return res
  }
  
   const  getConnectedUser = async () => {
     const currentUser = await getSession()
      dispatch(setUser({currentUser}))
      dispatch(setOrbisObject(orbis))
      console.log("conneted user", currentUser )
      setisDispacteched(true)
   }
      // getConnectedUser()  
  useEffect(() => {
      
    getConnectedUser()  
    console.log("the orbis", orbis)
    
  }, [isDispacteched])*/
  const {posts, isPostsLoading, isPostsError} = useDiscoverFeeds()
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