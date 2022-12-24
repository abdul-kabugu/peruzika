import {createSlice} from '@reduxjs/toolkit'
import {Orbis} from '@orbisclub/orbis-sdk'
import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'

const orbis = new Orbis({
    PINATA_GATEWAY: PINATA_GATEWAY,
    PINATA_API_KEY: PINATA_KEY,
    PINATA_SECRET_API_KEY: PINATA_SECRET
  }
  )

 const initialState = {
    user : {},
     isAuthenticated : false,
     orbis :  {}
 }

 const useSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser: (state, action) => {
            state.user = action.payload.currentUser
            if(action.payload.currentUser.details){
             state.isAuthenticated = true
            }
        },
        setOrbisObject : (state, action) => {
            state.orbis = action.payload
        }
    }
 })

 export const {setUser, setOrbisObject} = useSlice.actions
 export default useSlice.reducer