import {ConnectionColors} from "@constants/defaults.ts";

export const getConnectionColor = (status: boolean): ConnectionColors => {
    return status ? ConnectionColors.green : ConnectionColors.red
}