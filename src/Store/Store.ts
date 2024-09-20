import {configureStore} from "@reduxjs/toolkit";
import Slice from "@store/Slice/Mvp/Slice";
import modalSlice from '@store/Slice/Modal/ModalSlice'
import userSlice from '@store/Slice/User/UserSlice'

export const store = configureStore({
    reducer: {
        Slice,
        modalSlice,
        userSlice
    },
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']