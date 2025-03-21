import { useAppSelector, useAppDispatch } from "@store/Hooks"
import { useEffect } from "react"
import { supabase } from "@/supabase/supabase"
import { setMvpsFromDb } from "@store/Slice/Mvp/Slice.ts";
import { notifications } from "@mantine/notifications";
import { Flex } from "@mantine/core";
import { DateTime } from "luxon";
import { Badge } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";


export const UseSubscriptionsSupabase = () => {
    const dispatch = useAppDispatch()

    const partyId = useAppSelector((state) => state.partySlice.partyId)
    const mvps = useAppSelector((state) => state.Slice.mvps)
    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification);


    const handleChanges = async (payload: any) => {

        if (payload.new.party_id !== partyId) { 
            return
        }

        if (payload.new.last_user_update === userSession?.user.id) {
            return
        }

        if (payload.event === 'DELETE') {
            return
        }

        const mvpIndex = mvps.findIndex((mvp) => mvp.Id === payload.new.mvp_id)

        if (mvpIndex !== -1) {

            let pseudo = null
            let color = 'blue'
    
            let { data: user_profile, error } = await supabase
                    .from('user_profile')
                    .select('pseudo, color')
                    .eq('user_id', payload.new.last_user_update)

            if (error) {
                notifications.show({
                    title: 'Error get user',
                    message: error.message,
                    autoClose: 10000,
                    color: 'red',
                    radius: "sm",
                    withBorder: false,
                    style: {
                        backgroundColor: '#FFF1F0',
                        color: '#CF1322',
                        border: '1px solid #FFF1F0',
                    }
                })
            }

            if (user_profile) {
                pseudo = user_profile[0].pseudo
                color = user_profile[0].color || 'blue'
            }

            if (!pseudo) {
                pseudo = 'Unknown'
            }

            notifications.show({
                title: <div className="flex gap-1 items-center text-gray-500 text-xs italic"><span>Updated by</span>
                            <Badge leftSection={<IconUserCircle size={16} />} autoContrast size="sm" color={color}>
                                {pseudo}
                            </Badge>
                        </div>,
                message: <Flex direction="column" gap={0}>
                    <div className="text-gray-500 text-xs italic">Respawn : {DateTime.fromMillis(payload.new.death_time).toFormat("dd/MM/yyyy HH'h'mm")}</div>
                    <div className="text-gray-800 text-xs font-bold hover:text-blue-500">
                        <a href={`#mvp-${payload.new.mvp_id}`}>MVP : {mvps[mvpIndex].Name}</a>
                    </div>
                    <div className="text-gray-800 text-xs font-bold flex gap-1 items-center">
                        <span>Map : {payload.new.map_name}</span>
                    </div>
                </Flex>,
                autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                color: color,
                radius: "sm",
                withBorder: false,
                style: {
                    backgroundColor: 'white',
                }
            })

            dispatch(setMvpsFromDb([
                {
                    map_name: payload.new.map_name,
                    mvp_id: payload.new.mvp_id,
                    party_id: payload.new.party_id,
                    tomb_pos_x: payload.new.tomb_pos_x,
                    tomb_pos_y: payload.new.tomb_pos_y, 
                    death_time: payload.new.death_time,
                    last_user_update: payload.new.last_user_update
                }
            ]))
        }
    }

    const fetchMapsParty = async (partyId: number, abortController: AbortController) => {

        if (!partyId) {
            return
        }

        const { data: maps_party, error } = await supabase
            .from('maps_party')
            .select('*')
            .eq('party_id', partyId)
            .abortSignal(abortController.signal)

        if (error) {
            notifications.show({
                title: 'Error fetching',
                message: error.message,
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
        }

        if (maps_party) {
            dispatch(setMvpsFromDb(maps_party))
        }

        return 
    }

    useEffect(() => {
        const abortController = new AbortController()
        let mapsParty = null

        if (partyId) {
            mapsParty = supabase.channel('schema-db-changes')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'maps_party', filter: `party_id=eq.${partyId}` },
                    handleChanges
                )
                .subscribe()

            fetchMapsParty(partyId, abortController)
        }

        return () => {
            if (mapsParty) mapsParty.unsubscribe()

            abortController.abort()
        }

    }, [partyId])

    return null
}
