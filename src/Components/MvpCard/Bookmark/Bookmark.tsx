import {BookmarkIcon} from "@components/Icons/Icons.tsx";
import {useAppDispatch} from "@store/Hooks.ts";
import {setMvpBookmarkStatus} from "@store/Slice/Mvp/Slice.ts";
import {PropsWithChildren} from "react";

export const Bookmark = ({mvp}: PropsWithChildren & {mvp: Mvp}) => {
    const dispatch = useAppDispatch()

    const handleBookmarkClick = (): void => {
        dispatch(setMvpBookmarkStatus({
            mvp: mvp,
            bookmark: !mvp.isBookmark
        }))
    }

    return (
        <div onClick={handleBookmarkClick}
             className={`bookmark absolute top-2 right-2 
                            ${mvp.isBookmark ? "text-yellow-500" : "text-white"} 
                            cursor-pointer p-1`}>
            <BookmarkIcon checked={mvp.isBookmark}/>
        </div>
    )
}