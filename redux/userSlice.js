import {createSlice} from '@reduxjs/toolkit'

import {PINATA_GATEWAY, PINATA_KEY, PINATA_SECRET} from '../assets/constants'



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