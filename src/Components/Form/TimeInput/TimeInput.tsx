import { PickerControl } from "@components/Form/TimeInput/PickerControl.tsx";
import { TimeInput } from "@mantine/dates";
import { PropsWithChildren, useRef } from "react";
import { setInstantDeath } from "@components/Form/TimeInput/setInstantDeath.tsx";

interface TimeInputWithIconProps extends PropsWithChildren {
    mapsData: MvpMap[]
    mvpMap: string
    updateMapData: (mapName: string, type: "time" | "x" | "y", value: string | number) => void
}

export const TimeInputWithIcon = ({ mapsData, mvpMap, updateMapData }: TimeInputWithIconProps) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <TimeInput
            radius="xl"
            ref={ref}
            onChange={(value) => {
                if (typeof value === 'string') {
                    updateMapData(mvpMap, 'time', value);
                }
            }}
            rightSection={<PickerControl inputRef={ref} />}
            leftSection={setInstantDeath(ref, { mapsData, mvpMap, updateMapData })}
        />
    )
}