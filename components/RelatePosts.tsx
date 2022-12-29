// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import OrbisProvider from '../context/orbisProvider'
import {BiSearch} from 'react-icons/bi'
import RelatedPostCard from './RelatedPostCard'

export default function RelatePosts({post}) {
  const [relatedPosts, setrelatedPosts] = useState()
  const [isRelatedLoading, setisRelatedLoading] = useState(false)
  const [searchTxt, setsearchTxt] = useState("")
  const [isSearchActive, setisSearchActive] = useState(false)
  const context = useContext(OrbisProvider)

   const toggleIsSearchActive = () => {
    isSearchActive? setisSearchActive(false) : setisSearchActive(true)
   }
  useEffect(() => {
    const fetchRelatedPosts = async () =>  {
      setisRelatedLoading(true)
      const relatedTag =  post?.content?.tags?.map((tag) => {
        return tag
      })[0]
       
      let { data, error } = await context.getPosts({
        context : "peruzi10",
        only_master : true,
        tag : relatedTag.slug
      });

      setrelatedPosts(data)
      setisRelatedLoading(false)
    }
     
    fetchRelatedPosts()
  }, [])
  
    console.log("the realted posts", relatedPosts)
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

       <div className='mt-6'>
        <p className='font-semibold text-xl'>Related</p>
       </div>

       <div>
        {relatedPosts?.map((post, i) => {

          return(
            <RelatedPostCard   key={i} post = {post}  />
          )
        })}
       </div>
    </div>
  )
}
