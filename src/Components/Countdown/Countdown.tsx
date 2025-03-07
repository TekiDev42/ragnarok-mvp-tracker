import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { DateTime, Duration } from "luxon";
import { Badge, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { reSortMvp } from "@store/Slice/Mvp/Slice.ts";
import { Flex, CloseButton } from "@mantine/core";
import { addNotification } from "@store/Slice/User/UserSlice.ts";
import { v4 as uuidv4 } from 'uuid';

type CountdownProps =  PropsWithChildren & {
    respawn: DateTime;
    mapName: string;
    mvpName: string;
    handleResetDeathTime: (mapName: string) => void;
}

export const Countdown = ({ respawn, mapName, mvpName, handleResetDeathTime }: CountdownProps) => {
    const [diff, setDiff] = useState<Duration>(() => 
        respawn.diff(DateTime.now(), ['hours', 'minutes', 'seconds'])
    );

    const now = DateTime.now();
    const [tenMinutesLeftNotification, setTenMinutesLeftNotification] = useState(false);

    const delayNotification = useAppSelector(state => state.userSlice.delayNotification);
    const soundNotification = useAppSelector(state => state.userSlice.soundNotification);
    const notificationVolume = useAppSelector(state => state.userSlice.notificationVolume);
    const dispatch = useAppDispatch();

    const updateDiff = useCallback(() => {
        setDiff(respawn.diff(now, ['hours', 'minutes', 'seconds']));
    }, [respawn]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let audio: HTMLAudioElement;

        if (diff.as('seconds') > 0) {
            interval = setInterval(() => {
                const newDiff = respawn.diff(now, ['hours', 'minutes', 'seconds']);
                setDiff(newDiff);

                if (newDiff.as('minutes') <= 10 && !tenMinutesLeftNotification) {
                    setTenMinutesLeftNotification(true);
                    
                    audio = new Audio('sounds/sign_right.wav');
                    audio.volume = notificationVolume / 100;
                    audio.play().then(() => audio.remove());

                    notifications.show({
                        title: <div className="text-gray-500 text-sm italic">10 minutes left</div>,
                        message: <Flex direction="column" gap={0}>
                            <div className="text-gray-800 text-lg font-bold">MVP : {mvpName}</div>
                            <div className="text-gray-800 text-lg font-bold">Map : {mapName}</div>
                        </Flex>,
                        autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                        color: 'orange',
                        radius: "md",
                        withBorder: false
                    });
                }

                if (newDiff.as('seconds') <= 0) {
                    dispatch(addNotification({
                        id: uuidv4(),
                        mvpName: mvpName,
                        mapName: mapName,
                        respawn: now.toMillis()
                    }));

                    notifications.show({
                        title: <div className="text-gray-500 text-sm italic">{now.toFormat("dd/MM/yyyy HH'h'mm'm")}</div>,
                        message: <Flex direction="column" gap={0}>
                            <div className="text-gray-800 text-lg font-bold">MVP : {mvpName}</div>
                            <div className="text-gray-800 text-lg font-bold">Map : {mapName}</div>
                        </Flex>,
                        autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                        color: 'green',
                        radius: "md",
                        withBorder: false
                    });

                    dispatch(reSortMvp());

                    if (soundNotification) {
                        audio = new Audio('sounds/sign_right.wav');
                        audio.volume = notificationVolume / 100;
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
        <Flex align="center">
            <Text>
                {diff.toFormat("hh'h'mm'm'ss's'")}
            </Text>

            <CloseButton variant="transparent" size="sm" onClick={() => handleResetDeathTime(mapName)} />
        </Flex>
    );
};