import { configureStore,EnhancedStore } from '@reduxjs/toolkit'
import sideBarReducer from "./featureSlice/slideBarSlice"
import userState from './featureSlice/userInfoSlice'
import profileReducer  from './featureSlice/profileSlice'
export const makeStore= ():EnhancedStore => {
  return configureStore({
    reducer: {
        sideBar:sideBarReducer,
        user:userState,
        profile:profileReducer
    }
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']