// @ts-nocheck

import  {useState} from 'react'
import axios from 'axios'

export default function TestComponent() {
    const [fileType, setFileType] = useState()

    const detectFileType = async (hash) => {
        try {
          const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
          setFileType( response.data.Type);
          console.log("the file type", response.data.Type)
        } catch (error) {
          console.error(error);
        }
      };

       
        
  return (
    <div>
        <h1>I'm testing  component</h1>
         <button onClick={() => detectFileType("QmTwmpB6GkFw1Ns1CquDHHxPkXDyJMH66yedqVuvMQh2tN")}>check the file</button>
          <h2>the file type : {fileType}</h2>
        
    </div>
  )
}
