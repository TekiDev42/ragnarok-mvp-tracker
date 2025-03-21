import style from './Navbar.module.css'
import {ActionSearch} from "@components/Settings/Actions/ActionSearch.tsx"
import {Settings} from "@components/Settings/Settings.tsx"
import mvpFlag from '@assets/mvp-flag.png'
import {NotificationList} from "@components/NotificationList/NotificationList.tsx"
import { SignInModal } from "@components/Form/SignInModal.tsx"
import { useAppSelector } from "@store/Hooks"
import { JoinPartyDropdown } from "@components/JoinPartyDropdown/JoinPartyDropdown.tsx"
import { Badge, Button, Flex, HoverCard } from "@mantine/core"
import { IconUsers } from "@tabler/icons-react"


export const Navbar = () => {
    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const partyId = useAppSelector((state) => state.partySlice.partyId)
    const partyName = useAppSelector((state) => state.partySlice.partyName)
    const partyMembers = useAppSelector((state) => state.partySlice.partyMembers)
    const partyOwnerId = useAppSelector((state) => state.partySlice.partyOwnerId)

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

                {userSession && partyId && 
                    <HoverCard width={320} shadow="md" withArrow>
                        <HoverCard.Target>
                            <Button
                                size="sm"
                                variant="gradient"
                                gradient={{ from: 'violet', to: 'cyan', deg: 200 }}
                                leftSection={<IconUsers stroke={1.5} />}
                            >
                                {partyName}
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Flex direction="column" gap={10}>
                                <div>Members : {partyMembers.length}</div>

                                <Flex direction="column" gap={10}>
                                    {partyMembers.map((member: PartyMember) => (
                                        <Badge autoContrast key={member.id} variant="light" color={member.color ?? 'gray'} size="md">{member.pseudo} {partyOwnerId === member.user_id && '(Leader)'}</Badge>
                                    ))}
                                </Flex>
                            </Flex>
                        </HoverCard.Dropdown>
                    </HoverCard>
                }
                {!userSession && <SignInModal />}
                {userSession && !partyId && <JoinPartyDropdown />}

                <NotificationList/>
                <Settings />
            </div>
        </div>
    )
}