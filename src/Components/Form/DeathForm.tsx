import {MultiSelect, NumberInput, Text, Modal, Flex, Button} from "@mantine/core";
import {useCallback, useEffect, useState} from "react";
import {DateTime} from "luxon";
import {useAppDispatch, useAppSelector} from "@store/Hooks.ts";
import {setMvpMaps} from "@store/Slice/Mvp/Slice.ts";
import {setOpened} from "@store/Slice/Modal/ModalSlice.ts";
import {TimeInputWithIcon} from "@components/Form/TimeInput/TimeInput.tsx";


export const DeathFormModal = () => {
    const dispatch = useAppDispatch()

    const opened = useAppSelector(state => state.modalSlice.opened)
    const mvp = useAppSelector(state => state.modalSlice.mvp)

    const [mvpMapsName, setMvpMapsName] = useState<string[]>(mvp.mvpMaps.map(mvpmap => mvpmap.name))
    const [mapsSelected, setMapsSelected] = useState<string[]>([])
    const [mapsData, setMapsData] = useState<MvpMap[]>([...mvp.mvpMaps])
    const [dropdownOpened, setDropdownOpened] = useState<boolean>(false)

    const updateMapData = useCallback((mapsData: MvpMap[], mapName: string, type: 'time'|'x'|'y', value: string | number) => {
        const newMapsData = mapsData
        const i = newMapsData.findIndex(mvpMap => mvpMap.name === mapName)
        const newMap = {...newMapsData[i]}

        switch (type){
            case 'time':
                if (typeof value === "string") {
                    const [hour, minute] = value.split(':')
                    const dt = DateTime.now().set({hour: parseInt(hour), minute: parseInt(minute)})
                    newMap.deathTime = dt.toISO({ includeOffset: false })
                }
            break

            case 'x':
            case 'y':
                value = typeof value === "string" ? parseInt(value) : value
                if(value < 0) value = 0

                const newTomb = {...newMap.tombPos} // Create copy, because immutable object
                newTomb[type] = value
                newMap.tombPos = newTomb
            break
        }
        newMapsData[i] = newMap
        setMapsData(newMapsData)
    }, [])

    const handleConfirm = useCallback(() => {
        dispatch(setMvpMaps({mvp: mvp, newMapsData: mapsData}))
        setMapsSelected([])
        dispatch(setOpened(false))
    },[dispatch, mapsData, mvp])

    const handleMultiSelect = (value: string[]) => {
        setMapsSelected(value)
        setDropdownOpened(false)
    }

    useEffect(() => {
        setMvpMapsName(mvp.mvpMaps.map(mvpmap => mvpmap.name))
        setMapsData([...mvp.mvpMaps])
    }, [mvp]);

    return (
        <Modal opened={opened} onClose={() => dispatch(setOpened(false))} centered withCloseButton={false} radius={"lg"}>
            <Text>
                <span className={"text-2xl"}>
                    {mvp.Name}
                </span>
            </Text>

            <ul className="flex flex-col p-2 bg-base-100 w-full rounded-box gap-4">
                <li>
                    <MultiSelect onChange={handleMultiSelect}
                                 onClick={() => setDropdownOpened(true)}
                                 onBlur={() => setDropdownOpened(false)}
                                 dropdownOpened={dropdownOpened}
                                 className={"multipleSelect"}
                                 placeholder="Ex : map 1"
                                 label={"Choose maps where the MVP has died"}
                                 data={mvpMapsName}
                    />
                </li>

                <li className={"flex flex-col gap-2"}>
                    {mapsSelected && mapsSelected.map((mvpMap) => {
                            return (
                                <Flex direction={"column"} key={mvpMap}>
                                    <Text>{mvpMap}</Text>
                                    <Flex direction={"column"} gap={8}>

                                        <TimeInputWithIcon mapsData={mapsData} mvpMap={mvpMap} updateMapData={updateMapData}/>

                                        <Flex gap={12}>
                                            <NumberInput name={`x-${mvpMap}`} onChange={(value) => updateMapData(mapsData, mvpMap, 'x', value)}
                                                min={0} radius="xl" placeholder="X"/>

                                            <NumberInput name={`y-${mvpMap}`} onChange={(value) => updateMapData(mapsData, mvpMap, 'y', value)}
                                                min={0} radius="xl" placeholder="Y"/>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                </li>
            </ul>

            <Flex justify={"space-between"}>
                <Button variant="gradient" radius="xl" onClick={handleConfirm}
                        gradient={{ from: 'violet', to: 'blue', deg: 90 }}>
                    Confirm
                </Button>
                <Button variant="gradient" radius="xl" onClick={() => dispatch(setOpened(false))}
                        gradient={{ from: 'pink', to: 'red', deg: 90 }}>
                    Close
                </Button>
            </Flex>
        </Modal>
    )
}