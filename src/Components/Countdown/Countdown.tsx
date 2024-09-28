import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { DateTime, Duration } from "luxon";
import { Badge, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { reSortMvp } from "@store/Slice/Mvp/Slice.ts";

interface CountdownProps extends PropsWithChildren {
    respawn: DateTime;
    mapName: string;
    mvpName: string;
}

export const Countdown = ({ respawn, mapName, mvpName }: CountdownProps) => {
    const [diff, setDiff] = useState<Duration>(() => 
        respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
    );
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification);
    const soundNotification = useAppSelector(state => state.userSlice.soundNotification);
    const dispatch = useAppDispatch();

    const updateDiff = useCallback(() => {
        setDiff(respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds']));
    }, [respawn]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let audio: HTMLAudioElement;

        if (diff.as('seconds') > 0) {
            audio = new Audio('sounds/sign_right.wav');
            interval = setInterval(() => {
                const newDiff = respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds']);
                setDiff(newDiff);

                if (newDiff.as('seconds') <= 0) {
                    notifications.show({
                        title: `${mvpName} respawn`,
                        message: `At map: ${mapName}`,
                        autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                        color: 'green',
                        radius: "lg",
                        withBorder: false
                    });

                    dispatch(reSortMvp());

                    if (soundNotification) {
                        audio.play().then(() => audio.remove());
                    }

                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => {
            audio?.remove();
            clearInterval(interval);
        };
    }, [respawn, diff, delayNotification, soundNotification, mvpName, mapName, dispatch]);

    useEffect(() => {
        updateDiff();
    }, [respawn, updateDiff]);

    if (diff.as('seconds') <= 0) {
        return (
            <Badge
                size="xs"
                variant="gradient"
                gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            >
                ALIVE
            </Badge>
        );
    }

    return (
        <Text>
            {Math.max(0, Math.round(diff.as('hours')))}h
            {Math.max(0, Math.round(diff.as('minutes') % 60))}m
            {Math.max(0, Math.round(diff.as('seconds') % 60))}s
        </Text>
    );
};