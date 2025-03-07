import { useCallback, useState } from "react";
import { Modal, Text, Button, TextInput, PasswordInput, ActionIcon, Flex } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from 'mantine-form-zod-resolver';
import { supabase } from "@/supabase/supabase";


const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const SignInModal = () => {
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = useCallback(() => {
        setOpened(false);
    }, []);

    const handleOpen = useCallback(() => {
        setOpened(true);
    }, []);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },
        validate: zodResolver(schema),
    });

    const handleSubmit = useCallback(async (values: typeof form.values) => {
        setIsLoading(true);
        let { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })

        if (error) {
            console.log(error);
        }

        if (data) {
            console.log(data);
        }

        setIsLoading(false);
    }, []);

    return (
        <>
            <ActionIcon variant="gradient"
                        gradient={{from: 'violet', to: 'cyan', deg: 200}}
                        size="lg" radius="xl" aria-label="Notifications"
                        onClick={handleOpen}
            >
                <IconUserCircle style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>

            <Modal opened={opened} onClose={handleClose} centered withCloseButton={false} radius="lg">
                <Text>
                    <span className="text-2xl">Sign In</span>
                </Text>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex direction="column" gap={10}>
                        <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                        <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
                    
                        <Button variant="gradient" gradient={{ from: 'violet', to: 'cyan', deg: 206 }} type="submit" loading={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </>
    )
}
