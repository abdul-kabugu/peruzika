// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { Main, Sidebar, TopNav, TrendingBar } from '../components'
import {Orbis} from '@orbisclub/orbis-sdk'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from '../redux/userSlice'


export default function Home() {
  const orbis = new Orbis()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
    const getSession = async () => {
          const res = await orbis.isConnected();
           return res
  }
  const getConnectedUser = async () => {
    const mySession = await getSession()
     dispatch(setUser({mySession}))
      console.log("the information  inside  function", mySession)
 }

         
  useEffect(() => {
      
    getConnectedUser()  
    
  }, [])

  return (
    <div className='max-w-[1300px] mx-auto '  >
        <div className='flex gap-1'>
            <Sidebar />
             <Main />
              <TrendingBar />
        </div>
       
       
    </div>
  )
}
