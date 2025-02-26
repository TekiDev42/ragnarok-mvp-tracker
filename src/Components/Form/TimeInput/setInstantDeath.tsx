import { DateTime } from "luxon";
import { IconGrave } from "@tabler/icons-react";
import { ActionIcon, rem } from "@mantine/core";
import { RefObject } from "react";

/**
 * Interface for the props of setInstantDeath function
 */
interface SetInstantDeathProps {
    /** Array of MvpMap objects */
    mapsData: MvpMap[]
    /** Name of the current MVP map */
    mvpMap: string
    /** Function to update map data */
    updateMapData: (mapName: string, type: "time" | "x" | "y", value: string | number) => void
}

/**
 * Creates an ActionIcon component that sets the current time as the death time for an MVP
 * 
 * @param ref - Reference to the input element
 * @param props - Object containing mvpMap and updateMapData
 * @returns ActionIcon component
 */
export const setInstantDeath = (ref: RefObject<HTMLInputElement>, { mvpMap, updateMapData }: SetInstantDeathProps) => {
    return (
        <ActionIcon
            variant="subtle"
            color="gray"
            radius="xl"
            onClick={() => {
                if (ref.current) {
                    const now = DateTime.now().toFormat("HH:mm")
                    ref.current.value = now
                    updateMapData(mvpMap, 'time', now)
                }
            }}
        >
            <IconGrave style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    )
}