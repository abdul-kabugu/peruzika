// @ts-nocheck
import {Orbis} from '@orbisclub/orbis-sdk'

export default function TopNav() {
    const orbis = new Orbis()
      const authenticate = async () => {
        let res = await orbis.connect();
         console.log(res)
      }
  return (
    <div>
      <button className='capitalize text-lg ring-2 cursor-pointer py-2 px-4 rounded-lg' onClick={authenticate}>authenticate</button>
    </div>
  )
}
