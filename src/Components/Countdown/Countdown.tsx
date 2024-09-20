import { PropsWithChildren, useEffect, useState} from "react";
import {DateTime, Duration} from "luxon";
import {Badge, Text} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {reSortMvp} from "@store/Slice/Mvp/Slice.ts";

interface CountdownProps extends PropsWithChildren {
    respawn: DateTime
    mapName: string
    mvpName: string
}

export const Countdown = ({respawn, mapName, mvpName}: CountdownProps) => {
    const [diff, setDiff] = useState<Duration>(respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds']))
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification)
    const SoundNotification = useAppSelector(state => state.userSlice.soundNotification)

    const dispatch = useAppDispatch()

    const updateDiff = (diff: Duration): void => {
        setDiff(diff)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        let audio: HTMLAudioElement

        if(diff.hours+diff.minutes+diff.seconds > 0) {
            audio = new Audio('sounds/sign_right.wav')
            interval = setInterval(() => {
                const newDiff = respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
                updateDiff(newDiff)

                if (newDiff.toMillis() <= 0) {
                    notifications.show({
                        title: `${mvpName} respawn`,
                        message: `At map : ${mapName}`,
                        autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                        color: 'green',
                        radius: "lg",
                        withBorder: false
                    })

                    dispatch(reSortMvp())

                    if(SoundNotification)
                        audio.play().then(() => audio.remove())

                    clearInterval(interval)
                }
            }, 1_000)
        }

        return () => {
            audio?.remove()
            clearInterval(interval)
        }
    }, [respawn,diff]);

    useEffect(() => {
        setDiff(respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds']))
    }, [respawn]);

    return (
        <>
            {diff.toMillis() > 0 &&
                <Text>
                    {Math.round(diff.hours > 0 ? diff.hours : 0)}h
                    {Math.round(diff.minutes > 0 ? diff.minutes : 0)}m
                    {Math.round(diff.seconds > 0 ? diff.seconds : 0)}s
                </Text>
            }
            {diff.toMillis() <= 0 &&
                <Badge
                    size="xs"
                    variant="gradient"
                    gradient={{from: 'violet', to: 'blue', deg: 90}}
                >
                  ALIVE
                </Badge>
            }
        </>
    )
}