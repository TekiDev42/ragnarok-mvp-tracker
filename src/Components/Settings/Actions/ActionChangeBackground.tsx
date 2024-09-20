import {useCallback} from "react";
import {IconPhoto, IconX} from "@tabler/icons-react";
import {FileInput, rem, Stack, Text} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {bytesToMB} from "@utils/bytesToMB";
import {useAppDispatch} from "@store/Hooks";
import {setBackground} from "@store/Slice/User/UserSlice";

export const ActionChangeBackground = () => {
    const dispatch = useAppDispatch()

    const icon = <IconPhoto style={{width: rem(18), height: rem(18)}} stroke={1.5} />
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const maxSize = 5_242_880

    const toBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
        })
    }

    const handleChange = useCallback(async (file: File | null) => {
        if(file) {
            const fileTypes = ["image/png","image/jpeg","image/jpg","image/webp"]

            if(!fileTypes.find(type => type === file.type)) {
                notifications.show({
                    title: `Image error !`,
                    message: `Your image does not match the authorised types ("png, jpeg, jpg, webp)`,
                    autoClose: true,
                    color: 'red',
                    radius: "lg",
                    icon: xIcon
                })
                return
            }

            if(file.size > maxSize) {
                notifications.show({
                    title: `Image error !`,
                    message: `Max image size ${bytesToMB(maxSize)}, Your image : ${bytesToMB(file.size)}`,
                    autoClose: true,
                    color: 'red',
                    radius: "lg",
                    icon: xIcon
                })
                return
            }

            const fileB64 = await toBase64(file)
            dispatch(setBackground(fileB64))
        }
    }, [dispatch])

    return (
        <Stack align="stretch" justify="flex-start" gap="xs">
            <Text size="md" mt="0" fw={500}>Background image</Text>
            <FileInput
                accept={"image/png,image/jpeg,image/jpg,image/webp"}
                leftSection={icon}
                description={"png, jpeg, jpg, webp"}
                placeholder={"Change image background"}
                leftSectionPointerEvents="none"
                onChange={handleChange}
            />
        </Stack>
    )
}