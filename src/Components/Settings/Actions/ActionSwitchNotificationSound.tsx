import {rem, Switch, useMantineTheme} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {setSoundNotification} from "@store/Slice/User/UserSlice.ts";
import {IconCheck, IconX} from "@tabler/icons-react";

export const ActionSwitchNotificationSound = () => {
    const theme = useMantineTheme();
    const dispatch = useAppDispatch()
    const soundNotification = useAppSelector(state => state.userSlice.soundNotification)

    return (
        <Switch
            checked={soundNotification}
            onChange={(event) => dispatch(setSoundNotification(event.currentTarget.checked))}
            color="teal"
            size="md"
            label="Sound notification"
            thumbIcon={
                soundNotification ? (
                    <IconCheck
                        style={{ width: rem(12), height: rem(12) }}
                        color={theme.colors.teal[6]}
                        stroke={3}
                    />
                ) : (
                    <IconX
                        style={{ width: rem(12), height: rem(12) }}
                        color={theme.colors.red[6]}
                        stroke={3}
                    />
                )
            }
        />
    )
}