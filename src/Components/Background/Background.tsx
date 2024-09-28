import { useAppSelector } from "@store/Hooks";

/**
 * Background component
 * 
 * This component renders a full-screen background image.
 * The image source is retrieved from the Redux store using the useAppSelector hook.
 * 
 * @returns {JSX.Element} A div containing a full-screen background image
 */
export const Background = () => {
    // Retrieve the background image source from the Redux store
    const background = useAppSelector(state => state.userSlice.background);

    return (
        <div className="fixed inset-0 -z-[1]">
            <img 
                className="object-cover h-full w-full" 
                src={background} 
                alt="background"
            />
        </div>
    );
};