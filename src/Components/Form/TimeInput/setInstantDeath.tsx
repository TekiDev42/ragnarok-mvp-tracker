import {DateTime} from "luxon";
import {IconGrave} from "@tabler/icons-react";
import {ActionIcon, rem} from "@mantine/core";
import {RefObject} from "react";

interface SetInstantDeathProps {
    mapsData: MvpMap[]
    mvpMap: string
    updateMapData: (mapsData: MvpMap[], mapName: string, type: ("time" | "x" | "y"), value: (string | number)) => void
}

export const setInstantDeath = (ref: RefObject<HTMLInputElement>, {mapsData, mvpMap, updateMapData}: SetInstantDeathProps) => {
    return (<ActionIcon variant="subtle" color="gray"
            onClick={() => {
                if(ref.current) {
                    const now = DateTime.now().toFormat("T")
                    ref.current.value = now
                    updateMapData(mapsData, mvpMap, 'time', now)
                }
            }}
    >
        <IconGrave style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
    </ActionIcon>)
}