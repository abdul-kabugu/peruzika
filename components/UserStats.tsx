// @ts-nocheck
import React from 'react'

export default function UserStats({user, userPosts}) {
    console.log("top user", user)
  return (
    <div className='mt-2 px-2'>
        <h1 className='font-serif font-semibold text-xl'>{user?.details?.profile?.username}</h1>

         <div className='mt-3 px-4 flex gap-7 w-[100%] justify-between'>
          <div>
            <h4 className='font-semibold text-2xl font-serif'>{userPosts?.length}</h4>
            <p className='capitalize font-semibold text-gray-400'>post</p>
          </div>

          <div>
            <h4 className='font-semibold text-2xl font-serif'>{user?.count_followers}</h4>
            <p className='capitalize font-semibold text-gray-400'>Followers</p>
          </div>

          <div>
            <h4 className='font-semibold text-2xl font-serif'>{user?.count_following}</h4>
            <p className='capitalize font-semibold text-gray-400'>Following</p>
          </div>
         </div>
    </div>
  )
}
