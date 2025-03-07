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

const App = () => {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState(window.innerHeight)

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
        <ScrollArea type="always" overscrollBehavior="contain" h={height}>
            <div className={style.App}>
                <Background />
                <Navbar />
                <MvpList />
            </div>
            <DeathFormModal />
        </ScrollArea>
    )
}

export default App
