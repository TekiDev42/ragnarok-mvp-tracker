import { useState } from "react"
import { ActionIcon, Input, Button, HoverCard, Flex } from "@mantine/core"
import { IconUserPlus } from "@tabler/icons-react"
import { useAppSelector, useAppDispatch } from "@store/Hooks"
import { supabase } from "@/supabase/supabase"
import { notifications } from "@mantine/notifications"
import { setPartyId } from "@store/Slice/User/UserSlice"

export const JoinPartyDropdown = () => {
    const [isLoading, setIsLoading] = useState(false)
    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const dispatch = useAppDispatch()
    const [code, setCode] = useState('')

    const handleJoinParty = async () => {
        setIsLoading(true)

        if (!code) {
            setIsLoading(false)
            return
        }

        if (code.length <= 6) {
            setIsLoading(false)
            return
        }

        const { data, error } = await supabase.rpc('insert_party_member', {
            code: code,
            user_id: userSession?.user.id
        })

        if (error || (data && data.status === 401)) {
            notifications.show({
                title: 'Error',
                message: error?.message || data?.message,
                autoClose: 5000,
                color: 'red',
                radius: "md",
                withBorder: false,
                style: {
                    backgroundColor: '#FFF1F0',
                    color: '#CF1322',
                    border: '1px solid #FFF1F0',
                }
            });
        }

        if (data && data.status === 200) {
            notifications.show({
                title: 'Success',
                message: 'You have successfully joined the party',
                autoClose: 5000,
                color: 'green',
                radius: "md",
                withBorder: false,
                style: {
                    backgroundColor: '#F0FFF0',
                    color: '#008000',
                    border: '1px solid #F0FFF0',
                }
            });

            dispatch(setPartyId(data.party_id))
        }

        setIsLoading(false)
    }


    return (
        <HoverCard width={320} shadow="md" withArrow>
            <HoverCard.Target>
                <ActionIcon variant="gradient"
                        gradient={{from: 'violet', to: 'cyan', deg: 200}}
                        size="lg" radius="xl" aria-label="Notifications"
                >
                    <IconUserPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Flex direction="column" gap={10}>
                    <Input placeholder="Party ID" value={code} onChange={(e) => {setCode(e.target.value)}} />
                    <Button variant="gradient" gradient={{ from: 'violet', to: 'cyan', deg: 206 }} loading={isLoading} onClick={handleJoinParty}>Join Party</Button>
                </Flex>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}
