// UI elems
import {
    Heading,
    Flex,
    IconButton,
    useColorMode
} from "@chakra-ui/react"

// Icons
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md" my={4} mx={8} >Instagram private download</Heading>
            <IconButton
                my={4}
                mx={8}
                aria-label='Change site appereance'
                icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
            />
        </Flex>
    )
}