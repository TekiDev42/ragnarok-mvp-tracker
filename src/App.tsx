import style from './App.module.css'
import { Navbar } from "@components/Navbar/Navbar"
import { ScrollArea } from "@mantine/core"
import { DeathFormModal } from "@components/Form/DeathForm"
import { Background } from "@components/Background/Background"
import { MvpList } from "@components/MvpList/MvpList"
import { useEffect, useState, useRef } from "react"
import { setSettings } from "@store/Slice/User/UserSlice"
import { useAppDispatch } from "@store/Hooks"
import { supabase } from "@/supabase/supabase"
import { setUserSession } from "@store/Slice/User/UserSlice"
import { Affix, ActionIcon } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"
import { useSubscriptionsSupabase } from "@components/SubscriptionsSupabase/SubscriptionsSupabase"


const App = () => {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState(window.innerHeight)
    const viewport = useRef<HTMLDivElement>(null)

    useSubscriptionsSupabase()

    const fetchSettings = async () => {
        if (window.mvpApi) {
            const settings = await window.mvpApi.getSettings()
            dispatch(setSettings(settings))
        }
    }

    const fetchUserSession = async () => {
        const {data, error} = await supabase.auth.getSession()
        if (error) {
            console.error(error)
        }

        if (data) {
            dispatch(setUserSession(data.session))
        }
    }

    useEffect(() => {
        fetchSettings()
        fetchUserSession()
    }, [dispatch])

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <ScrollArea 
                viewportRef={viewport} type="always" 
                overscrollBehavior="contain" h={height} 
            >
                <div className={style.App}>
                    <Background />
                    <Navbar />
                    <MvpList />
                </div>

                <DeathFormModal />
            </ScrollArea>

            <Affix position={{ bottom: 20, right: 20 }}>
                <ActionIcon onClick={() => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' })}
                    variant="filled" size="lg" radius="xl" aria-label="Settings">
                    <IconArrowUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Affix>
        </>
    )
}

export default App
