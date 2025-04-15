import { useAppDispatch } from "@store/Hooks.ts";
import { setMvpFocus } from "@store/Slice/Mvp/Slice.ts";
import { Autocomplete, AutocompleteProps, ComboboxItem, OptionsFilter } from "@mantine/core";
import { useAppSelector } from "@store/Hooks";
import { Image, Flex, Badge } from "@mantine/core";
import { getBadgeColor } from "@/Utils/getBadgeColor";


export const ActionSearch = () => {
    const dispatch = useAppDispatch()
    const mvps = useAppSelector((state) => state.Slice.mvps)

    const searchHandleChange = (value: string) => {
        const numValue = parseInt(value)
        dispatch(setMvpFocus(isNaN(numValue) ? null : numValue))
    }

    const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
        const mvp = mvps.find((mvp) => mvp.Id.toString() === option.value)

        return <Flex justify="flex-start" align="center" gap={10} className="py-1 border-b border-gray-200 w-full">
            <div className={"w-10 h-10"}>
                <Image className="w-10 h-10" src={`images/mvps/webp/fixe/${mvp?.image}`} fit="contain" fallbackSrc="/images/mvp-flag.png" />
            </div>

            <Flex direction="column" gap={2}>
                <Flex justify="center" align="center" gap={4}>
                    <Badge size="md" color="blue" variant="light" autoContrast>{mvp?.Id}</Badge>
                    <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp?.Size ?? '')}>{mvp?.Size}</Badge>
                    <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp?.Race ?? '')}>{mvp?.Race}</Badge>
                    <Badge w={"fit-content"} autoContrast size="xs" color={getBadgeColor(mvp?.Element ?? '')}>{mvp?.Element} Lvl: {mvp?.ElementLevel}</Badge>
                </Flex>
                <div className="text-md uppercase font-bold">{mvp?.Name}</div>
            </Flex>
        </Flex>
    }

    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const searchLower = search.toLowerCase()
        const numValue = parseInt(search)

        return (options as ComboboxItem[]).filter((option) => {
            const mvp = mvps.find((mvp) => mvp.Id === parseInt(option.value))

            if (!isNaN(numValue) && mvp) {
                return mvp.Id === numValue
            }

            if (mvp) {
                return mvp.Name.toLowerCase().includes(searchLower) 
                        || mvp.AegisName.toLowerCase().includes(searchLower) 
                        || mvp.Race?.toLowerCase().includes(searchLower)
                        || mvp.Size?.toLowerCase().includes(searchLower)
                        || mvp.Element?.toLowerCase().includes(searchLower)
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
            placeholder="Search..."
            onOptionSubmit={searchHandleChange}
            onClear={() => searchHandleChange('')}
            clearable
        />
    )
}