// @ts-nocheck
import {useQuery} from '@apollo/client'
import { GET_USER_POSTS } from '../../graphql/query/getUserPosts'


   export const useGetUserPosts = (id) => {
    const {data : userPosts, loading : isGetUserPostsLoading, error : isGetUserPostsError} = useQuery(GET_USER_POSTS,{
        variables : {
            request : {
                "profileId": id,
                "publicationTypes": ["POST",  "MIRROR"],
                 
                "sources":  ["peruzika"]   //["audios"]
            }
        }
    })

     return{
        userPosts, isGetUserPostsLoading, isGetUserPostsError
     }
   }