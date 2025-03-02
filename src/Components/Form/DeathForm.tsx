/**
 * @file DeathForm.tsx
 * @description This file contains the DeathFormModal component, which is responsible for handling the MVP death form.
 */

import { NumberInput, Text, Modal, Flex, Button, Chip, Group } from "@mantine/core";
import { useCallback, useEffect, useState, useMemo } from "react";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { setMvpMaps } from "@store/Slice/Mvp/Slice.ts";
import { setOpened } from "@store/Slice/Modal/ModalSlice.ts";
import { TimeInputWithIcon } from "@/Components/Form/TimeInput/TimeInput.tsx";
import { MapChip } from "@/Components/MapChip/MapChip.tsx";


export const DeathFormModal = () => {
    const dispatch = useAppDispatch();
    const { opened, mvp } = useAppSelector(state => state.modalSlice);

    const [mapsSelected, setMapsSelected] = useState<string[]>([]);
    const [mapsData, setMapsData] = useState<MvpMap[]>([]);

    /**
     * Memoized array of MVP map names
     */
    const mvpMapsName = useMemo(() => mvp.mvpMaps.map(mvpmap => mvpmap.name), [mvp.mvpMaps]);

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
                        const dt = DateTime.now().set({ hour: parseInt(hour), minute: parseInt(minute) });
                        newMap.deathTime = dt.toISO({ includeOffset: false });
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
    }, []);

    /**
     * Handles the confirmation of the form submission
     */
    const handleConfirm = useCallback(() => {
        dispatch(setMvpMaps({ mvp, newMapsData: mapsData }));
        setMapsSelected(mvpMapsName.length === 1 ? [mvpMapsName[0]] : []);
        dispatch(setOpened(false));
    }, [dispatch, mapsData, mvp, mvpMapsName]);

    /**
     * Handles the selection of multiple maps
     * @param {string[]} value - The selected map names
     */
    const handleMapSelection = useCallback((mapName: string, checked: boolean) => {
        console.log(mapName, checked);
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

    /**
     * Updates the mapsData state when the MVP changes
     */
    useEffect(() => {
        setMapsData([...mvp.mvpMaps]);
    }, [mvp]);

    return (
        <Modal opened={opened} onClose={handleClose} centered withCloseButton={false} radius="lg">
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
                                <TimeInputWithIcon mapsData={mapsData} mvpMap={mvpMap} updateMapData={updateMapData} />

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