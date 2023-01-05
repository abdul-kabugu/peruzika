// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import {fakeHeadlines}  from '../assets/fakeHeadlines'
import OrbisProvider from '../context/orbisProvider'
import { useDiscoverFeeds } from '../hooks/lens-react'
import HeadlineCard from './HeadlineCard'

export default function Headlines() {
  const [trendingNews, settrendingNews] = useState()
  const {posts, isPostsLoading, isPostsError} = useDiscoverFeeds()
   console.log('trending posts', posts)
  const context = useContext(OrbisProvider)
   /*useEffect(() => {
     const fetchTrendingNews = async () =>  {
      let { data, error } = await context.getPosts({
        context : "peruzi10",
        only_master : true,
        //algorithm : "recommendations"
      });
      const trendingData =  posts?.explorePublications?.items?.slice(0, 10)
      settrendingNews(trendingData)
     }
     fetchTrendingNews()
   }, [])
   console.log("the trending  news is here", trendingNews)*/

   const trendingData =  posts?.explorePublications?.items?.slice(0, 10)
     
     
  return (
    <div className='mt-4'>
        <div className='px-5 my-3 '>
            <span className='font-serif text-2xl font-semibold text-white bg-black px-1 py-1'>Head</span>
            <span className='font-sans text-2xl capitalize text-red-600 font-bold
              px-1
            '>lines</span>
        </div>

         <div>
            {trendingData?.map((news, i) => {

                return(
                    <HeadlineCard key={i} news = {news} />
                )
            })}
         </div>
    </div>
  )
}
