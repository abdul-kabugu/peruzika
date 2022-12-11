// @ts-nocheck
import React from 'react'
import {fakeHeadlines}  from '../assets/fakeHeadlines'
import HeadlineCard from './HeadlineCard'
export default function Headlines() {
  return (
    <div className='mt-4'>
        <div className='px-5 my-3 '>
            <span className='font-serif text-2xl font-semibold text-white bg-black px-1 py-1'>Head</span>
            <span className='font-sans text-2xl capitalize text-red-600 font-bold
              px-1
            '>lines</span>
        </div>

         <div>
            {fakeHeadlines.map((news, i) => {

                return(
                    <HeadlineCard key={i} news = {news} />
                )
            })}
         </div>
    </div>
  )
}
