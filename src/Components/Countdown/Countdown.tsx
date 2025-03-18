import { PropsWithChildren, useEffect, useState } from "react";
import { DateTime, Duration } from "luxon";
import { Text } from "@mantine/core";
import { Flex, CloseButton } from "@mantine/core";


type CountdownProps =  PropsWithChildren & {
    respawn: DateTime;
    mapName: string;
    handleResetDeathTime: (mapName: string) => void;
}


export const Countdown = ({ respawn, mapName, handleResetDeathTime }: CountdownProps) => {
    const [diff, setDiff] = useState<Duration>(() => 
        respawn.diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])
    );

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (diff.as('seconds') > 0) {
            interval = setInterval(() => {
                setDiff(respawn.diffNow(['hours', 'minutes', 'seconds', 'milliseconds']));
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [respawn, diff, handleResetDeathTime, mapName]);

    return (
        <Flex align="center">
            <Text>
                {diff.toFormat("hh'h'mm'm'ss's'")}
            </Text>

            <CloseButton variant="transparent" size="sm" onClick={() => handleResetDeathTime(mapName)} />
        </Flex>
    );
};