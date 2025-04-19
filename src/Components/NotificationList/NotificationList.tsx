import { IconBell, IconX } from "@tabler/icons-react"
import { ActionIcon, Drawer, Flex, Text, Button, Divider, Indicator } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts"
import { clearNotifications, removeNotification } from "@store/Slice/User/UserSlice.ts"
import { DateTime } from "luxon"
import { setMvpFocus } from "@store/Slice/Mvp/Slice.ts"


export const NotificationList = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const notifications = useAppSelector(state => state.userSlice.notifications)
    const dispatch = useAppDispatch()

    return (
        <>
            <Indicator position="top-end" size={18} offset={5} disabled={notifications.length === 0} label={notifications.length} color="red">
                <ActionIcon variant="gradient"
                            gradient={{from: 'green', to: 'teal', deg: 90}}
                            size="lg" radius="xl" aria-label="Notifications"
                            onClick={open}
                >
                    <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Indicator>

            <Drawer
                overlayProps={{ backgroundOpacity: 0.2, blur: 4 }}
                position={"right"}
                opened={opened}
                onClose={close}
                padding={30}
                title={"Notifications"}
            >
                <Flex direction={"column"} gap={20}>
                    {notifications.length === 0 && (
                        <Text>No notifications</Text>
                    )}

                    {notifications.length > 0 && (<Button variant="light" color="red" onClick={() => dispatch(clearNotifications())}>Clear all notifications</Button>)}

                    {notifications.map((notification) => {
                        let date = ""
                        if(typeof notification.respawn === 'number') {
                            date = DateTime.fromMillis(notification.respawn).toFormat("dd/MM/yyyy HH'h'mm'm'ss's'")
                        } else {
                            date = notification.respawn
                        }
                        
                        return (
                        <div key={notification.id}>
                            <Flex w={"100%"} align={"center"} justify={"space-between"}>
                                <Flex direction="column" gap={0}>
                                    <div className="text-gray-500 text-xs italic">Respawn : {date}</div>

                                    <Flex direction="column" gap={0}>
                                        <div className="text-gray-800 text-xs font-bold hover:text-yellow-500">
                                            <div className="ro-cursor" onClick={() => {
                                                dispatch(setMvpFocus(notification.mvpId))
                                                close()
                                            }}>MVP : {notification.mvpName}</div>
                                        </div>

                                        <div className="text-gray-800 text-xs font-bold flex gap-1 items-center">
                                            <span>Map : {notification.mapName}</span>
                                            <span className="text-xs">({notification.mapName})</span>
                                        </div>
                                    </Flex>
                                </Flex>

                                <ActionIcon variant="gradient"
                                            gradient={{from: 'red', to: 'orange', deg: 90}}
                                            size="xs" radius="xl" aria-label="Notifications"
                                            onClick={() => dispatch(removeNotification(notification))}
                                >
                                    <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Flex>

                            <Divider mt="md"/>
                        </div>
                    )})}
                </Flex>
            </Drawer>
        </>
    )
}