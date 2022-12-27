// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { AiOutlineDatabase } from 'react-icons/ai'
import OrbisProvider from '../context/orbisProvider'
import CommentCard from './CommentCard'

export default function Comments({post}) {
    const [postComments, setpostComments] = useState()
    const [isCommentsLoading, setisCommentsLoading] = useState(false)
    const context = useContext(OrbisProvider)

      useEffect(() => {
         const fetchPostsComments = async () => {
            setisCommentsLoading(true)
        let { data, error } = await context.getPosts({
            master : post?.stream_id
        });
        setpostComments(data)
        setisCommentsLoading(false)
          
    }
      fetchPostsComments()
      }, [])

       if(isCommentsLoading){
        return(
          <div>
            <h1>Loading ..</h1>
          </div>
        )
       }

      if(!postComments) {
        return(
          <div className='border w-[100%] border-blue-600 h-[200px]'>
           <AiOutlineDatabase  />
            <p>No  comments  at moment</p>
          </div>
        )
      }
      
  return (
    <div>
        {postComments?.map((comment, i ) =>  {

            return(
                <CommentCard key={i}  comment = {comment} />
            )
        })}
    </div>
  )
}
