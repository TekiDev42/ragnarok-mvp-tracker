import style from './App.module.css'
import { Navbar } from "@components/Navbar/Navbar"
import { Flex, ScrollArea } from "@mantine/core"
import { DeathFormModal } from "@components/Form/DeathForm"
import { Background } from "@components/Background/Background"
import { SelectPagination } from "@components/Pagination/SelectPagination"
import { MvpList } from "@components/MvpList/MvpList"
import { useEffect } from "react"
import { setSettings } from "@store/Slice/User/UserSlice"
import { useAppDispatch } from "@store/Hooks"

/**
 * Main App component
 * 
 * This component serves as the root of the application, managing the overall layout
 * and orchestrating the main components of the MVP tracker.
 * 
 * @example
 * // In index.tsx or main entry point
 * import React from 'react'
 * import ReactDOM from 'react-dom'
 * import App from './App'
 * 
 * ReactDOM.render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>,
 *   document.getElementById('root')
 * )
 */
const App = () => {
    const dispatch = useAppDispatch()

    /**
     * Fetches user settings from the API and updates the Redux store
     * 
     * @example
     * // This function is called automatically when the component mounts
     * // due to the useEffect hook below. You don't need to call it manually.
     * // However, if you needed to fetch settings again, you could do:
     * const refreshSettings = () => {
     *   fetchSettings()
     * }
     */
    const fetchSettings = async () => {
        const settings = await window.mvpApi.getSettings()
        dispatch(setSettings(settings))
    }

    /**
     * Effect hook to fetch settings when the component mounts
     * 
     * @example
     * // This useEffect is already in place and will run automatically
     * // when the App component mounts. You don't need to add it manually.
     * useEffect(() => {
     *   fetchSettings()
     * }, [dispatch])
     */
    useEffect(() => {
        fetchSettings()
    }, [dispatch])

    return (
        <>
            <div className={style.App}>
                <Background />
                <Navbar />
                <Flex justify="center" gap={5} align="center">
                    <SelectPagination />
                </Flex>
                <ScrollArea>
                    <MvpList />
                </ScrollArea>
            </div>
            <DeathFormModal />
        </>
    )
}

export default App
