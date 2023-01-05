import {useLazyQuery, useQuery} from '@apollo/client'
import { GET_POST_COMMENTS } from '../../graphql/query/getPostComments'

  const useGetPostComments = (postId) =>  {
    const  {data : postComments, loading : isGetPostComentsLoading, error : isGetPostCommentsError} = useQuery(GET_POST_COMMENTS, {

        variables : {
            request : {
                commentsOf :    postId,
            }
        }
    })

    return {
  
        isGetPostComentsLoading,
        isGetPostCommentsError,
        postComments

    }
  }
  export default useGetPostComments