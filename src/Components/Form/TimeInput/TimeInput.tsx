import { PickerControl } from "@components/Form/TimeInput/PickerControl.tsx";
import { TimeInput } from "@mantine/dates";
import { PropsWithChildren, useRef } from "react";
import { setInstantDeath } from "@components/Form/TimeInput/setInstantDeath.tsx";

/**
 * Props for the TimeInputWithIcon component.
 * @interface TimeInputWithIconProps
 * @extends {PropsWithChildren}
 */
interface TimeInputWithIconProps extends PropsWithChildren {
    /** Array of MvpMap objects containing map data */
    mapsData: MvpMap[]
    /** Name of the current MVP map */
    mvpMap: string
    /** Function to update map data */
    updateMapData: (mapName: string, type: "time" | "x" | "y", value: string | number) => void
}

/**
 * A custom TimeInput component with additional icons and functionality.
 * 
 * @component
 * @example
 * const mapsData = [{ name: 'Map1', time: '12:00' }, { name: 'Map2', time: '14:30' }];
 * const mvpMap = 'Map1';
 * const updateMapData = (mapName, type, value) => {
 *   // Update logic here
 * };
 * 
 * return (
 *   <TimeInputWithIcon
 *     mapsData={mapsData}
 *     mvpMap={mvpMap}
 *     updateMapData={updateMapData}
 *   />
 * );
 */
export const TimeInputWithIcon = ({ mapsData, mvpMap, updateMapData }: TimeInputWithIconProps) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <TimeInput
            radius="xl"
            ref={ref}
            onChange={(event) => {
                if (typeof event.target.value === 'string' && event.target.value !== '') {
                    updateMapData(mvpMap, 'time', event.target.value);
                }
            }}
            rightSection={PickerControl(ref)}
            leftSection={setInstantDeath(ref, { mapsData, mvpMap, updateMapData })}
            style={{flex: 1, width: '250px'}}
        />
    )
}