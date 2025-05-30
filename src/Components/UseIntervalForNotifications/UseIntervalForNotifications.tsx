import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/Hooks"
import { DateTime } from "luxon"
import { v4 as uuidv4 } from 'uuid';
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { addNotification } from "@store/Slice/User/UserSlice.ts";
import { useState } from "react";
import { reSortMvp, setMvpFocus, setMvpMaps as setMvpMapsAction } from "@store/Slice/Mvp/Slice.ts";
import { supabase } from '@/supabase/supabase'


export const UseIntervalForNotifications = () => {

    const dispatch = useAppDispatch()

    const delayNotification = useAppSelector(state => state.userSlice.delayNotification)
    const soundNotification = useAppSelector(state => state.userSlice.soundNotification)
    const notificationVolume = useAppSelector(state => state.userSlice.notificationVolume)

    const session = useAppSelector(state => state.userSlice.userSession)
    const partyId = useAppSelector(state => state.partySlice.partyId)

    const mvps = useAppSelector(state => state.Slice.mvps)

    const [audio] = useState<HTMLAudioElement>(new Audio('sounds/sign_right.wav'))

    useEffect(() => {
        const interval = setInterval(async () => {
            let updated = false

            mvps.forEach(mvp => {
                mvp.mvpMaps.forEach(async map => {

                    if (map.deathTime <= 0) {
                        return
                    }
                    
                    const deathTime = DateTime.fromMillis(map.deathTime)
                    const diffNow = deathTime.diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])

                    if (diffNow.as('seconds') <= 0) {
                        dispatch(addNotification({
                            id: uuidv4(),
                            mvpName: mvp.Name,
                            mvpId: mvp.Id,
                            mapName: map.name,
                            respawn: map.deathTime,
                        }));
    
                        notifications.show({
                            title: <div className="text-gray-500 text-xs italic">Respawn : {deathTime.toFormat("dd/MM/yyyy HH'h'mm")}</div>,
                            message: <Flex direction="column" gap={0}>
                                <div className="text-gray-800 text-xs font-bold hover:text-yellow-500">
                                    <div className="ro-cursor" onClick={() => {
                                        dispatch(setMvpFocus(mvp.Id))
                                    }}>MVP : {mvp.Name}</div>
                                </div>
                                <div className="text-gray-800 text-xs font-bold flex gap-1 items-center">
                                    <span>Map : {map.name}</span>
                                    <span className="text-xs">({map.displayName})</span>
                                </div>
                            </Flex>,
                            autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                            color: 'yellow',
                            radius: "sm",
                            withBorder: false,
                            style: {
                                backgroundColor: 'white',
                            },
                        })
    
                        if (soundNotification) {
                            audio.volume = notificationVolume / 100;
                            audio.play();
                        }

                        const newMapsData = mvp.mvpMaps.map(mvpmap => mvpmap.name === map.name ? {...mvpmap, deathTime: 0} : mvpmap)
                        dispatch(setMvpMapsAction({ mvp, newMapsData }))
                        updated = true

                        if (session && partyId){
                            let { data, error: errorSelect } = await supabase
                            .from('maps_party')
                            .select("*")
                            .eq('map_name', map.name)
                            .eq('mvp_id', mvp.Id)
                            .eq('party_id', partyId)

                            if (errorSelect) {
                                notifications.show({
                                    title: 'Error fetching',
                                    message: errorSelect.message,
                                    autoClose: 5000,
                                    color: 'red',
                                    radius: "sm",
                                    withBorder: false,
                                    style: {
                                        backgroundColor: '#FFF1F0',
                                        color: '#CF1322',
                                        border: '1px solid #FFF1F0',
                                    }
                                })

                                return
                            }

                            if (!data || data.length === 0) {
                                return
                            }

                            const { error: errorUpdate } = await supabase.from('maps_party')
                                .delete()
                                .eq('id', data[0].id)
                                .eq('party_id', partyId)
                                .eq('map_name', map.name)
                                .eq('mvp_id', mvp.Id)

                            if (errorUpdate) {
                                notifications.show({
                                    title: 'Error updating',
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
                    }
                })
            })

            if (updated) {
                dispatch(reSortMvp());
                updated = false
            }

        }, 1000)

        return () => clearInterval(interval)
    }, [mvps])

    return null
}
