import {useDispatch, useSelector, useStore} from "react-redux"
import {AppDispatch, AppStore, RootState} from "@store/Store.ts"

/**
 * Custom hook for dispatching actions in the app.
 * This hook is typed with the app's dispatch type for better type inference.
 * 
 * @returns {AppDispatch} The dispatch function
 * 
 * @example
 * const dispatch = useAppDispatch()
 * dispatch(someAction())
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

/**
 * Custom hook for selecting state from the Redux store.
 * This hook is typed with the app's root state type for better type inference.
 * 
 * @returns {Function} A selector function
 * 
 * @example
 * const user = useAppSelector(state => state.user)
 * console.log(user.name)
 */
export const useAppSelector = useSelector.withTypes<RootState>()

/**
 * Custom hook for accessing the Redux store.
 * This hook returns the entire Redux store, typed as AppStore.
 * 
 * @returns {AppStore} The Redux store
 * 
 * @example
 * const store = useAppStore()
 * console.log(store.getState())
 */
export const useAppStore: () => AppStore = useStore