// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import Post from './Post'

export default function SportCategory() {
  const [sportsPosts, setsportsPosts] = useState()
  const [isSportsPostsLoading, setisSportsPostsLoading] = useState(false)

  const context = useContext(OrbisProvider)

  useEffect(() => {
   const fetchSportsPost =  async () =>  {
    setisSportsPostsLoading(true)
    let { data, error } = await context.getPosts({
      context : "peruzi10",
      only_master : true,
      tag : "sports"
    });

    setsportsPosts(data)
    setisSportsPostsLoading(false)
   }

   fetchSportsPost()
  }, [])
    console.log("sports posts", sportsPosts)

     if(isSportsPostsLoading){
      return(
        <div>
          <h1>Loading</h1>
        </div>
      )
     }
  return (
    <div>
        {sportsPosts?.map((post, i) => {

          return(
            <Post  key={i} post = {post}    />
          )
        })}
    </div>
  )
}
