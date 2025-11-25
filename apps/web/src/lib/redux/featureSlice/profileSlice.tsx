// store/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState}   from '../store'
type Profile = {
  isOpen: boolean
}

const initialState: Profile = {
  isOpen:false
}
export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleProfile(state, action: PayloadAction<boolean>) {
       
      state.isOpen =action.payload
    }
  }
})

// Export the action
export const { toggleProfile } = ProfileSlice.actions
export const profileState=(state:RootState)=>state.profile.isOpen
// Export the reducer
export default ProfileSlice.reducer
