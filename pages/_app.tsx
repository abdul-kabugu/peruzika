// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider, useDispatch, useSelector} from 'react-redux'
import { store } from '../redux/store'
import OrbisProvider from '../context/orbisProvider'
import {PINATA_GATEWAY,PINATA_KEY,PINATA_SECRET} from '../assets/constants'
import {configureChains, createClient, WagmiConfig} from 'wagmi'
import {mainnet, polygonMumbai, polygon} from 'wagmi/chains'
import {publicProvider} from 'wagmi/providers/public'
import {ApolloProvider} from "@apollo/client"
import {bindings as wagmiBindings} from '@lens-protocol/wagmi'
import { apolloClient } from '../graphql/apollo/apolloClient'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})



export default function App({ Component, pageProps }: AppProps) {

   
  return (
    <Provider store={store}>
      
        <WagmiConfig client={client}>
         <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
    </ApolloProvider>

    </WagmiConfig>

    
   
    
    </Provider>
  )
}
