import style from './App.module.css'

import {Navbar} from "@components/Navbar/Navbar"
import {Flex, ScrollArea} from "@mantine/core"
import {DeathFormModal} from "@components/Form/DeathForm"
import {Background} from "@components/Background/Background"
import {SelectPagination} from "@components/Pagination/SelectPagination.tsx";
import {MvpList} from "@components/MvpList/MvpList.tsx";


const App = () => {
    return (
        <>
            <div className={style.App}>
                <Background />
                <Navbar/>
                <Flex justify="center" gap={5} align={"center"}>
                    <SelectPagination />
                </Flex>

                <ScrollArea h={800}>
                    <MvpList />
                </ScrollArea>
            </div>

            <DeathFormModal />
        </>
    )
}

export default App
