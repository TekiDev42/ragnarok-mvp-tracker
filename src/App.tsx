import style from './App.module.css'
import {useEffect, useState} from "react"

import {Navbar} from "@components/Navbar/Navbar"
import {MvpCard} from "@components/MvpCard/MvpCard"
import {useAppDispatch, useAppSelector} from "@store/Hooks"
import {Flex, Pagination, ScrollArea, Select} from "@mantine/core"
import {createChunk} from "@utils/createChunk"
import {DeathFormModal} from "@components/Form/DeathForm"
import {Background} from "@components/Background/Background"
import {setPerPage, setSettings} from "@store/Slice/User/UserSlice.ts"
import {getSortedMvp} from "@utils/getSortedMvp.ts";
import {setMvps} from "@store/Slice/Mvp/Slice.ts";


const App = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector(state => state.Slice.filtered)
    const perPage = useAppSelector(state => state.userSlice.perPage)

    const [activePage, setPage] = useState(1)
    const data = createChunk(mvps.map(mvp => mvp), perPage)

    const items = data.length ? data[activePage - 1].map((mvp, i) => (
        <MvpCard key={`mvp-card-${i}`} mvp={mvp}/>
    )) : []


    useEffect(() => {
        (async () => {
            const settings = await window.mvpApi.getSettings()
            dispatch(setSettings(settings))

            const mvps = await getSortedMvp()
            dispatch(setMvps(mvps))
        })()
    }, [dispatch]);


    return (
        <>
            <div className={style.App}>
                <Background />
                <Navbar/>
                <Flex justify="center" gap={5} align={"center"}>
                    <Select
                        radius={'lg'}
                        size={'xs'}
                        placeholder="Per page"
                        data={['12', '24', '48', 'All']}
                        value={perPage > 48 ? "All" : perPage.toString()}
                        onChange={(e) => dispatch(setPerPage(e ?? "12"))}
                    />
                    <Pagination total={data.length} value={activePage} onChange={setPage} size="sm" radius="xl"/>
                </Flex>

                <ScrollArea h={800}>
                    <div className={style.cardContainer}
                         style={{width: "100%"}}>
                        {items.map(item => item)}
                    </div>
                </ScrollArea>
            </div>

            <DeathFormModal />
        </>
    )
}

export default App
