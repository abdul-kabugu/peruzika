// @ts-nocheck
import {useQuery} from '@apollo/client'
import { DISCOVER_FEEDS } from '../../graphql/query/discover-feeds'



export const useDiscoverSports = (tags) => {
    const {data :posts , loading : isPostsLoading, error: isPostsError} = useQuery(DISCOVER_FEEDS, {
        variables : {
            request : {
                "sortCriteria":   "LATEST",  //"TOP_COLLECTED",
                "publicationTypes": ["POST", "MIRROR"],
                
                "sources":  ['peruzika2'],      //["audios"], 

                metadata : {
                    "mainContentFocus": ["ARTICLE"],
                     "tags" : ["sport"]
                  }

            }
        }
    })

    return {posts, isPostsLoading, isPostsError}
}