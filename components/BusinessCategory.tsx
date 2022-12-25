
// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import Post from './Post'
export default function BusinessCategory() {
  const [businessPosts, setbusinessPosts] = useState()
  const [isbusinessPostsLoading, setisbusinessPostsLoading] = useState(false)

  const context = useContext(OrbisProvider)
  useEffect(() => {
    const fetchbusinessPost =  async () =>  {
     setisbusinessPostsLoading(true)
     let { data, error } = await context.getPosts({
       context : "peruzi10",
       only_master : true,
       tag : "business"
     });
 
     setbusinessPosts(data)
     setisbusinessPostsLoading(false)
    }
 
    fetchbusinessPost()
   }, [])
     console.log("business posts", businessPosts)
 
      if(isbusinessPostsLoading){
       return(
         <div>
           <h1>Loading</h1>
         </div>
       )
      }
  return (
    <div>
       {businessPosts?.map((post, i) =>  {

        return(
          <Post key={i} post ={post} />
        )
       })}
    </div>
  )
}
