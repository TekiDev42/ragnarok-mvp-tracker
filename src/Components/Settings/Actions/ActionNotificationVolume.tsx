import {Slider, Stack, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {useCallback, useEffect, useState} from "react";
import {setNotificationVolume} from "@store/Slice/User/UserSlice.ts";


export const ActionNotificationVolume = () => {
    const dispatch = useAppDispatch()
    const notificationVolume = useAppSelector(state => state.userSlice.notificationVolume)
    const [value, setValue] = useState(notificationVolume)

    const timerHandleChange = useCallback((value: number) => {
        if(value < 0) value = 0
        if(value > 100) value = 100

        dispatch(setNotificationVolume(value))
    },[dispatch])

    const marks = Array.from({length: 11}).map((_, i) => {
        return {
            value: i * 10,
            label: i * 10
        }
    })

    useEffect(() => {
        setValue(notificationVolume)
    }, [notificationVolume]);

    return (
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Notification volume</Text>
            <Slider onChangeEnd={timerHandleChange}
                    onChange={(e) => setValue(e)}
                    value={value}
                    label={(val) => {
                        return `${val}%`
                    }}
                    size={"lg"}
                    min={0}
                    max={100}
                    step={1}
                    marks={marks}
            />
            <Text fs={"italic"} size="xs" c={"#495057"} style={{paddingTop: 15}}>
                Set a volume to notification (0: No sound)
            </Text>
        </Stack>
    )
}