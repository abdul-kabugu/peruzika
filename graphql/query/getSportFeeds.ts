import {gql} from '@apollo/client'

 export const GET_SPORT_FEEDS = gql`
 query Publications {
  publications(request: {
   
    publicationTypes: [POST, MIRROR],
    sources: ["peruzika2"]
    metadata: {
       tags: {
        oneOf: ["sport", "sports"],
        all: ["football", "sports"]
      }
    }
  }) {
    items {
      __typename 
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`