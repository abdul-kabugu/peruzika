// @ts-nocheck
import {useState} from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'

export default function TokenGateKeys({toggleIsTokenGateModal}) {
    const [tokenName, settokenName] = useState("")
    const [tokenAddress, settokenAddress] = useState("")
    const [purchaseLink, setpurchaseLink] = useState("")
    const [isUpdatingProfile, setisUpdatingProfile] = useState(false)
    const {user, isAuthenticated, orbis} = useSelector(state => state.user)
    console.log("the user from profile", user)
      const handleAddMembership = async () => {
         setisUpdatingProfile(true)

          const userPackages = user.details?.profile?.data?.peruziMemberships
            console.log("user packages", userPackages)
           if(userPackages){
            let res = await orbis.updateProfile({
              pfp: user.details?.profile?.pfp,
              username : user.details?.profile?.username,
              description  : user.details?.profile?.description,
                data : {
                    peruziMemberships : [...userPackages, 
                        {
                            packageName : tokenName,
                            tokenAddress : tokenAddress,
                            purchaseUrl : purchaseLink
                        }
                    ]
                }
              })
           }else {
            let res = await orbis.updateProfile({
              pfp: user.details?.profile?.pfp,
              username : user.details?.profile?.username,
              description  : user.details?.profile?.description,
                data : {
                    peruziMemberships : [ 
                        {
                            packageName : tokenName,
                            tokenAddress : tokenAddress,
                            purchaseUrl : purchaseLink
                        }
                    ]
                }
              })
          }

          setisUpdatingProfile(false)
      }
  return (
    <div>
        <h1 className='text-xl font-semibold text-center py-1 mb-1'> Membership settings</h1>
        <div className='my-2'>
         <p className='text-sm font-sans text-gray-500 '>Link  your membership token to your profile  so you  can token  gate  your content  based  on  this membership 
           if you  havent  created  your  membership  click  here 👉 
             <a href='https://www.flocker.app/' target="_blank" rel="noreferrer" > <FiExternalLink className='w-6 h-6 text-blue-800 cursor-pointer inline-block' /> </a> to  create  </p>
        
         </div>
         <div>
            <h4 className='font-semibold mb-1'>Membership name</h4>
             <input  type='text' value={tokenName} onChange = {e => settokenName(e.target.value)} 
              placeholder="VVIP" 
               className='focus:outline-none w-[100%] py-2 px-4 border border-purple-300 rounded-lg mb-2'
             />

<h4 className='font-semibold mb-1'>Token address</h4>
             <input  type='text' value={tokenAddress} onChange = {e => settokenAddress(e.target.value)} 
             placeholder="0x128...." 
               className='focus:outline-none w-[100%] py-2 px-4 border border-purple-300 rounded-lg mb-2'
             />
             <h4 className='font-semibold mb-1'>Purchase url</h4>
             <input  type='text' value={purchaseLink} onChange = {e => setpurchaseLink(e.target.value)} 
             placeholder="flocker//0x9oB..." 
               className='focus:outline-none w-[100%] py-2 px-4 border border-purple-300 rounded-lg mb-2'
             />
         </div>

         <div className='mt-4 w-[90%] mx-auto flex items-center justify-between'>
         <button className='w-[40%] border border-gray-300 py-2 px-4 rounded-lg' onClick={toggleIsTokenGateModal}>Cancel</button>
         <button className='w-[40%] bg-purple-600 text-white py-2 px-4 rounded-lg' onClick={handleAddMembership} disabled={!tokenAddress || !tokenName}>
            {isUpdatingProfile  ?  <BeatLoader  size={9}  /> : "Save"}
         </button>
         </div>
    </div>
  )
}
