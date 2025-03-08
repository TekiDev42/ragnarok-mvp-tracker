import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {Flex} from "@mantine/core";
import {Countdown} from "@components/Countdown/Countdown.tsx";
import {getRespawn} from "@utils/getRespawn.ts";
import {PropsWithChildren, useEffect, useState} from "react";
import {MapHoverCard} from "@components/MvpCard/Maps/MapHoverCard.tsx";
import {useAppSelector} from "@store/Hooks.ts";
import {setMvpMaps as setMvpMapsAction} from "@store/Slice/Mvp/Slice.ts";
import {useAppDispatch} from "@store/Hooks.ts";
import {useCallback} from "react";

export const MvpMapCardList = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {

    const [mvpMaps, setMvpMaps] = useState<MvpMap[]>(mvp.mvpMaps)
    const respawnTimer = useAppSelector(state => state.userSlice.respawnTimer)
    const dispatch = useAppDispatch()

    const handleResetDeathTime = useCallback((mapName: string) => {
        const newMapsData = mvpMaps.map(mvpmap => mvpmap.name === mapName ? {...mvpmap, deathTime: "1970-01-01T01:00:00"} : mvpmap)
        dispatch(setMvpMapsAction({ mvp, newMapsData }))
    }, [dispatch, mvpMaps, mvp])

    useEffect(() => {
        setMvpMaps(mvp.mvpMaps)
    }, [mvp.mvpMaps])

    return mvpMaps.map(mvpmap => {
        const isInstance = mvpmap.name.match(/^\d+@.+/) !== null;

        return (
            <div key={mvpmap.name} className={style.countdownItem}>
                <Flex className={"flex-grow ro-cursor"} align={"center"}>
                    <MapHoverCard mvpmap={mvpmap} isInstance={isInstance} />
                </Flex>
                {!isInstance && <Countdown
                    mvpName={mvp.Name}
                    mapName={mvpmap.name}
                    respawn={getRespawn(
                        mvpmap.deathTime,
                        respawnTimer === 0 ? mvpmap.respawnTimer : respawnTimer)}
                    handleResetDeathTime={handleResetDeathTime}
                />}
            </div>
        )
    })
}