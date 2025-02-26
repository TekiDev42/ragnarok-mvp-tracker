import './settings.css'
import {IconSettings} from "@tabler/icons-react";
import {ActionIcon, Divider, Drawer, Flex} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {ActionRespawnTimer} from "@components/Settings/Actions/ActionRespawnTimer";
import {ActionChangeBackground} from "@components/Settings/Actions/ActionChangeBackground";
import {ActionResetApp} from "@components/Settings/Actions/ActionResetApp";
import {ActionSwitchAnimation} from "@components/Settings/Actions/ActionSwitchAnimation";
import {ActionDelayNotification} from "@components/Settings/Actions/ActionDelayNotification";
import {ActionSwitchNotificationSound} from "@components/Settings/Actions/ActionSwitchNotificationSound";
import {ActionDropsRates} from "@components/Settings/Actions/ActionDropsRates";

export const Settings = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <ActionIcon variant="gradient"
                        gradient={{from: 'blue', to: 'indigo', deg: 90}}
                        size="lg" radius="xl" aria-label="Settings"
                        onClick={open}
            >
                <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>

            <Drawer
                overlayProps={{ backgroundOpacity: 0.2, blur: 4 }}
                position={"right"}
                opened={opened}
                onClose={close}
                padding={30}
                title={"Settings"}
            >
                <Flex direction={"column"} gap={30}>
                    <ActionSwitchAnimation />
                    <Divider/>

                    <ActionRespawnTimer />
                    <Divider/>

                    <ActionDelayNotification />
                    <ActionSwitchNotificationSound />
                    <Divider/>

                    <ActionDropsRates />
                    <Divider/>

                    <ActionChangeBackground />
                    <Divider/>

                    <ActionResetApp />
                </Flex>
            </Drawer>
        </>
    )
}