// @ts-nocheck
import { useQuery } from '@apollo/client'
import {useState, useEffect, useContext} from 'react'
import { GET_SPORT_FEEDS } from '../graphql/query/getSportFeeds'
import { useDiscoverSports } from '../hooks/lens-react/useDiscoverSposrtsRelated'
import Post from './Post'

export default function SportCategory() {
const {posts, isPostsLoading} = useDiscoverSports()
 const {data, loading} = useQuery(GET_SPORT_FEEDS)
   console.log("posts from sport category", data)
     if(isPostsLoading){
      return(
        <div>
          <h1>Loading</h1>
        </div>
      )
     }
  return (
    <div>
        {posts?.explorePublications?.items?.map((post, i) => {

          return(
            <Post  key={i} post = {post}    />
          )
        })}
    </div>
  )
}
