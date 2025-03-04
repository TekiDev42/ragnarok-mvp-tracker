import style from './Navbar.module.css'
import {ActionSearch} from "@components/Settings/Actions/ActionSearch.tsx"
import {Settings} from "@components/Settings/Settings.tsx"
import mvpFlag from '@assets/mvp-flag.png'
import {NotificationList} from "@components/NotificationList/NotificationList.tsx"

export const Navbar = () => {

    return (
        <div className={`${style.Navbar} glass`}>
            <div className={"flex items-center w-1/3 -ml-8 -my-5 gap-5"}>
                <figure className={"overflow-visible w-fit"}>
                    <img className={style.mvpImage}
                         src={mvpFlag}
                         alt="MVP FLag"/>
                </figure>
            </div>

            <div className={style.containerSearch}>
                <ActionSearch />
            </div>

            <div className={style.TimerContainer}>
                <NotificationList/>
                <Settings />
            </div>
        </div>
    )
}