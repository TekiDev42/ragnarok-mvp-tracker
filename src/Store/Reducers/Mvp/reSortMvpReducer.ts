import { sortMvps } from "@utils/Sort/sortMvps.ts"
import { CaseReducer } from "@reduxjs/toolkit"
import { WritableDraft } from "immer"
import { DateTime } from "luxon"


export const reSortMvpReducer: CaseReducer<MvpState> = (state) => {
    const mvps = state.mvps.map(mvp => ({
        ...mvp,
        mvpMaps: mvp.mvpMaps.map(map => ({
            ...map,
            deathTime: map.deathTime > DateTime.now().toMillis() ? map.deathTime : 0
        }))
    }))

    state.filtered = sortMvps(mvps as Mvp[]) as WritableDraft<Mvp>[]
    state.mvps = sortMvps(mvps as Mvp[]) as WritableDraft<Mvp>[]
}