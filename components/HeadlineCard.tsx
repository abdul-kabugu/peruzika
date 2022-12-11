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
export default function HeadlineCard({news } : HeadlineTypes) {
  return (
    <div className="py-1 px-2 border-b border-gray-300">
        <h1 className=" font-serif font-semibold  ">{truncatetext(news.title, 72)}</h1>
        
         <div className='flex items-center gap-4 justify-between py-2'>
            <div className='border border-red-600 w-[60px] rounded-md'>
                <p className='uppercase text-xs text-red-500 font-semibold'>breaking</p>
            </div>
             <h4 className='uppercase text-gray-700 text-xs font-semibold'>#{news.tags}</h4>
             <div className='flex gap-2 items-center'>
               <AiOutlineClockCircle className='text-xs w-3 h-3'/>
                <p className='capitalize text-xs'>{news.time}</p>
             </div>
         </div>
    </div>
  )
}
