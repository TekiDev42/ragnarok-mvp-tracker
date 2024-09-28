import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { DateTime, Duration } from "luxon";
import { Badge, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { reSortMvp } from "@store/Slice/Mvp/Slice.ts";

type CountdownProps =  PropsWithChildren & {
    respawn: DateTime;
    mapName: string;
    mvpName: string;
}
/**
 * Countdown component for MVP respawn timer
 * 
 * This component displays a countdown timer for MVP (Most Valuable Player) respawns in a game.
 * It shows the remaining time until the MVP respawns and triggers notifications when the time is up.
 * 
 * @component
 * @param {Object} props - The properties passed to the component
 * @param {DateTime} props.respawn - The DateTime object representing when the MVP will respawn
 * @param {string} props.mapName - The name of the map where the MVP will respawn
 * @param {string} props.mvpName - The name of the MVP
 * 
 * @returns {JSX.Element} A component that displays the countdown timer and handles notifications
 * 
 * The component uses the following hooks and features:
 * - useState: To manage the countdown state
 * - useEffect: To set up and clean up the countdown interval and audio
 * - useCallback: To memoize the updateDiff function
 * - useAppSelector: To access user preferences from the Redux store
 * - useAppDispatch: To dispatch actions to the Redux store
 * - notifications: To show notifications when the MVP respawns
 * - Audio API: To play a sound when the MVP respawns (if enabled in user preferences)
 */

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
            {Math.max(0, Math.floor(diff.as('minutes') % 60))}m
            {Math.max(0, Math.floor(diff.as('seconds') % 60))}s
        </Text>
    );
};