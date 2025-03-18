import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "@store/Hooks.ts";
import {setSearch as setSearchAction} from "@store/Slice/Mvp/Slice.ts";
import { Autocomplete, AutocompleteProps, ComboboxItem, OptionsFilter } from "@mantine/core";
import { useAppSelector } from "@store/Hooks";
import { Image, Flex, Badge } from "@mantine/core";



export const ActionSearch = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>("")
    const [timeout, setStateTimeout] = useState<NodeJS.Timeout | null>(null)
    const mvps = useAppSelector((state) => state.Slice.mvps)


    const searchHandleChange = (value: string) => {

        if (timeout) {
            clearTimeout(timeout)
        }

        setStateTimeout(setTimeout(() => {
            dispatch(setSearchAction(value))
        }, 400))

        setSearch(value)
    }


    /* <TextInput radius="xl"
                   style={{width: "100%",maxWidth: "320px"}}
                   onChange={searchHandleChange}
                   value={search}
                   placeholder="Search MVP by name, DB name or id"
                   rightSection={<IconX size={16} onClick={() => setSearch("")}/>}/> */


    const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
        const mvp = mvps.find((mvp) => mvp.Id.toString() === option.value)

        return <Flex justify="flex-start" align="center" gap={10} className="py-1 border-b border-gray-200 w-full">
            <div className={"w-10 h-10"}>
                <Image className="w-10 h-10" src={`images/mvps/webp/fixe/${mvp?.image}`} fit="contain" fallbackSrc="/images/mvp-flag.png" />
            </div>

            <Flex direction="column" gap={2}>
                <Badge size="md" color="blue" variant="light" autoContrast>{mvp?.Id}</Badge>
                <div className="text-md uppercase font-bold">{mvp?.Name}</div>
            </Flex>
        </Flex>
    }

    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const searchLower = search.toLowerCase()
        const numValue = parseInt(search)

        return (options as ComboboxItem[]).filter((option) => {
            const mvp = mvps.find((mvp) => mvp.Id === parseInt(option.value))

            if (!isNaN(numValue)) {
                return mvp?.Id === numValue
            }

            if (mvp) {
                return mvp?.Name.toLowerCase().includes(searchLower) || mvp?.AegisName.toLowerCase().includes(searchLower)
            }

            return false
        })
    }

    return (
        <Autocomplete
            style={{width: "100%",maxWidth: "360px"}}
            data={mvps.map((mvp) => mvp.Id.toString())}
            filter={optionsFilter}
            renderOption={renderAutocompleteOption}
            maxDropdownHeight={300}
            placeholder="Search MVP by name, DB name or id"
            onChange={searchHandleChange}
            clearable
        />
    )
}