import {TextInput} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "@store/Hooks.ts";
import {filterByNameOrId} from "@store/Slice/Mvp/Slice.ts";
import { IconX } from "@tabler/icons-react";

export const ActionSearch = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>("")

    const searchHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setSearch(value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(filterByNameOrId(search))
        }, 400)

        return () => clearTimeout(timeout)
    }, [search]);

    return (
        <TextInput radius="xl"
                   style={{width: "100%",maxWidth: "320px"}}
                   onChange={searchHandleChange}
                   value={search}
                   placeholder="Search MVP by name, DB name or id"
                   rightSection={<IconX size={16} onClick={() => setSearch("")}/>}/>
    )
}