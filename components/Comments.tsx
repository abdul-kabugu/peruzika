// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
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

        console.log("this post comments", postComments)

          
      
  return (
    <div>
        {postComments?.map((comment, i ) =>  {

            return(
                <CommentCard  comment = {comment} />
            )
        })}
    </div>
  )
}
