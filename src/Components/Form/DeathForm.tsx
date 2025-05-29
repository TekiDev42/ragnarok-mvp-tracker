/**
 * @file DeathForm.tsx
 * @description This file contains the DeathFormModal component, which is responsible for handling the MVP death form.
 */

import { Text, Modal, Flex, Button, Chip, Group, ScrollArea } from "@mantine/core";
import { useCallback, useEffect, useState, useMemo, CSSProperties } from "react";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { setMvpMaps } from "@store/Slice/Mvp/Slice.ts";
import { setOpened } from "@/Store/Slice/Modal/DeathFormModalSlice";
import { TimeInputWithIcon } from "@/Components/Form/TimeInput/TimeInput.tsx";
import { MapChip } from "@/Components/MapChip/MapChip.tsx";
import { supabase } from "@/supabase/supabase";
import { notifications } from "@mantine/notifications";
import { sizeImage } from "@/Constants/defaults";
import { IconGrave } from "@tabler/icons-react";


export const DeathFormModal = () => {
    const dispatch = useAppDispatch();
    const { opened, mvp } = useAppSelector(state => state.deathFormModalSlice);
    const userSession = useAppSelector(state => state.userSlice.userSession);
    const partyId = useAppSelector(state => state.partySlice.partyId);
    const respawnTimer = useAppSelector(state => state.userSlice.respawnTimer)

    const [mapsSelected, setMapsSelected] = useState<string[]>([]);
    const [mapsData, setMapsData] = useState<MvpMap[]>([]);
    const [j, setJ] = useState<string>("today");

    const graveIconSize = 16

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


    const getStyleTomb = useCallback((map: string): CSSProperties => {
        const mvpMap = mvp.mvpMaps.find(mvpmap => mvpmap.name === map)
        const mapData = mapsData.find(item => item.name === map)
    
        if (!mvpMap || !mapData) {
            return {
                position: "absolute",
                left: `0px`,
                bottom: `0px`,
                width: 0,
                height: 0
            }
        }

        const ratio = {
            x: sizeImage / mvpMap.size.width,
            y: sizeImage / mvpMap.size.height
        }
        
        console.log('deathform' , mapData.tombPos.x, mapData.tombPos.y)

        return {
            position: "absolute",
            left: `${mapData.tombPos.x * ratio.x - (graveIconSize / 2)}px`,
            bottom: `${mapData.tombPos.y * ratio.y}px`,
            width: `${graveIconSize}px`,
            height: `${graveIconSize}px`
        }

    }, [sizeImage, graveIconSize, mvp.mvpMaps, mapsData]);


    return (
        <Modal opened={opened} onClose={handleClose} centered withCloseButton={false} radius="md" size={mapsSelected.length > 1 ? "640px" : "auto"}>
            <ScrollArea h={mapsSelected.length > 0 ? 510 : 150} type="auto" offsetScrollbars>
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

                <li className={`grid grid-cols-${mapsSelected.length > 1 ? 2 : 1} gap-2`}>
                    
                        {mapsSelected.map((mvpMap) => (
                            <Flex direction="column" key={mvpMap}>
                                <h2 className="text-sm font-bold text-center py-2">{mvpMap}</h2>

                                <Flex direction="column" gap={8} justify="center" align="center">
                                    <Flex gap={4} direction="column" justify="center" align="center">
                                        <Chip.Group multiple={false} defaultValue={j} onChange={handleChipClick}>
                                            <Group gap={0}>
                                                <Chip size="sm" value="today" onClick={() => handleChipClick("today")}>Today</Chip>
                                                <Chip size="sm" value="-1" onClick={() => handleChipClick("-1")}>J -1</Chip>
                                            </Group>
                                        </Chip.Group>

                                        <TimeInputWithIcon mapsData={mapsData} mvpMap={mvpMap} updateMapData={updateMapData} />
                                    </Flex>

                                    <figure style={{position: "relative", borderRadius: '10px'}} onClick={(e) => {
                                        const ratio = {
                                            x: sizeImage / mvp.mvpMaps.find(m => m.name === mvpMap)?.size.width!,
                                            y: sizeImage / mvp.mvpMaps.find(m => m.name === mvpMap)?.size.height!
                                        }

                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = rect.height - (e.clientY - rect.top) - 8;

                                        updateMapData(mvpMap, 'x', x / ratio.x);
                                        updateMapData(mvpMap, 'y', y / ratio.y);
                                    }}>
                                        <img loading={"lazy"}
                                            style={{"width": `${sizeImage}px`, "height": `${sizeImage}px`, "borderRadius": '10px'}}
                                            src={`images/maps/${mvpMap}.webp`}
                                            alt={mvpMap}
                                        />

                                        { mapsData.find(map => map.name === mvpMap)!.tombPos.x > 0 && mapsData.find(map => map.name === mvpMap)!.tombPos.y > 0 &&
                                            <IconGrave color={"transparent"}
                                                fill={"#ffd43b"}
                                                style={getStyleTomb(mvpMap)}
                                            />
                                        }
                                    </figure>

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
            </ScrollArea>
        </Modal>
    );
};