import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { DateTime, Duration } from "luxon";
import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { reSortMvp } from "@store/Slice/Mvp/Slice.ts";
import { Flex, CloseButton } from "@mantine/core";
import { addNotification } from "@store/Slice/User/UserSlice.ts";
import { v4 as uuidv4 } from 'uuid';

type CountdownProps =  PropsWithChildren & {
    respawn: DateTime;
    mapName: string;
    mapDisplayName: string;
    mvpName: string;
    handleResetDeathTime: (mapName: string) => void;
    id: string;
}


export const Countdown = ({ respawn, mapName, mapDisplayName, mvpName, id, handleResetDeathTime }: CountdownProps) => {
    const [diff, setDiff] = useState<Duration>(() => 
        respawn.diffNow(['hours', 'minutes', 'seconds'])
    );

    const [tenMinutesLeftNotification, setTenMinutesLeftNotification] = useState(false);
    const delayNotification = useAppSelector(state => state.userSlice.delayNotification);
    const soundNotification = useAppSelector(state => state.userSlice.soundNotification);
    const notificationVolume = useAppSelector(state => state.userSlice.notificationVolume);
    const dispatch = useAppDispatch();
    
    const timerLeft = 5;

    const updateDiff = useCallback(() => {
        setDiff(respawn.diffNow(['hours', 'minutes', 'seconds']));
    }, [respawn]);


    useEffect(() => {
        let interval: NodeJS.Timeout;
        let audio: HTMLAudioElement;

        if (diff.as('seconds') > 0) {
            interval = setInterval(() => {
                const newDiff = respawn.diffNow(['hours', 'minutes', 'seconds']);
                setDiff(newDiff);

                if (newDiff.as('minutes') === timerLeft && !tenMinutesLeftNotification) {
                    setTenMinutesLeftNotification(true);

                    audio = new Audio('sounds/sign_right.wav');
                    audio.volume = notificationVolume / 100;
                    audio.play().then(() => audio.remove());

                    notifications.show({
                        title: <div className="text-gray-500 text-xs italic">{timerLeft} minutes left</div>,
                        message: <Flex direction="column" gap={0}>
                            <div className="text-gray-800 text-md font-bold"><a href={`#${id}`}>MVP : {mvpName}</a></div>
                            <div className="text-gray-800 text-md font-bold flex gap-1 items-center">
                                <span>Map : {mapName}</span>
                                <span className="text-xs">({mapDisplayName})</span>
                            </div>
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
                        respawn: respawn.toMillis()
                    }));

                    notifications.show({
                        title: <div className="text-gray-500 text-xs italic">{respawn.toFormat("dd/MM/yyyy HH'h'mm")}</div>,
                        message: <Flex direction="column" gap={0}>
                            <div className="text-gray-800 text-md font-bold"><a href={`#${id}`}>MVP : {mvpName}</a></div>
                            <div className="text-gray-800 text-md font-bold flex gap-1 items-center">
                                <span>Map : {mapName}</span>
                                <span className="text-xs">({mapDisplayName})</span>
                            </div>
                        </Flex>,
                        autoClose: delayNotification === 0 ? false : delayNotification * 1000,
                        color: 'green',
                        radius: "md",
                        withBorder: false,
                        children: <Flex></Flex>
                    });

                    if (soundNotification) {
                        audio = new Audio('sounds/sign_right.wav');
                        audio.volume = notificationVolume / 100;
                        audio.play().then(() => audio.remove());
                    }

                    dispatch(reSortMvp());
                    setTenMinutesLeftNotification(false);
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


    return (
        <Flex align="center">
            <Text>
                {diff.toFormat("hh'h'mm'm'ss's'")}
            </Text>

            <CloseButton variant="transparent" size="sm" onClick={() => handleResetDeathTime(mapName)} />
        </Flex>
    );
};