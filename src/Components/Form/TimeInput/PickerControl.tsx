
import {ActionIcon, rem} from "@mantine/core";
import {IconClock} from "@tabler/icons-react";
import {RefObject} from "react";

export const PickerControl = (ref:RefObject<HTMLInputElement>) => {
    return <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
        <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
    </ActionIcon>
}