import {createSlice} from '@reduxjs/toolkit'

 const initialState = {
    user : {},
     isAuthenticated : false,
     orbis : {}
 }

 const useSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser: (state, action) => {
            state.user = action.payload
            if(action.payload.mySession.details){
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