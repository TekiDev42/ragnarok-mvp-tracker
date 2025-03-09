import style from './App.module.css'
import { Navbar } from "@components/Navbar/Navbar"
import { ScrollArea } from "@mantine/core"
import { DeathFormModal } from "@components/Form/DeathForm"
import { Background } from "@components/Background/Background"
import { MvpList } from "@components/MvpList/MvpList"
import { useEffect, useState } from "react"
import { setSettings } from "@store/Slice/User/UserSlice"
import { useAppDispatch } from "@store/Hooks"
import { supabase } from "@/supabase/supabase"
import { setUserSession } from "@store/Slice/User/UserSlice"
import { Affix, Button, Transition } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"
import { useRef } from "react"

const App = () => {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState(window.innerHeight)
    const [scroll, setScroll] = useState(0)
    const viewport = useRef<HTMLDivElement>(null)

    const fetchSettings = async () => {
        const settings = await window.mvpApi.getSettings()
        dispatch(setSettings(settings))
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
        <ScrollArea 
            viewportRef={viewport} type="always" 
            overscrollBehavior="contain" h={height} 
            onScrollPositionChange={(e) => setScroll(e.y)}
        >
            <div className={style.App}>
                <Background />
                <Navbar />
                <MvpList />
            </div>

            <DeathFormModal />

            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll > 0}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconArrowUp size={16} />}
                            style={transitionStyles}
                            onClick={() => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' })}
                        >Scroll to top</Button>
                    )}
                </Transition>
            </Affix>
        </ScrollArea>
    )
}

export default App
