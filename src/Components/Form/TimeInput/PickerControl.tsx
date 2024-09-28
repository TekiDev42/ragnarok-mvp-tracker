import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { RefObject } from "react";

/**
 * PickerControl component
 * 
 * This component creates an ActionIcon that, when clicked, shows the time picker for the associated input element.
 * 
 * @param {RefObject<HTMLInputElement>} ref - A reference to the input element for which the picker should be shown.
 * @returns {JSX.Element} An ActionIcon component with a clock icon.
 * 
 * @example
 * // Usage within a parent component
 * import { useRef } from 'react';
 * import { PickerControl } from './PickerControl';
 * 
 * const ParentComponent = () => {
 *   const inputRef = useRef<HTMLInputElement>(null);
 * 
 *   return (
 *     <div>
 *       <input type="time" ref={inputRef} />
 *       <PickerControl ref={inputRef} />
 *     </div>
 *   );
 * };
 */
export const PickerControl = (ref: RefObject<HTMLInputElement>) => {
    return (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref.current?.showPicker()}
        >
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );
};