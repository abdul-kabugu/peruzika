// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider, useDispatch, useSelector} from 'react-redux'
import { store } from '../redux/store'
import OrbisProvider from '../context/orbisProvider'
import {PINATA_GATEWAY,PINATA_KEY,PINATA_SECRET} from '../assets/constants'
import {Orbis} from '@orbisclub/orbis-sdk'


export default function App({ Component, pageProps }: AppProps) {

  const orbis = new Orbis({
    PINATA_GATEWAY: PINATA_GATEWAY,
    PINATA_API_KEY: PINATA_KEY,
    PINATA_SECRET_API_KEY: PINATA_SECRET
  }
  )
   
  return (
    <Provider store={store}>
      <OrbisProvider.Provider value={orbis}>
    <Component {...pageProps} />
    </OrbisProvider.Provider>
    
   
    
    </Provider>
  )
}
