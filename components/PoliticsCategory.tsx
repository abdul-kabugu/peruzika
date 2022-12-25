// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import Post from './Post'

export default function PoliticsCategory() {
  const [politicsPosts, setpoliticsPosts] = useState()
  const [ispoliticsPostsLoading, setispoliticsPostsLoading] = useState(false)

  const context = useContext(OrbisProvider)

  useEffect(() => {
    const fetchpoliticsPost =  async () =>  {
     setispoliticsPostsLoading(true)
     let { data, error } = await context.getPosts({
       context : "peruzi10",
       only_master : true,
       tag : "politics"
     });
 
     setpoliticsPosts(data)
     setispoliticsPostsLoading(false)
    }
 
    fetchpoliticsPost()
   }, [])
     console.log("politics posts", politicsPosts)
  return (
    <div>
       {politicsPosts?.map((post, i) =>  {

        return(
          <Post  key={i} post ={post}  />
        )
       })}
    </div>
  )
}
