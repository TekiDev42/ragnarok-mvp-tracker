import style from './Navbar.module.css'
import {ActionSearch} from "@components/Settings/Actions/ActionSearch.tsx"
import {Settings} from "@components/Settings/Settings.tsx"
import mvpFlag from '@assets/mvp-flag.png'
import {NotificationList} from "@components/NotificationList/NotificationList.tsx"
import { SignInModal } from "@components/Form/SignInModal.tsx"
import { useAppSelector } from "@store/Hooks"
import { JoinPartyDropdown } from "@components/JoinPartyDropdown/JoinPartyDropdown.tsx"


export const Navbar = () => {
    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const partyId = useAppSelector((state) => state.partySlice.partyId)
    const partyName = useAppSelector((state) => state.partySlice.partyName)

    return (
        <div className={`${style.Navbar} glass`}>
            <div className={"flex items-center w-1/3 -ml-8 -my-5 gap-5"}>
                <figure className={"overflow-visible w-fit"}>
                    <img className={style.mvpImage}
                         src={mvpFlag}
                         alt="MVP FLag"/>
                </figure>
            </div>

            <div className={style.container_search}>
                <ActionSearch />
            </div>

            <div className={style.timer_container}>

                {userSession && partyId && <div className={"text-white text-sm"}>Party: {partyName}</div>}
                {!userSession && <SignInModal />}
                {userSession && !partyId && <JoinPartyDropdown />}

                <NotificationList/>
                <Settings />
            </div>
        </div>
    )
}