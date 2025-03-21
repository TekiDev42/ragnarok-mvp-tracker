import { configureStore } from "@reduxjs/toolkit"
import Slice from "@store/Slice/Mvp/Slice"
import modalSlice from '@store/Slice/Modal/ModalSlice'
import userSlice from '@store/Slice/User/UserSlice'
import partySlice from '@store/Slice/Party/PartySlice'

/**
 * Configures and creates the Redux store for the application.
 * 
 * @example
 * // To use the store in a component:
 * import { useSelector, useDispatch } from 'react-redux'
 * import { RootState, AppDispatch } from './Store'
 * 
 * const MyComponent = () => {
 *   const mvpState = useSelector((state: RootState) => state.Slice)
 *   const dispatch = useDispatch<AppDispatch>()
 *   
 *   // Use mvpState and dispatch here
 * }
 */
export const store = configureStore({
    reducer: {
        Slice,
        modalSlice,
        userSlice,
        partySlice
    },
})

/**
 * Type representing the entire Redux store.
 * 
 * @example
 * // To use AppStore type:
 * import { AppStore } from './Store'
 * 
 * const storeInstance: AppStore = store
 */
export type AppStore = typeof store

/**
 * Type representing the root state of the Redux store.
 * 
 * @example
 * // To use RootState in a selector:
 * import { RootState } from './Store'
 * 
 * const selectMvps = (state: RootState) => state.Slice.mvps
 */
export type RootState = ReturnType<AppStore['getState']>

/**
 * Type representing the dispatch function of the Redux store.
 * 
 * @example
 * // To use AppDispatch in a component:
 * import { AppDispatch } from './Store'
 * 
 * const dispatch = useDispatch<AppDispatch>()
 * dispatch(someMvpAction())
 */
export type AppDispatch = AppStore['dispatch']