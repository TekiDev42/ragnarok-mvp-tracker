import style from './App.module.css'
import { Navbar } from "@components/Navbar/Navbar"
import { ScrollArea } from "@mantine/core"
import { DeathFormModal } from "@components/Form/DeathForm"
import { Background } from "@components/Background/Background"
import { MvpList } from "@components/MvpList/MvpList"
import { useEffect, useState, useRef } from "react"
import { setSettings } from "@store/Slice/User/UserSlice"
import { useAppDispatch } from "@store/Hooks"
import { Affix, ActionIcon } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"


const App = () => {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState(window.innerHeight)
    const viewport = useRef<HTMLDivElement>(null)


    const fetchSettings = async () => {
        if (window.mvpApi) {
            const settings = await window.mvpApi.getSettings()
            dispatch(setSettings(settings))
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        if (window.mvpApi) {
            window.mvpApi.appLoaded()
        }

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <ScrollArea 
                viewportRef={viewport} type="always" 
                overscrollBehavior="contain" h={height} 
                className="app-scroll-area"
            >
                <div className={style.App}>
                    <Background />
                    <Navbar />
                    <MvpList />
                </div>

                <DeathFormModal />
            </ScrollArea>

            <Affix position={{ bottom: 20, left: 20 }}>
                <ActionIcon onClick={() => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' })}
                    variant="filled" size="lg" radius="xl" aria-label="Settings">
                    <IconArrowUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Affix>
        </>
    )
}

export default App
