// @ts-nocheck
import {useState, useRef} from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineSetting } from 'react-icons/ai'
import { RiImageAddLine } from 'react-icons/ri';
import TextareaAutosize from 'react-textarea-autosize';
import { useDisplayImage } from '../hooks/orbis-react';
import Modal from './Modal';

export default function CreateFullPost() {
  const [postTitle, setpostTitle] = useState("")
   const [postTags, setpostTags] = useState([])
   const [tagTxt, settagTxt] = useState("")
   const [postText,setPostText] = useState("")
   const [isPostStting, setisPostStting] = useState(false)
    const [coverFile, setcoverFile] = useState([])
    const [rulesChain, setrulesChain] = useState("polygon")
    const [tokenType, setTokenType] = useState("ERC721")
    const [tokenAddress, settokenAddress] = useState("")
    const [tokenBalance, settokenBalance] = useState("")
   const {result, uploader } = useDisplayImage()
    console.log("the selected file", coverFile)
    console.log("the file result", result)
     const coverRef = useRef(null)
      console.log("these are post  tags", postTags)
     const  addNewTag  = (event) =>  {
       if(event.key === 'Enter' && tagTxt && postTags.length < 5){
       setpostTags([...postTags, {slug : tagTxt, title : tagTxt}])
         settagTxt("")
       }
     }

        const  handleOpenInput = () =>  {
           coverRef.current.click()
        }
       const toggleIsSettingsModal = () =>  {
        isPostStting ?  setisPostStting(false) : setisPostStting(true)
       }
       //Remove  tag
   const removeTag = (index) => {
    setpostTags([...postTags.filter(tags => postTags.indexOf(tags) !== index)])
   }
  return (
    <div className='w-[100%] h-screen border '>
       <div className='flex justify-between  xs:flex-col '>
         <div>
        <input type="text" value={postTitle} onChange = {e => setpostTitle(e.target.value)}
          placeholder="Type title ..."
          className='border  w-[100%] py-3 rounded-sm px-2 placeholder:text-3xl
          placeholder:font-semibold placeholder:text-black focus:outline-none xs:mb-2
           text-3xl text-black
          '
        />

        <div className='w-[100%]  border border-gray-300 mt-2 flex items-center xs:flex-wrap '>
          <input  value={tagTxt} onChange = {e => settagTxt(e.target.value)} 
          placeholder="Add Tag ... "
          onKeyUp={event  => addNewTag(event)}
          className="py-2 placeholder:text-black placeholder:text-lg px-2 xs:max-w-[150px] focus:outline-none hover:outline
             outline-1 outline-purple-500
          "
          />
          <div className='flex gap-2 flex-wrap'>
              {postTags?.map((tag, i) =>  {

                return(
                  
                     
                        <div key={i} className='flex items-center py-1 xs:px-2 xs:min-w-[50px] rounded-lg bg-purple-600
                          text-white flex-wrap gap-2 xs:mr-2 xs:mb-2
                        '>
                          <p>{tag.title}</p>
                           <AiOutlineClose className='cursor-pointer'
                             onClick={() => removeTag(i)}
                           />
                        </div>
                    
                
                )
              })}
          </div>
        </div>
          <div>
              <TextareaAutosize 
                className='resize-none min-w-[100%] focus:outline-none mt-3 border border-gray-300
                  px-3  py-2
                '
                   value={postText}
                   
                   onChange = {e => setPostText(e.target.value)}
                   placeholder="write ..."
              />
          </div>
        </div>
          <div className='xs:order-first  flex justify-between py-2 xs:py-1 xs:mb-2 xs:px-2'>
             <div className='flex items-center gap-2 cursor-pointer '>
                 <AiOutlineLeft size={24} className='w'  />
                   <p className='font-semibold text-lg'>Post</p>
             </div>
            <div className='flex xs:gap-4 items-center'>
              <button className='py-1 px-2 border border-gray-300 rounded-sm '>Publish</button>
               <div className='rounded-2xl flex items-center justify-center w-10 h-9 border border-gray-300 cursor-pointer'
                 onClick={toggleIsSettingsModal}
               >
                 <AiOutlineSetting className='w-5 h-5' /> 
                 </div>
                <div className='rounded-2xl flex items-center justify-center w-9 h-9 border border-gray-300'>{postText.length}</div>
                </div>
          </div>
       </div>
       {isPostStting &&
       <Modal>
        <div>
         <h1 className='text-2xl text-center font-semibold py-2'>Post settings</h1>
   <div>
        <h4 className='capitalize text-xl font-semibold'>title</h4>
        <p className='capitalize py-1 text-gray-400'>The title  of  your post</p>
         <div className='w-[100%] border border-purple-300 rounded-md min-h-[40px] flex items-center
           px-2 text-lg
         '>{postTitle}</div>

<h4 className='capitalize text-xl font-semibold'>tags</h4>
        <p className='capitalize py-1 text-gray-400'>The tags  of  your post</p>
         <div className='w-[100%] border border-purple-300 rounded-md min-h-[40px] flex items-center
           px-2 gap-3
         '>{postTags?.map((tag, i) => {

           return(
            <div key={i} className=' cursor-pointer px-2 font-semibold'>
              #{tag.title}
            </div>
           )
         })}</div>

