import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {Flex, Badge} from "@mantine/core";
import {Countdown} from "@components/Countdown/Countdown.tsx";
import {PropsWithChildren, useEffect, useState} from "react";
import {MapHoverCard} from "@components/MvpCard/Maps/MapHoverCard.tsx";
import {setMvpMaps as setMvpMapsAction} from "@store/Slice/Mvp/Slice.ts";
import {useAppDispatch} from "@store/Hooks.ts";
import {useCallback} from "react";
import {DateTime} from "luxon";


export const MvpMapCardList = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {

    const [mvpMaps, setMvpMaps] = useState<MvpMap[]>(mvp.mvpMaps)
    const dispatch = useAppDispatch()

    const handleResetDeathTime = useCallback((mapName: string) => {
        const newMapsData = mvpMaps.map(mvpmap => mvpmap.name === mapName ? {...mvpmap, deathTime: 0} : mvpmap)
        dispatch(setMvpMapsAction({ mvp, newMapsData }))
    }, [dispatch, mvpMaps, mvp])

    
    useEffect(() => {
        setMvpMaps(mvp.mvpMaps)
    }, [mvp])


    return mvpMaps.map(mvpmap => {

        const isInstance = mvpmap.name.match(/^\d+@.+/) !== null;
        const diff = DateTime.fromMillis(mvpmap.deathTime).diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])

        return (
            <div key={mvpmap.name} className={style.countdownItem}>
                <Flex className={"flex-grow ro-cursor"} align={"center"}>
                    <MapHoverCard mvpmap={mvpmap} isInstance={isInstance} />
                </Flex>

                {!isInstance && diff.as('seconds') <= 0 && 
                    <Badge
                        size="xs"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                    >
                        ALIVE
                    </Badge>
                }

                {!isInstance && diff.as('seconds') > 0 && <Countdown
                    id={mvp.Id.toString()}
                    mvpName={mvp.Name}
                    mapName={mvpmap.name}
                    mapDisplayName={mvpmap.displayName}
                    respawn={DateTime.fromMillis(mvpmap.deathTime)}
                    handleResetDeathTime={handleResetDeathTime}
                />}
            </div>
        )
    })
}