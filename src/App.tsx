import style from './App.module.css'

import {Navbar} from "@components/Navbar/Navbar"
import {Flex, ScrollArea} from "@mantine/core"
import {DeathFormModal} from "@components/Form/DeathForm"
import {Background} from "@components/Background/Background"
import {SelectPagination} from "@components/Pagination/SelectPagination.tsx"
import {MvpList} from "@components/MvpList/MvpList.tsx"
import {useEffect} from "react"
import {setSettings} from "@store/Slice/User/UserSlice.ts"
import {useAppDispatch} from "@store/Hooks.ts"


const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const settings = await window.mvpApi.getSettings()
            dispatch(setSettings(settings))
        })()
    }, [dispatch]);

    return (
        <>
            <div className={style.App}>
                <Background />
                <Navbar/>
                <Flex justify="center" gap={5} align={"center"}>
                    <SelectPagination />
                </Flex>

                <ScrollArea h={650}>
                    <MvpList />
                </ScrollArea>
            </div>

            <DeathFormModal />
        </>
    )
}

export default App
