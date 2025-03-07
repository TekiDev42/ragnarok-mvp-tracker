import { useState } from "react"
import { ActionIcon, Input, Button, HoverCard, Flex } from "@mantine/core"
import { IconUserPlus } from "@tabler/icons-react"
import { useAppSelector } from "@store/Hooks"
import { supabase } from "@/supabase/supabase"

export const JoinPartyDropdown = () => {
    const [isLoading, setIsLoading] = useState(false)
    const userSession = useAppSelector((state) => state.userSlice.userSession)
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

        if (error) {
            console.error("Error joining party", error)
        }

        if (data) {
            console.log("Data", data)
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
