import style from "@components/MvpCard/Maps/MapHoverCard.module.css";
import {Flex, Badge} from "@mantine/core";
import {Countdown} from "@components/Countdown/Countdown.tsx";
import {PropsWithChildren, useEffect, useState} from "react";
import {MapHoverCard} from "@components/MvpCard/Maps/MapHoverCard.tsx";
import {setMvpMaps as setMvpMapsAction} from "@store/Slice/Mvp/Slice.ts";
import {useAppDispatch} from "@store/Hooks.ts";
import {useCallback} from "react";
import {DateTime} from "luxon";
import { useAppSelector } from "@store/Hooks.ts";
import { supabase } from "@/supabase/supabase";
import { notifications } from "@mantine/notifications";


export const MvpMapCardList = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {

    const [mvpMaps, setMvpMaps] = useState<MvpMap[]>(mvp.mvpMaps)

    const userSession = useAppSelector(state => state.userSlice.userSession)
    const partyId = useAppSelector(state => state.userSlice.partyId)
    const dispatch = useAppDispatch()


    const handleResetDeathTime = useCallback((mapName: string) => {
        const newMapsData = mvpMaps.map(mvpmap => mvpmap.name === mapName ? {...mvpmap, deathTime: 0} : mvpmap)
        dispatch(setMvpMapsAction({ mvp, newMapsData }))

        if (userSession && partyId) {
            mvpMaps.forEach(async (map) => {

                if (map.name !== mapName) {
                    return;
                }

                let { data: maps_party, error: errorSelect } = await supabase
                    .from('maps_party')
                    .select("*")
                    .eq('map_name', map.name)
                    .eq('mvp_id', mvp.Id)
                    .eq('party_id', partyId)

                if (errorSelect) {
                    notifications.show({
                        title: 'Error',
                        message: errorSelect.message,
                        autoClose: 5000,
                        color: 'red',
                        radius: "md",
                        withBorder: false,
                        style: {
                            backgroundColor: '#FFF1F0',
                            color: '#CF1322',
                            border: '1px solid #FFF1F0',
                        }
                    })
                    return;
                }

                if (maps_party && maps_party.length > 0) {
                    const { error: errorUpdate } = await supabase.from('maps_party')
                        .delete()
                        .eq('id', maps_party[0].id)
                        .eq('party_id', partyId)
                        .eq('map_name', map.name)
                        .eq('mvp_id', mvp.Id)

                    if (errorUpdate) {
                        notifications.show({
                            title: 'Error',
                            message: errorUpdate.message,
                            autoClose: 5000,
                            color: 'red',
                            radius: "md",
                            withBorder: false,
                            style: {
                                backgroundColor: '#FFF1F0',
                                color: '#CF1322',
                                border: '1px solid #FFF1F0',
                            }
                        })
                    }
                }
            })
        }

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
                    mapName={mvpmap.name}
                    respawn={DateTime.fromMillis(mvpmap.deathTime)}
                    handleResetDeathTime={handleResetDeathTime}
                />}
            </div>
        )
    })
}