import {createSlice} from '@reduxjs/toolkit'

 const initialState = {
    user : {},
     isAuthenticated : false
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
        }
    }
 })

 export const {setUser} = useSlice.actions
 export default useSlice.reducer