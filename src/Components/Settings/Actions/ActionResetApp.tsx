import {Button, Flex, Popover, Text} from "@mantine/core";
import {useState} from "react";
import {useAppDispatch} from "@store/Hooks";
import {reset as resetUser} from "@store/Slice/User/UserSlice";
import {reset as resetMvp} from "@store/Slice/Mvp/Slice";


export const ActionResetApp = () => {
    const [resetForm, setResetForm] = useState(false)
    const dispatch = useAppDispatch()

    const handleReset = () => {
        dispatch(resetUser())
        dispatch(resetMvp())
        setResetForm(false)
    }

    return (<Popover opened={resetForm} width={300} position="bottom" withArrow shadow="md">
        <Popover.Target>
            <Button onClick={() => setResetForm(true)}
                    radius={"lg"}
                    variant="gradient"
                    gradient={{ from: 'red', to: 'grape', deg: 90 }}
            >
                Reset
            </Button>
        </Popover.Target>
        <Popover.Dropdown>
            <Flex direction={"column"} justify={"start"} align={"start"} gap={8}>
                <Text>Are you sure? There's no going back!</Text>

                <Flex w={"100%"} gap={10} justify={"space-between"}>
                    <Button size={"xs"} onClick={() => setResetForm(false)} variant="filled">
                        Cancel
                    </Button>

                    <Button size={"xs"} onClick={handleReset} variant="filled" color="red">
                        Confirm and reset
                    </Button>
                </Flex>

            </Flex>
        </Popover.Dropdown>
    </Popover>)
}