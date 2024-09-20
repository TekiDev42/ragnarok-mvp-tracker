import {rem, Switch, useMantineTheme} from "@mantine/core";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {setAnimation} from "@store/Slice/User/UserSlice.ts";

export const ActionSwitchAnimation = () => {
    const theme = useMantineTheme();
    const dispatch = useAppDispatch()
    const animation = useAppSelector(state => state.userSlice.animation)

    return (
        <Switch
            checked={animation}
            onChange={(event) => dispatch(setAnimation(event.currentTarget.checked))}
            color="teal"
            size="md"
            label="Animation mvp"
            thumbIcon={
                animation ? (
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