import {Divider} from "@mantine/core";
import {PropsWithChildren} from "react";

export const Drops = ({drops, label}: PropsWithChildren & {label: string, drops: Drop[]}) => {

    return (
        <>
            <Divider my="xs" label={label} labelPosition="center"/>
            {drops.map((item, i) =>
                <li key={`drop-${i}`}
                    className={"flex justify-between w-full p-1"}
                >
                <div>{item.Item.replace(/_/g, ' ')}</div>
                <div>{item.Rate / 100}%</div>
            </li>)}
        </>
    )
}