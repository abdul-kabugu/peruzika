// @ts-nocheck
import {createSlice} from '@reduxjs/toolkit'

  const initialState  = {
    isMobileMenuOpen : false
  }

   const toggleSlice = createSlice ({
    name : "navbar",
    initialState,
     reducers : {
        toggleNavbar : (state, action) => {
          if(state.isMobileMenuOpen){
             state.isMobileMenuOpen = action.payload
          }else {
            state.isMobileMenuOpen = action.payload
          }
        }
     }
   })

   export const {toggleNavbar} = toggleSlice.actions
    export default toggleSlice.reducer
   