// @ts-nocheck
import {useState} from 'react'
import {Orbis} from '@orbisclub/orbis-sdk'
  
  const useCreatePost = () =>  {
    const [isCreating, setisCreating] = useState(false)
    const [error, setError] = useState()
     const [isError, setisError] = useState(false)
     const [isCreated, setisCreated] = useState(false)
   

    let orbis = new Orbis();
    
   const  createPost = async (postMetadata) =>  {
    try{
        setisCreating(true)
    let res = await orbis.createPost(postMetadata);
     setisCreating(false)
     setisCreated(true)
    } catch (error) {
     setisCreating(false)
     setisError(true)
     setError(error)
    }
   }

   

     return{
        createPost,
        isCreating,
        isCreated,
        error,
        isError,
       
     }
  }
  export default useCreatePost