/**
 * @file DeathForm.tsx
 * @description This file contains the DeathFormModal component, which is responsible for handling the MVP death form.
 */

import { NumberInput, Text, Modal, Flex, Button, Chip, Group } from "@mantine/core";
import { useCallback, useEffect, useState, useMemo } from "react";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { setMvpMaps } from "@store/Slice/Mvp/Slice.ts";
import { setOpened } from "@/Store/Slice/Modal/DeathFormModalSlice";
import { TimeInputWithIcon } from "@/Components/Form/TimeInput/TimeInput.tsx";
import { MapChip } from "@/Components/MapChip/MapChip.tsx";
import { supabase } from "@/supabase/supabase";
import { notifications } from "@mantine/notifications";


export const DeathFormModal = () => {
    const dispatch = useAppDispatch();
    const { opened, mvp } = useAppSelector(state => state.deathFormModalSlice);
    const userSession = useAppSelector(state => state.userSlice.userSession);
    const partyId = useAppSelector(state => state.partySlice.partyId);
    const respawnTimer = useAppSelector(state => state.userSlice.respawnTimer)

    const [mapsSelected, setMapsSelected] = useState<string[]>([]);
    const [mapsData, setMapsData] = useState<MvpMap[]>([]);
    const [j, setJ] = useState<string>("today");

    /**
     * Memoized array of MVP map names
     */
    const mvpMapsName = useMemo(() => mvp.mvpMaps.map(mvpmap => mvpmap.name).filter(name => name.match(/^\d+@.+/) === null), [mvp.mvpMaps]);

    useEffect(() => {
        if (mvpMapsName.length === 1) {
            setMapsSelected([mvpMapsName[0]]);
        } else {
            setMapsSelected([]);
        }
    }, [mvpMapsName]);


    const updateMapData = useCallback((mapName: string, type: 'time' | 'x' | 'y', value: string | number) => {
        setMapsData(prevMapsData => {
            const newMapsData = [...prevMapsData];
            const index = newMapsData.findIndex(mvpMap => mvpMap.name === mapName);

            if (index === -1) return prevMapsData;

            const newMap = { ...newMapsData[index] }

            switch (type) {
                case 'time':
                    if (typeof value === "string") {
                        const [hour, minute] = value.split(':');
                        let dt = DateTime.now();

                        if (j === "-1") {
                            dt = DateTime.now().minus({ days: 1 });
                        }

                        const respawn = dt
                        .set({ hour: parseInt(hour), minute: parseInt(minute) })
                        .plus({minutes: respawnTimer === 0 ? newMap.respawnTimer : respawnTimer})

                        newMap.deathTime = respawn.toMillis();
                    }
                    break;
                case 'x':
                case 'y':
                    value = Math.max(0, typeof value === "string" ? parseInt(value) : value);
                    newMap.tombPos = { ...newMap.tombPos, [type]: value };
                    break;
            }

            newMapsData[index] = newMap;
            return newMapsData;
        });
    }, [respawnTimer, setMapsData]);

    /**
     * Handles the confirmation of the form submission
     */
    const handleConfirm = useCallback(async () => {
        dispatch(setMvpMaps({ mvp, newMapsData: mapsData }));
        setMapsSelected(mvpMapsName.length === 1 ? [mvpMapsName[0]] : []);

        if (userSession && partyId) {
            mapsData.forEach(async (map) => {

                if (map.deathTime === 0) {
                    return;
                }

                if (!mvpMapsName.includes(map.name)) {
                    return;
                }

                let { data: maps_party, error: errorSelect } = await supabase
                    .from('maps_party')
                    .select("*")
                    .eq('map_name', map.name)
                    .eq('mvp_id', mvp.Id)
                    .eq('party_id', partyId)

                if (errorSelect) {
                    notifications.show({
                        title: 'Error fetching',
                        message: errorSelect.message,
                        autoClose: 5000,
                        color: 'red',
                        radius: "md",
                        withBorder: false,
                        style: {
                            backgroundColor: '#FFF1F0',
                            color: '#CF1322',
                            border: '1px solid #FFF1F0',
                        }
                    })
                    return;
                }

                if (maps_party && maps_party.length > 0 && maps_party[0].death_time === map.deathTime) {
                    return;
                }

                if (maps_party && maps_party.length > 0) {
                    const { error: errorUpdate } = await supabase.from('maps_party')
                    .update({
                        tomb_pos_x: map.tombPos.x,
                        tomb_pos_y: map.tombPos.y,
                        death_time: map.deathTime,
                        last_user_update: userSession.user.id,
                    })
                    .eq('id', maps_party[0].id)
                    .eq('party_id', partyId)
                    .eq('map_name', map.name)
                    .eq('mvp_id', mvp.Id)
                    .select()

                    if (errorUpdate) {
                        notifications.show({
                            title: 'Error updating',
                            message: errorUpdate.message,
                            autoClose: 5000,
                            color: 'red',
                            radius: "md",
                            withBorder: false,
                            style: {
                                backgroundColor: '#FFF1F0',
                                color: '#CF1322',
                                border: '1px solid #FFF1F0',
                            }
                        })
                    }

                    return;
                }

                const { error: errorInsert } = await supabase.from('maps_party')
                .insert({
                    party_id: partyId,
                    last_user_update: userSession.user.id,
                    map_name: map.name,
                    mvp_id: mvp.Id,
                    tomb_pos_x: map.tombPos.x,
                    tomb_pos_y: map.tombPos.y,
                    death_time: map.deathTime,
                })
                .select()
    
                if (errorInsert) {
                    notifications.show({
                        title: 'Error inserting',
                        message: errorInsert.message,
                        autoClose: 5000,
                        color: 'red',
                        radius: "md",
                        withBorder: false,
                        style: {
                            backgroundColor: '#FFF1F0',
                            color: '#CF1322',
                            border: '1px solid #FFF1F0',
                        }
                    })
                }
            })
        }
        
        dispatch(setOpened(false));
    }, [dispatch, mapsData, mvp, mvpMapsName]);

    /**
     * Handles the selection of multiple maps
     * @param {string[]} value - The selected map names
     */
    const handleMapSelection = useCallback((mapName: string, checked: boolean) => {
        if (!checked) {
            setMapsSelected(prevMapsSelected => [...prevMapsSelected, mapName]);
        } else {
            setMapsSelected(prevMapsSelected => prevMapsSelected.filter(map => map !== mapName));
        }
    }, []);

    const handleClose = useCallback(() => {
        dispatch(setOpened(false));
        setMapsSelected(mvpMapsName.length === 1 ? [mvpMapsName[0]] : []);
    }, [dispatch, mvpMapsName]);


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClose();
        }

        if (event.key === 'Enter') {    
            handleConfirm();
        }
    }, [handleClose, handleConfirm]);


    /**
     * Updates the mapsData state when the MVP changes
     */
    useEffect(() => {
        setMapsData([...mvp.mvpMaps]);
    }, [mvp]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown])


    const handleChipClick = useCallback((value: string) => {
        setJ(value);
    }, [updateMapData]);

    return (
        <Modal opened={opened} onClose={handleClose} centered withCloseButton={false} radius="md">
            <Text>
                <span className="text-2xl">{mvp.Name}</span>
            </Text>

            <ul className="flex flex-col p-2 bg-base-100 w-full rounded-box gap-4">
                <li>
                    <Chip.Group>
                        <Group justify="flex-start" gap={"0.5rem 0.5rem"}>
                            {mvpMapsName.map((mapName, index) => {
                                return <MapChip key={index} mapName={mapName} 
                                            defaultChecked={mvpMapsName.length === 1}
                                            onChange={handleMapSelection}
                                        />
                            })}
                        </Group>
                    </Chip.Group>
                </li>

                <li className="flex flex-col gap-2">
                    {mapsSelected.map((mvpMap) => (
                        <Flex direction="column" key={mvpMap}>
                            <h2 className="text-sm font-bold text-center py-2">{mvpMap}</h2>
                            <Flex direction="column" gap={8}>

                                <Flex gap={4} align="center">
                                    <TimeInputWithIcon mapsData={mapsData} mvpMap={mvpMap} updateMapData={updateMapData} />

                                    <Chip.Group multiple={false} defaultValue={j} onChange={handleChipClick}>
                                        <Group justify="flex-start" gap={4}>
                                            <Chip size="sm" value="today" onClick={() => handleChipClick("today")}>Today</Chip>
                                            <Chip size="sm" value="-1" onClick={() => handleChipClick("-1")}>J -1</Chip>
                                        </Group>
                                    </Chip.Group>
                                </Flex>

                                <Flex gap={12}>
                                    <NumberInput
                                        name={`x-${mvpMap}`}
                                        onChange={(value) => updateMapData(mvpMap, 'x', value)}
                                        min={0}
                                        radius="xl"
                                        placeholder="X"
                                    />
                                    <NumberInput
                                        name={`y-${mvpMap}`}
                                        onChange={(value) => updateMapData(mvpMap, 'y', value)}
                                        min={0}
                                        radius="xl"
                                        placeholder="Y"
                                    />
                                </Flex>

                            </Flex>
                        </Flex>
                    ))}
                </li>
            </ul>

            <Flex justify="space-between">
                <Button
                    variant="gradient"
                    radius="xl"
                    onClick={handleConfirm}
                    gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                >
                    Confirm
                </Button>
                <Button
                    variant="gradient"
                    radius="xl"
                    onClick={handleClose}
                    gradient={{ from: 'pink', to: 'red', deg: 90 }}
                >
                    Close
                </Button>
            </Flex>
        </Modal>
    );
};