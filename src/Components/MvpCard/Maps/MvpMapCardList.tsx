import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {Flex} from "@mantine/core";
import {Countdown} from "@components/Countdown/Countdown.tsx";
import {getRespawn} from "@utils/getRespawn.ts";
import {PropsWithChildren, useEffect, useState} from "react";
import {MapHoverCard} from "@components/MvpCard/Maps/MapHoverCard.tsx";
import {useAppSelector} from "@store/Hooks.ts";


export const MvpMapCardList = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {

    const [mvpMaps, setMvpMaps] = useState<MvpMap[]>(mvp.mvpMaps)
    const respawnTimer = useAppSelector(state => state.userSlice.respawnTimer)

    useEffect(() => {
        setMvpMaps(mvp.mvpMaps)
    }, [mvp.mvpMaps])

    return mvpMaps.map(mvpmap => {
            return (
                <div key={mvpmap.name} className={style.countdownItem}>
                    <Flex className={"ro-cursor"} align={"center"}>
                        <MapHoverCard mvpmap={mvpmap}/>
                    </Flex>
                    <Countdown
                        mvpName={mvp.Name}
                        mapName={mvpmap.name}
                        respawn={getRespawn(
                            mvpmap.deathTime,
                            respawnTimer === 0 ? mvpmap.respawnTimer : respawnTimer)}
                    />
                </div>
            )
        }
    )
}