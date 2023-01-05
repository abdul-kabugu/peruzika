// @ts-nocheck
import {useQuery} from '@apollo/client'
import { GET_USER_PROFILE } from '../../graphql/query/getUserProfile'
import { useGetUserProfiles } from './useGetUserProfiles'

  export const useGetUserProfileInfo = (profileId) => {
    //const {userProfiles} = useGetUserProfiles()
    //const USER_POFILE_ID =  userProfiles?.profile?.items[0].id
    const {data: userProfile, loading : isUserInfoProfileLoading, error : isUserInfoProfileError} = useQuery(GET_USER_PROFILE, {
        variables : {
            request : {
                "profileId" : profileId
            }
        }
    })

    return{
        userProfile,
        isUserInfoProfileLoading,
        isUserInfoProfileError
    }
  }