import { useState } from "react"
import { Button, HoverCard, Flex } from "@mantine/core"
import { IconUserPlus } from "@tabler/icons-react"
import { useAppSelector, useAppDispatch } from "@store/Hooks"
import { supabase } from "@/supabase/supabase"
import { notifications } from "@mantine/notifications"
import { z } from "zod"
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { setParty } from "@store/Slice/Party/PartySlice";

const schema = z.object({
    code: z.string().min(6, { message: 'Code must be at least 6 characters' }),
});


export const JoinPartyDropdown = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userSession = useAppSelector((state) => state.userSlice.userSession)
    const dispatch = useAppDispatch()


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { code: '' },
        validate: zodResolver(schema),
    });


    const handleJoinParty = async (values: typeof form.values) => {
        setIsLoading(true)

        if (!values.code) {
            setIsLoading(false)
            return
        }

        if (values.code.length <= 6) {
            setIsLoading(false)
            return
        }

        if (!userSession?.user.id) {
            setIsLoading(false)
            return
        }

        const { data, error }: { data: any, error: any } = await supabase.rpc('insert_party_member', {
            code: values.code,
            user_id: userSession.user.id
        })

        if (error || data.status === 401) {
            notifications.show({
                title: 'Error',
                message: error?.message || data.message,
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

            const { data: party_members } = await supabase.from('party_members').select('*').eq('party_id', data.party_id)
            const { data: party_leader } = await supabase.from('party').select('leader').eq('party_id', data.party_id).single()

            if (party_members && party_leader) {

                const { data: party_members_info } = await supabase
                    .from('user_profile')
                    .select('*')
                    .in('user_id', party_members?.map((member: any) => member.member_id) || [])

                dispatch(setParty({
                    party_id: data.party_id,
                    party_name: data.party_name,
                    party_members: party_members_info,
                    party_owner: party_members_info?.find((member: any) => member.id === party_leader.leader)?.pseudo,
                    party_owner_id: party_leader.leader
                }))
            }
        }

        setIsLoading(false)
    }


    return (
        <HoverCard width={320} shadow="md" withArrow>
            <HoverCard.Target>
                <Button
                    size="sm"
                    variant="gradient"
                    gradient={{ from: 'violet', to: 'cyan', deg: 200 }}
                    leftSection={<IconUserPlus stroke={1.5} />}
                >
                    Join a party
                </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Flex direction="column" gap={10}>
                    <form onSubmit={form.onSubmit(handleJoinParty)}>
                        <Flex direction="column" gap={10}>
                            <TextInput label="Code" placeholder="Code" {...form.getInputProps('code')} />
                        
                            <Button variant="gradient" gradient={{ from: 'violet', to: 'cyan', deg: 206 }} type="submit" loading={isLoading}>
                                {isLoading ? 'Joining...' : 'Join Party'}
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}
