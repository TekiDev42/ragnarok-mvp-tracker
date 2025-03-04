import {IconBell, IconX} from "@tabler/icons-react";
import {ActionIcon, Drawer, Flex, Text, Button} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { clearNotifications, removeNotification } from "@store/Slice/User/UserSlice.ts";

export const NotificationList = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const notifications = useAppSelector(state => state.userSlice.notifications);
    const dispatch = useAppDispatch();
    return (
        <>
            <ActionIcon variant="gradient"
                        gradient={{from: 'blue', to: 'indigo', deg: 90}}
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
                <Flex direction={"column"} gap={30}>
                    {notifications.length === 0 && (
                        <Text>No notifications</Text>
                    )}

                    {notifications.map((notification, index) => (
                        <Flex w={"100%"} key={`${notification.mvpName}-${index}`} justify={"space-between"}>
                            <Text>{notification.mvpName}</Text>
                            <Text>{notification.mapName}</Text>
                            <Text>{notification.respawn}</Text>
                            <ActionIcon variant="gradient"
                                        gradient={{from: 'red', to: 'orange', deg: 90}}
                                        size="xs" radius="xl" aria-label="Notifications"
                                        onClick={() => dispatch(removeNotification(notification))}
                            >
                                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Flex>
                    ))}
                </Flex>

                {notifications.length > 0 && (<Button onClick={() => dispatch(clearNotifications())}>Clear</Button>)}
            </Drawer>
        </>
    )
}