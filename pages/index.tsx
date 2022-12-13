// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { Main, Sidebar, TopNav, TrendingBar } from '../components'
import {Orbis} from '@orbisclub/orbis-sdk'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser, setOrbisObject} from '../redux/userSlice'


export default function Home({posts, PostsError}) {
  
    const orbis = new Orbis()
   
  
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
   }
         
  useEffect(() => {
      
    getConnectedUser()  
    
  }, [])

  return (
    <div className='max-w-[1300px] mx-auto  '  >
      <TopNav   />
        <div className='flex gap-1 lg:px-5 lg:justify-center md:justify-center  sm:justify-center xl:justify-center '>
            <Sidebar />
             <Main posts = {posts}  postsError = {PostsError} />
              <TrendingBar />
        </div>
       
       
    </div>
  )
}

  export  async function getServerSideProps() {
    const orbis = new Orbis()
    let { data, error } = await orbis.getPosts({
      context : "peruzi10"
    });

    return {
      props : {
        posts : data,
        PostsError : error
      }
    }
  }
