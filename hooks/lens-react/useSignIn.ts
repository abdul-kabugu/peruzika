// @ts-nocheck
import {gql} from '@apollo/client'
import {toast} from 'react-toastify'
import {useAccount, useConnect, } from 'wagmi'
import { apolloClient } from '../../graphql/apollo/apolloClient'
import { signText } from '../../utils/ether-service'
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useState} from 'react'
// request challeng
const GET_CHALLENGE = `
query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
}
`;
export const generateChallenge = async (address) => {
    const res = await apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            }
        }
    });
    return res.data.challenge.text;
    }

    // authenticate 
    const AUTHENTICATION = `
mutation($request: SignedAuthChallenge!) {
authenticate(request: $request) {
  accessToken
  refreshToken
}
}
`;

export const lensAuthenticate = async (address, signature) => {
    const { data } = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
    });
    return data.authenticate.accessToken;
    };
    
const useSignIn  = () => {
    //const { isAuthenticated, Moralis, user} = useMoralis()
    const [isConnecting, setisConnecting] = useState(false)
  
    const { connectAsync } = useConnect({
        connector: new InjectedConnector()
      });
    const {address, isConnected, isDisconnected} = useAccount()
       const account = address
     const signIn = async() => {
      setisConnecting(true)
      try {
        if (isDisconnected) {
            const { connector } = await connectAsync();
        }
       
        // generate  challenge 
        const challenge = await generateChallenge(account);
        //  sign  genereted  challenge
        const signature = await signText(challenge);
        // Get  access Token 
        const accessToken = await lensAuthenticate(account, signature);
       console.log({accessToken});
        // Store  access token  sessionStorage
        window.sessionStorage.setItem('accessToken', accessToken);
         setisConnecting(false)
      } catch (error) {
        setisConnecting(false)
        //console.error(error);
        toast(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          
        })
         console.log(error)
      }
     }
     return {signIn, isConnecting}
}
export default useSignIn