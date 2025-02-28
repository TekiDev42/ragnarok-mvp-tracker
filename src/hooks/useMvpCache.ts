import { useAppDispatch, useAppSelector } from '@store/Hooks'
import { setMvps } from '@store/Slice/Mvp/Slice'
import { getSortedMvp } from '@/Utils/getSortedMvp'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useMvpCache = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector((state) => state.Slice.filtered)

    const fetchAndCacheMvps = async () => {
        try {
            // Vérifier le cache local
            const cachedData = localStorage.getItem('mvpCache')
            const cachedTime = localStorage.getItem('mvpCacheTime')

            if (cachedData && cachedTime) {
                const isExpired = Date.now() - Number(cachedTime) > CACHE_DURATION

                if (!isExpired) {
                    dispatch(setMvps(JSON.parse(cachedData)))
                    return
                }
            }

            // Si pas de cache ou expiré, fetch new data
            const mvps = await getSortedMvp()
            dispatch(setMvps(mvps))

            // Mettre à jour le cache
            localStorage.setItem('mvpCache', JSON.stringify(mvps))
            localStorage.setItem('mvpCacheTime', Date.now().toString())
        } catch (error) {
            console.error('Error fetching MVPs:', error)
        }
    }

    return { mvps, fetchAndCacheMvps }
} 