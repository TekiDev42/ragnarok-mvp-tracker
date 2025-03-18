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
                    console.error('Error selecting map party:', errorSelect)
                    return;
                }

                if (maps_party && maps_party.length > 0) {
                    console.log('Map party already exists:', maps_party)

                    const { data: maps_party_update, error: errorUpdate } = await supabase.from('maps_party')
                    .update({
                        tomb_pos_x: 0,
                        tomb_pos_y: 0,
                        death_time: 0,
                        last_user_update: userSession.user.id,
                    })
                    .eq('id', maps_party[0].id)
                    .eq('party_id', partyId)
                    .eq('map_name', map.name)
                    .eq('mvp_id', mvp.Id)
                    .select()

                    if (errorUpdate) {
                        console.error('Error updating map party:', errorUpdate)
                    } else {
                        console.log('Map party updated:', maps_party_update)
                    }
                    return;
                }

                const { data, error: errorInsert } = await supabase.from('maps_party')
                .insert({
                    party_id: partyId,
                    last_user_update: userSession.user.id,
                    map_name: map.name,
                    mvp_id: mvp.Id,
                    tomb_pos_x: 0,
                    tomb_pos_y: 0,
                    death_time: 0,
                })
                .select()
    
                if (errorInsert) {
                    console.error('Error inserting map party:', errorInsert)
                } else {
                    console.log('Map party inserted:', data)
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