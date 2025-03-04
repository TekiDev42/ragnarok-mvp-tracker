import {IconBell, IconX} from "@tabler/icons-react";
import {ActionIcon, Drawer, Flex, Text, Button, Divider} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { clearNotifications, removeNotification } from "@store/Slice/User/UserSlice.ts";
import { DateTime } from "luxon";

export const NotificationList = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const notifications = useAppSelector(state => state.userSlice.notifications);
    const dispatch = useAppDispatch();
    return (
        <>
            <ActionIcon variant="gradient"
                        gradient={{from: 'green', to: 'teal', deg: 90}}
                        size="lg" radius="xl" aria-label="Notifications"
                        onClick={open}
            >
                <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>

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

                    {notifications.map((notification, index) => {
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
                                    <div className="text-gray-500 text-sm italic">{date}</div>

                                    <Flex direction="column" gap={0}>
                                        <div className="text-gray-800 text-md font-bold">MVP : {notification.mvpName}</div>
                                        <div className="text-gray-800 text-md font-bold">Map : {notification.mapName}</div>
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