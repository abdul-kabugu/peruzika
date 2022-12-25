// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import Post from './Post'

export default function CryptoCategory() {
  const [cryptoPosts, setcryptoPosts] = useState()
  const [iscryptoPostsLoading, setiscryptoPostsLoading] = useState(false)

  const context = useContext(OrbisProvider)

  useEffect(() => {
    const fetchcryptoPost =  async () =>  {
     setiscryptoPostsLoading(true)
     let { data, error } = await context.getPosts({
       context : "peruzi10",
       only_master : true,
       tag : "crypto"
     });
 
     setcryptoPosts(data)
     setiscryptoPostsLoading(false)
    }
 
    fetchcryptoPost()
   }, [])
     console.log("crypto posts", cryptoPosts)

     if(iscryptoPostsLoading){
      return(
        <div>
          <h1>Loading</h1>
        </div>
      )
     }
  return (
    <div>
      {cryptoPosts?.map((post, i) => {

        return(
          <Post  key={i} post={post} />
        )
      })}
    </div>
  )
}
