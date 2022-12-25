// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import Post from './Post'

export default function EntertinmentCategory() {
    const [entertainmentPosts, setentertainmentPosts] = useState()
  const [isentertainmentPostsLoading, setisentertainmentPostsLoading] = useState(false)

  const context = useContext(OrbisProvider)

  useEffect(() => {
    const fetchentertainmentPost =  async () =>  {
     setisentertainmentPostsLoading(true)
     let { data, error } = await context.getPosts({
       context : "peruzi10",
       only_master : true,
       tag : "entertainment"
     });
 
     setentertainmentPosts(data)
     setisentertainmentPostsLoading(false)
    }
 
    fetchentertainmentPost()
   }, [])
     console.log("entertainment posts", entertainmentPosts)
 
      if(isentertainmentPostsLoading){
       return(
         <div>
           <h1>Loading</h1>
         </div>
       )
      }
  return (
    <div>
        {entertainmentPosts?.map((post, i) =>  {

            return(
                <Post  key={i} post ={post}  />
            )
        })}
    </div>
  )
}
