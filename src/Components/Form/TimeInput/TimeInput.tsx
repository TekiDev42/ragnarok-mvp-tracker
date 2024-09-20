import {PickerControl} from "@components/Form/TimeInput/PickerControl.tsx";
import {TimeInput} from "@mantine/dates";
import {PropsWithChildren, useRef} from "react";
import {setInstantDeath} from "@components/Form/TimeInput/setInstantDeath.tsx";

interface TimeInputWithIconProps extends PropsWithChildren {
    mapsData: MvpMap[]
    mvpMap: string
    updateMapData: (mapsData: MvpMap[], mapName: string, type: ("time" | "x" | "y"), value: (string | number)) => void
}

export const TimeInputWithIcon = ({mapsData, mvpMap, updateMapData}: TimeInputWithIconProps) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <TimeInput
               radius="xl" ref={ref}
               onChange={(e) => updateMapData(mapsData, mvpMap, 'time', e.target.value)}
               rightSection={PickerControl(ref)}
               leftSection={setInstantDeath(ref, {mapsData, mvpMap, updateMapData})}
        />
    )
}