<h4 className=' text-xl font-semibold'>cover image</h4>
        <p className='capitalize py-1 text-gray-400'>Display an image prominently at the top of your post.</p>
         <div className='w-[100%] border-2 border-dashed border-purple-300 rounded-md min-h-[100px] flex items-center py-2  justify-center
           px-2 text-lg cursor-pointer max-h-[280px]
         ' onClick={handleOpenInput}>
            {
              result ? (
                <img    src={result} className="w-[100%] object-cover rounded-lg max-h-[250px]"  />
              ) : (
                <>
                <RiImageAddLine size={30} className="text-gray-400" />
                <input  type="file" onChange={e => {setcoverFile(e.target.files[0])
                uploader(e)
              } }
                   ref={coverRef} accept="image/*" hidden 
                   
                />
                </>
              )
            }
          
         </div>

         <h4 className='capitalize text-xl font-semibold'>encryption Rules</h4>
        <p className='capitalize py-1 text-gray-400'>If this is set, your post wil be token gated  based on  rules you set</p>
          
        <h4 className='capitalize  font-semibold'>chain</h4>
        <select value={rulesChain} onChange = {e => setrulesChain(e.target.value)} 
          className="w-[100%] py-2 px-3 focus:outline-none border border-purple-300 rounded-md"
        >
          <option value="polygon">Polygon</option>
          <option value="ethereum">Ethereum</option>
        </select>

        <h4 className='capitalize  font-semibold mt-2'>token type</h4>
        <select value={tokenType} onChange = {e => setTokenType(e.target.value)} 
          className="w-[100%] py-2 px-3 focus:outline-none border border-purple-300 rounded-md"
        >
          <option value="ERC20">ERC20 Token</option>
          <option value="ERC721">ERC721 Token</option>
          <option value="ERC1155">ERC1155 Token</option>
        </select>

        <h4 className='capitalize  font-semibold mt-2'>token address</h4>
        <select value={tokenType} onChange = {e => setTokenType(e.target.value)} 
          className="w-[100%] py-2 px-3 focus:outline-none border border-purple-300 rounded-md"
        >
          <option value="ERC20">VIP</option>
          <option value="ERC721">VVI</option>
          <option value="ERC1155">Chiep</option>
        </select>
        <h4 className='capitalize  font-semibold mt-2'>Required token balance</h4>
         <input  type="number" value={tokenBalance} onChange = {e => settokenBalance(e.target.value)}   
         placeholder="0.00" className='w-[100%] py-2 px-4 focus:outline-none border border-purple-300 rounded-lg'
         />
   </div>
          <div className='flex gap-4 justify-between mt-7 mb-4 w-[90%] items-center mx-auto'>
            <button onClick={toggleIsSettingsModal} className="w-2/5 border border-gray-300 py-2 px-4 rounded-lg">cancel</button>
             <button className=' bg-purple-600 text-white w-2/5 py-2 px-4 rounded-lg ' onClick={toggleIsSettingsModal}>Save</button>
          </div>
          </div>
       </Modal>
       
       } 
    </div>
  )
}
