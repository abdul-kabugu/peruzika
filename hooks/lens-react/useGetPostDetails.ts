// @ts-nocheck
import {useQuery} from '@apollo/client'
import { GET_POST_DETAILS } from '../../graphql/query/getPostDetails'


  export const useGetPostDetails = (postId) => {
    const {data: postDetails, loading: isPostDetailsLoading, error: isPostDetailsError} = useQuery(GET_POST_DETAILS, {
        variables : {
            request: {
                "publicationId" : postId
            }
        }
    })

    return {postDetails, isPostDetailsLoading, isPostDetailsError}
  }