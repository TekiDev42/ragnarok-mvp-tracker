/**
 * @file MvpCard.tsx
 * @description This file contains the MvpCard component, which displays information about an MVP (Most Valuable Player) in a card format.
 */

import style from './MvpCard.module.css'
import { HeadstoneIcon } from "@components/Icons/Icons.tsx";
import { ActionIcon } from "@mantine/core";
import { MvpMapCardList } from "@components/MvpCard/Maps/MvpMapCardList.tsx";
import { MvpImage } from "@components/MvpCard/Image/MvpImage.tsx";
import { DropsHoverCard } from "@components/MvpCard/Drops/DropsHoverCard.tsx";
import { Bookmark } from "@components/MvpCard/Bookmark/Bookmark.tsx";
import { setMvp, setOpened } from "@store/Slice/Modal/ModalSlice.ts";
import { useAppDispatch } from "@store/Hooks.ts";

/**
 * MvpCard component
 * 
 * This component displays information about an MVP in a card format, including an image, name, maps, and actions.
 * 
 * @param {Object} props - The component props
 * @param {Mvp} props.mvp - The MVP object containing information to display
 * 
 * @returns {JSX.Element} The rendered MvpCard component
 * 
 * @example
 * // Usage in a parent component
 * import { MvpCard } from './MvpCard';
 * 
 * const ParentComponent = () => {
 *   const mvpData = {
 *     Name: 'Baphomet',
 *     image: 'baphomet.png',
 *     // ... other MVP properties
 *   };
 * 
 *   return (
 *     <div>
 *       <MvpCard mvp={mvpData} />
 *     </div>
 *   );
 * };
 */
export const MvpCard = ({ mvp, preloadedImages }: { mvp: Mvp, preloadedImages: Map<string, HTMLImageElement> }) => {
    const dispatch = useAppDispatch();

    /**
     * Handles the click event on the death action button
     * Opens the MVP death modal
     */
    const handleClick = () => {
        dispatch(setMvp(mvp));
        dispatch(setOpened(true));
    };

    return (
        <div className={`${style.card} glass`}>
            <Bookmark mvp={mvp} />

            <div className={style.image_container}>
                <MvpImage image={mvp.image} name={mvp.Name} preloadedImages={preloadedImages} />
            </div>

            <div className={style.content}>
                <h2 className={style.name}>{mvp.Name}</h2>
                <MvpMapCardList mvp={mvp} />
            </div>

            <div className={style.actions}>
                <DropsHoverCard drops={mvp.Drops ?? []} mvpDrops={mvp.MvpDrops ?? []} />

                <ActionIcon
                    onClick={handleClick}
                    className="glass ro-cursor"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'violet', deg: 90 }}
                    color="#1e293b"
                    radius="xl"
                    aria-label="Action set death mvp"
                >
                    <HeadstoneIcon />
                </ActionIcon>
            </div>
        </div>
    );
};