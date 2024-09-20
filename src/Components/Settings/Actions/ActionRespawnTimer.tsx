import {Slider, Stack, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "@store/Hooks";
import {useCallback, useEffect, useState} from "react";
import {setRespawnTimer} from "@store/Slice/User/UserSlice.ts";

export const ActionRespawnTimer = () => {
    const dispatch = useAppDispatch()
    const respawnTimer = useAppSelector(state => state.userSlice.respawnTimer)
    const [value, setValue] = useState(respawnTimer)

    const timerHandleChange = useCallback((value: number) => {
        if(value < 0) value = 0

        dispatch(setRespawnTimer(value))
    },[dispatch])

    const marks = Array.from({length: 11}).map((_, i) => {
        return {
            value: i * 60,
            label: i * 60
        }
    })

    useEffect(() => {
        setValue(respawnTimer)
    }, [respawnTimer]);

    return (
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Respawn</Text>
            <Slider onChangeEnd={timerHandleChange}
                    onChange={(e) => setValue(e)}
                    value={value}
                    label={(val) => {
                        return `${val} minutes`
                    }}
                    size={"lg"}
                    min={0}
                    max={600}
                    step={5}
                    marks={marks}
            />
            <Text fs={"italic"} size="xs" c={"#495057"} style={{paddingTop: 15}}>
                Apply a global respawn timer for all mvps (0: Official)
            </Text>
        </Stack>
    )
}