import style from './App.module.css'
import { Navbar } from "@components/Navbar/Navbar"
import { Flex, ScrollArea } from "@mantine/core"
import { DeathFormModal } from "@components/Form/DeathForm"
import { Background } from "@components/Background/Background"
import { SelectPagination } from "@components/Pagination/SelectPagination"
import { MvpList } from "@components/MvpList/MvpList"
import { useEffect, useState } from "react"
import { setSettings } from "@store/Slice/User/UserSlice"
import { useAppDispatch } from "@store/Hooks"


const App = () => {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState(window.innerHeight)

    const fetchSettings = async () => {
        const settings = await window.mvpApi.getSettings()
        dispatch(setSettings(settings))
    }

    useEffect(() => {
        fetchSettings()
    }, [dispatch])

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <ScrollArea type="always" overscrollBehavior="contain" h={height}>
            <div className={style.App}>
                <Background />
                <Navbar />
                <Flex justify="center" gap={5} align="center">
                    <SelectPagination />
                </Flex>
                <MvpList />
            </div>
            <DeathFormModal />
        </ScrollArea>
    )
}

export default App
