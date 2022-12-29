// @ts-nocheck
import Link from 'next/link'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiClock } from 'react-icons/hi'
import {truncatetext} from '../hooks/useSubstring'

type HeadlineTypes = {
    news : {
        title : string,
        tags : string,
        time : string
    }
}
export default function HeadlineCard({news}) {

  const dateOptions = {
    timeZone: "UTC",
    language: "en-US",
    month: "short",
    day: "numeric",
    year: "numeric"
  };
   const postTags  =  news?.content?.tags?.map((tag) => {
    return tag
   })[0]
    console.log("the post tags", postTags)
  const date = new Date(news.timestamp * 1000);
  const humanReadableString = date.toLocaleString("en-US", dateOptions);
  return (
    <div className="py-1 px-2 border-b border-gray-300">
      <Link href={`/post/${news.stream_id}`}> <h1 className=" font-serif font-semibold  ">{news?.content?.title? truncatetext(news.content?.title, 77) : truncatetext(news?.content?.body, 77)}</h1> </Link> 
        
         <div className='flex items-center gap-4 justify-between py-2'>
            <div className='border border-red-600 w-[60px] rounded-md'>
                <p className='uppercase text-xs text-red-500 font-semibold'>breaking</p>
            </div>
             <h4 className='uppercase text-gray-500 text-xs font-semibold'>#{postTags?.title}</h4>
             <div className='flex gap-2 items-center'>
               <AiOutlineClockCircle className='text-xs w-3 h-3'/>
                <p className='capitalize text-xs'>{humanReadableString}</p>
             </div>
         </div>
    </div>
  )
}
