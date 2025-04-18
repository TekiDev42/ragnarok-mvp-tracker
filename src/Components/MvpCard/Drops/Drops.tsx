import { Divider, ScrollArea } from "@mantine/core";
import { FC } from "react";

interface DropsProps {
  label: string
  drops: Drop[]
  rates: number
  cardRates: number
}

/**
 * Drops component displays a list of items and their drop rates
 * @example
 * <Drops label="MVP Drops" drops={mvpDrops} />
 */
export const Drops: FC<DropsProps> = ({ drops, label, rates, cardRates }) => (
    <div className="w-1/2 flex flex-col gap-2">
        <Divider my="xs" label={label} labelPosition="center" />

        <ScrollArea h={180} type="always" className={"px-3"}>
            <ul className="w-full pt-0 px-3">
                {drops.map(({ Item, Rate }, index) => {

                let itemRate = Rate * rates

                if (Item.includes('Card')){
                    itemRate = Rate * cardRates
                }

                return (
                    <li
                        key={`${Item}-${index}`}
                        className="flex justify-between w-full p-1"
                        >
                        <div>{Item.replace(/_/g, ' ')}</div>
                        <div>{((itemRate / 100) > 100 ? 100.0 : (itemRate / 100).toFixed(2))}%</div>
                    </li> 
                )
            })}
            </ul>
        </ScrollArea>
    </div>
);