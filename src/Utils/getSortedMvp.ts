import {sortMvps} from "@utils/Sort/sortMvps.ts";

export const getSortedMvp = async (): Promise<Mvp[]> => {
    return sortMvps((await window.mvpApi.getMvps()))
}