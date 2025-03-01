import { useAppSelector } from "@store/Hooks";


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