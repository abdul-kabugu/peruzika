// @ts-nocheck
import {useState, useEffect} from 'react'
import {Orbis} from '@orbisclub/orbis-sdk'
import { useSelector } from 'react-redux'

export default function UserStats({userInfo, userPosts}) {
    console.log("top user", userInfo)

    const [theUserData, settheUserData] = useState()
    const {user, orbis} = useSelector(state => state.user)
     console.log("user from stats comp", user)
      useEffect(() => {
          const fetchUserDetails = async () =>  {
           let orbis = new Orbis();
           let { data, error } = await orbis.getProfile(user.did);
           settheUserData(data)
          }
          fetchUserDetails()
      }, [user])
      
     console.log("the user data", theUserData)
  return (
    <div className='mt-2 px-2'>
        <h1 className='font-serif font-semibold text-xl'>{theUserData?.details?.profile?.username }</h1>

         <div className='mt-3 px-4 flex gap-7 w-[100%] justify-between'>
          <div>
            <h4 className='font-semibold text-2xl font-serif'>{userPosts?.length || "-"}</h4>
            <p className='capitalize font-semibold text-gray-400'>post</p>
          </div>

          <div>
            <h4 className='font-semibold text-2xl font-serif'>{theUserData?.count_followers || "-"}</h4>
            <p className='capitalize font-semibold text-gray-400'>Followers</p>
          </div>

          <div>
            <h4 className='font-semibold text-2xl font-serif'>{theUserData?.count_following || "-"}</h4>
            <p className='capitalize font-semibold text-gray-400'>Following</p>
          </div>
         </div>
    </div>
  )
}
