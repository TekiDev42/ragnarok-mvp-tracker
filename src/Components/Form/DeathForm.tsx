import { MultiSelect, NumberInput, Text, Modal, Flex, Button } from "@mantine/core";
import { useCallback, useEffect, useState, useMemo } from "react";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "@store/Hooks.ts";
import { setMvpMaps } from "@store/Slice/Mvp/Slice.ts";
import { setOpened } from "@store/Slice/Modal/ModalSlice.ts";
import { TimeInputWithIcon } from "@components/Form/TimeInput/TimeInput.tsx";

export const DeathFormModal = () => {
    const dispatch = useAppDispatch();
    const { opened, mvp } = useAppSelector(state => state.modalSlice);

    const [mapsSelected, setMapsSelected] = useState<string[]>([]);
    const [mapsData, setMapsData] = useState<MvpMap[]>([]);
    const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

    const mvpMapsName = useMemo(() => mvp.mvpMaps.map(mvpmap => mvpmap.name), [mvp.mvpMaps]);

    const updateMapData = useCallback((mapName: string, type: 'time' | 'x' | 'y', value: string | number) => {
        setMapsData(prevMapsData => {
            const newMapsData = [...prevMapsData];
            const index = newMapsData.findIndex(mvpMap => mvpMap.name === mapName);
            if (index === -1) return prevMapsData;

            const newMap = { ...newMapsData[index] };

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

    const handleConfirm = useCallback(() => {
        dispatch(setMvpMaps({ mvp, newMapsData: mapsData }));
        setMapsSelected([]);
        dispatch(setOpened(false));
    }, [dispatch, mapsData, mvp]);

    const handleMultiSelect = useCallback((value: string[]) => {
        setMapsSelected(value);
        setDropdownOpened(false);
    }, []);

    useEffect(() => {
        setMapsData([...mvp.mvpMaps]);
    }, [mvp]);

    return (
        <Modal opened={opened} onClose={() => dispatch(setOpened(false))} centered withCloseButton={false} radius="lg">
            <Text>
                <span className="text-2xl">{mvp.Name}</span>
            </Text>

            <ul className="flex flex-col p-2 bg-base-100 w-full rounded-box gap-4">
                <li>
                    <MultiSelect
                        onChange={handleMultiSelect}
                        onClick={() => setDropdownOpened(true)}
                        onBlur={() => setDropdownOpened(false)}
                        dropdownOpened={dropdownOpened}
                        className="multipleSelect"
                        placeholder="Ex : map 1"
                        label="Choose maps where the MVP has died"
                        data={mvpMapsName}
                    />
                </li>

                <li className="flex flex-col gap-2">
                    {mapsSelected.map((mvpMap) => (
                        <Flex direction="column" key={mvpMap}>
                            <Text>{mvpMap}</Text>
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
                    onClick={() => dispatch(setOpened(false))}
                    gradient={{ from: 'pink', to: 'red', deg: 90 }}
                >
                    Close
                </Button>
            </Flex>
        </Modal>
    );
};