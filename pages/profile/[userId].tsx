// @ts-nocheck
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Orbis} from '@orbisclub/orbis-sdk'

function UserDetails({userDetails, userDetailsError}) {
 
  console.log("the user details from  user details page", userDetails)
  const {} = useSelector(state => state.user)
  
  return (
    <div>
      <h1>User Details</h1>
    </div>
  )
}

export default UserDetails


export const  getServerSideProps = async (context) => {
  let orbis = new Orbis();
      const  {params} = context
      const {userId} = params
      let { data, error } = await orbis.getProfile(userId)

    console.log('the context', context)
    return {
      props : {
        userDetails : data,
        UserDetailsError : error
      }
    }
}