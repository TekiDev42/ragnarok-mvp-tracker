import { Divider } from "@mantine/core";
import { FC } from "react";

/**
 * Props for the Drops component
 * @interface DropsProps
 * @property {string} label - The label for the drops section
 * @property {Drop[]} drops - An array of Drop objects to be displayed
 */
interface DropsProps {
  label: string;
  drops: Drop[];
}

/**
 * Drops component displays a list of items and their drop rates
 *
 * @component
 * @param {DropsProps} props - The props for the Drops component
 * @returns {JSX.Element} A fragment containing a divider and a list of drops
 *
 * @example
 * <Drops label="MVP Drops" drops={mvpDrops} />
 */
export const Drops: FC<DropsProps> = ({ drops, label }) => (
  <>
    <Divider my="xs" label={label} labelPosition="center" />
    {drops.map(({ Item, Rate }, index) => (
      <li
        key={`${Item}-${index}`}
        className="flex justify-between w-full p-1"
      >
        <div>{Item.replace(/_/g, ' ')}</div>
        <div>{(Rate / 100).toFixed(2)}%</div>
      </li>
    ))}
  </>
);