// @ts-nocheck
import Link from 'next/link'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiClock } from 'react-icons/hi'
import {truncatetext} from '../hooks/lens-react/useSubstring'

type HeadlineTypes = {
    news : {
        title : string,
        tags : string,
        time : string
    }
}
export default function HeadlineCard({news}) {

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return (
    <div className="py-1 px-2 border-b border-gray-300">
      <Link href={`/post/${news?.id}`}> <h1 className=" font-serif font-semibold  ">{news?.metadata?.content && truncatetext(news?.metadata?.content, 77) }</h1> </Link> 
        
         <div className='flex items-center gap-4 justify-between py-2'>
            <div className='border border-red-600 w-[60px] rounded-md'>
                <p className='uppercase text-xs text-red-500 font-semibold'>breaking</p>
            </div>
             <h4 className='uppercase text-gray-500 text-xs font-semibold'># hellow tag</h4>
             <div className='flex gap-2 items-center'>
               <AiOutlineClockCircle className='text-xs w-3 h-3'/>
                <p className='capitalize text-xs'>{news &&  new Intl.DateTimeFormat('en-US', options).format(new Date(news?.createdAt))}</p>
             </div>
         </div>
    </div>
  )
}
