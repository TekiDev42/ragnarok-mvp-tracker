import { useAppSelector, useAppDispatch } from "@store/Hooks"
import { useEffect } from "react"
import { supabase } from "@/supabase/supabase"
import { setMvpsFromDb } from "@store/Slice/Mvp/Slice.ts";
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

        const mvpIndex = mvps.findIndex((mvp) => mvp.Id === payload.new.mvp_id)

        if (mvpIndex !== -1) {
            notifications.show({
                title: 'MVP Map Updated',
                message: `The MVP ${mvps[mvpIndex].Name} has been updated`,
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
            console.error('Error fetching maps_party', error)
        }

        if (maps_party) {
            dispatch(setMvpsFromDb({ maps_party }))
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
}
