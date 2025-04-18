import {useDispatch, useSelector, useStore} from "react-redux"
import {AppDispatch, AppStore, RootState} from "@store/Store.ts"


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore: () => AppStore = useStore