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
 */
const App = () => {
    const dispatch = useAppDispatch()

    /**
     * Fetches user settings from the API and updates the Redux store
     */
    const fetchSettings = async () => {
        const settings = await window.mvpApi.getSettings()
        dispatch(setSettings(settings))
    }

    // Fetch settings when the component mounts
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
