import {Slider, Stack, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {useCallback, useEffect, useState} from "react";
import {setDelayNotification} from "@store/Slice/User/UserSlice.ts";


export const ActionDelayNotification = () => {
    const dispatch = useAppDispatch()
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification)
    const [value, setValue] = useState(delayNotification)

    const timerHandleChange = useCallback((value: number) => {
        if(value < 0) value = 0

        dispatch(setDelayNotification(value))
    },[dispatch])

    const marks = Array.from({length: 7}).map((_, i) => {
        return {
            value: i * 10,
            label: i * 10
        }
    })

    useEffect(() => {
        setValue(delayNotification)
    }, [delayNotification]);

    return (
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Notification delay</Text>
            <Slider onChangeEnd={timerHandleChange}
                    onChange={(e) => setValue(e)}
                    value={value}
                    label={(val) => {
                        return `${val} seconds`
                    }}
                    size={"lg"}
                    min={0}
                    max={60}
                    step={1}
                    marks={marks}
            />
            <Text fs={"italic"} size="xs" c={"#495057"} style={{paddingTop: 15}}>
                Set a delay to close automatically notification (0: No automatically close)
            </Text>
        </Stack>
    )
}