import { useAppSelector, useAppDispatch } from "@store/Hooks"
import { useEffect } from "react"
import { supabase } from "@/supabase/supabase"
import { setMvpMaps } from "@store/Slice/Mvp/Slice.ts";
import { notifications } from "@mantine/notifications";


export const useSubscriptionsSupabase = () => {
    const dispatch = useAppDispatch()

    const partyId = useAppSelector((state) => state.userSlice.partyId)
    const mvps = useAppSelector((state) => state.Slice.mvps)
    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification);


    const handleChanges = (payload: any) => {
        console.log('Change received!', payload)

        if (payload.new.party_id !== partyId) { 
            console.log('Party ID does not match, skipping')
            return
        }

        if (payload.new.last_user_update === userSession?.user.id) {
            console.log('User is the same, skipping')
            return
        }

        const mvp = mvps.find((mvp) => mvp.Id === payload.new.mvp_id)

        if (mvp) {

            notifications.show({
                title: 'MVP Map Updated',
                message: `The MVP ${mvp.Name} has been updated`,
                autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                color: 'green',
                radius: "md",
                withBorder: false,
                style: {
                    backgroundColor: '#F0FFF0',
                    color: '#008000',
                    border: '1px solid #F0FFF0',
                }
            })

            const newMvpMaps = mvp.mvpMaps.map((map) => {
                if (map.name === payload.new.map_name) {
                    return {
                        ...map,
                        deathTime: payload.new.death_time,
                        tombPos: {
                            x: payload.new.tomb_pos_x,
                            y: payload.new.tomb_pos_y
                        }
                    }
                }

                return map
            })

            dispatch(setMvpMaps({ mvp, newMapsData: newMvpMaps }))
        }
    }

    useEffect(() => {
        let mapsParty = null
        if (partyId) {
            mapsParty = supabase.channel('schema-db-changes')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'maps_party', filter: `party_id=eq.${partyId}` },
                    handleChanges
                )
                .subscribe()
        }

        return () => {
            if (mapsParty) {
                mapsParty.unsubscribe()
            }
        }
    }, [partyId])
}
