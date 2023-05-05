// React
import { useEffect, useState } from "react"
// UI elems
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Center,
    Button,
    Stack,
    Divider,
    Flex,
    Text,
    useToast,
    useColorMode
} from "@chakra-ui/react"

// Web Requests
import axios from "axios"

export default function Forms({ saveData, changeStep }) {
    const { colorMode } = useColorMode()
    const toast = useToast()

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [form, setForm] = useState({ token: "", login: "", link: "" })

    // Event on form submiting
    const handleSubmit = e => {
        setIsSubmitLoading(true)
        // Ignore default event
        e.preventDefault()

        const login = form.login !== "" ? trimLogin(form.login) : trimLink(form.link)
        const token = form.token

        axios.post(`https://instagram-private-download.onrender.com/getUserStories`, { token, login })
            .then(res => saveData(res.data))
            .then(() => changeStep(2))
            .catch(e => {
                console.error(e.status)

                toast({
                    title: `Произошла ошибка, проверьте введеные данные!`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                })
            }).finally(() => setIsSubmitLoading(false))
    }

    // Event on field change
    const handleChange = e => {
        const key = e.target.id
        const value = e.target.value

        setForm(currentData => ({ ...currentData, [key]: value }))
    }

    // Undisabled submit button on fields non empty
    useEffect(() => {
        if (form.token !== "" && (form.login !== "" || form.link !== ""))
            setIsSubmitDisabled(false)
        else
            setIsSubmitDisabled(true)
    }, [form])

    return (
        <Container h="100%">
            <Center h="100%" flexDirection="column">
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Stack spacing={8} w="100%">

                        <FormControl>
                            <FormLabel htmlFor='token'>Session Token и DS User ID</FormLabel>
                            <Input
                                id='token'
                                type='text'
                                placeholder="ds_user_id=...; sessionid=..."
                                value={form.token}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='login'>Логин пользователя</FormLabel>
                            <Input
                                id='login'
                                type='text'
                                placeholder="@..."
                                value={form.login}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Flex alignItems="center">
                            <Divider />
                            <Text mx={4}>ИЛИ</Text>
                            <Divider />
                        </Flex>
                        <FormControl>
                            <FormLabel htmlFor='link'>Ссылка на любую последнюю историю</FormLabel>
                            <Input
                                id='link'
                                type='text'
                                placeholder="https://instagram.com/stories/..."
                                value={form.link}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Center>
                            <Button
                                colorScheme={colorMode === 'dark' ? 'cyan' : 'teal'}
                                type="submit"
                                disabled={isSubmitDisabled || isSubmitLoading}
                                isLoading={isSubmitLoading}
                            >
                                Найти!
                            </Button>
                        </Center>

                    </Stack>
                </form>
            </Center>
        </Container >
    )
}

/**
 * Trim link for getting login 
 * @param {String} url 
 * @returns {String} login
 */
function trimLink(url) {
    return url.substring(30, url.lastIndexOf('/'))
}

/**
 * Remove '@' from login
 * @param {String} login 
 * @returns {String} login
 */
function trimLogin(login) {
    return login.substring(login.indexOf('@') + 1)
}