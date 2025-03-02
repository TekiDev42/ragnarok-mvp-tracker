import { useState } from "react";
import { Chip } from "@mantine/core";


interface MapChipProps {
    mapName: string;
    defaultChecked: boolean;
    onChange: (mapName: string, checked: boolean) => void;
}


export const MapChip = ({ mapName, defaultChecked, onChange }: MapChipProps) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleClick = () => {
        setChecked(!checked);
        onChange(mapName, checked);
    }

    return (
        <Chip checked={checked} onClick={handleClick} variant="light">
            {mapName}
        </Chip>
    )
}
