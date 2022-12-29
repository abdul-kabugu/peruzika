// @ts-nocheck
import {useState} from 'react'
import { BiSearch } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import Authenticate from './Authenticate'
import Headlines from './Headlines'

export default function TrendingBar() {
  const [searchTxt, setsearchTxt] = useState("")
  const [isSearchActive, setisSearchActive] = useState(false) 
  const {user, isAuthenticated} = useSelector(state => state.user)
  const toggleIsSearchActive = () => {
     isSearchActive ? setisSearchActive(false) : setisSearchActive(true)
  }
  return (
    <div className=' xs:hidden lg:block xl:w-[350px]  w-[315px]  h-screen px-2
      overflow-y-scroll hide-scrollbar
    '>
     <div className={`border-2 ${isSearchActive && "border-purple-700"} border-gray-300  mt-3 pt-2 flex items-center gap-1 px-2 rounded-lg`}
       onClick = {toggleIsSearchActive}
     >
       <BiSearch  className={`w-7 h-7 ${isSearchActive && "text-purple-600"} text-gray-300 cursor-pointer`} />
        <input   value={searchTxt}    onChange = {e => setsearchTxt(e.target.value)} 
        placeholder="Search " className='w-[90%] py-1 focus:outline-none'
        />
     </div>

       {!isAuthenticated && <Authenticate  />}

         <Headlines  />
    </div>
  )
}
