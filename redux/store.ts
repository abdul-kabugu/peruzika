import {configureStore} from '@reduxjs/toolkit'
import toggleSlice from './toggleSlice';
import userSlice from './userSlice'

export const store  = configureStore ({
    reducer : {
      user : userSlice,
      navbar : toggleSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;