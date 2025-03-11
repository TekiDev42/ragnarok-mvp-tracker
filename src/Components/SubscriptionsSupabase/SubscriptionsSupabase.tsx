import { useAppSelector } from "@store/Hooks"
import { useEffect } from "react"
import { supabase } from "@/supabase/supabase"


export const SubscriptionsSupabase = () => {
    const partyId = useAppSelector((state) => state.userSlice.partyId)
    const handleChanges = (payload: any) => {
        console.log('Change received!', payload)
    }

    useEffect(() => {
        let mapsParty = null
        if (partyId) {
            mapsParty = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'maps_party' },
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

    return null
}
