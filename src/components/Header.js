// UI elems
import {
    Heading,
    Flex,
    HStack,
    IconButton,
    useColorMode,
} from "@chakra-ui/react"

// Icons
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md" my={4} mx={8} >Instagram private download</Heading>
            <HStack
                my={4}
                mx={8}
                spacing={4}
            >
                <IconButton
                    aria-label='Link to Github'
                    icon={<FaGithub />}
                    as="a"
                    href="https://github.com/Ningaro/instagram-private-download"
                    target="_blank"
                />
                <IconButton
                    aria-label='Change site appereance'
                    icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                />
            </HStack>
        </Flex>
    )
}