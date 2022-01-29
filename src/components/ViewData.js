// UI elems
import {
    Container,
    Flex,
    Heading,
    Text,
    Divider,
    Button,
    Center,
    Stack,
    IconButton,
    Icon,
    HStack,
    useColorMode
} from "@chakra-ui/react"

// Icons
import { CheckIcon, NotAllowedIcon, DownloadIcon } from "@chakra-ui/icons"
import { MdOutlinePhotoCameraBack, MdOutlineMovieFilter } from 'react-icons/md'

export default function ViewData({ data, changeStep }) {
    const { colorMode } = useColorMode()

    const isPrivate = data.reels_media[0].user.is_private
    const isVerified = data.reels_media[0].user.is_verified
    const fullName = data.reels_media[0].user.full_name
    const username = data.reels_media[0].user.username
    const storiesCount = data.reels_media[0].items.length
    const stories = data.reels_media[0].items
    const lastStory = getAge(data.reels_media[0].latest_reel_media)

    return (
        <Container>
            <Stack direction="column" spacing={8}>
                <Heading textAlign="center" size="md">@{username} ({fullName})</Heading>
                <Flex justifyContent="space-around">
                    <Text>Всего историй: {storiesCount}</Text>
                    <Text>Последняя история: {lastStory}</Text>
                </Flex>
                <Flex justifyContent="space-around">
                    <Text>Есть галочка? {isVerified ? <CheckIcon color="green.500" /> : <NotAllowedIcon color="red.500" />}</Text>
                    <Text>Приватный профиль? {isPrivate ? <CheckIcon color="green.500" /> : <NotAllowedIcon color="red.500" />}</Text>
                </Flex>
                <Center>
                    <Button
                        colorScheme={colorMode === 'dark' ? 'cyan' : 'teal'}
                        onClick={() => changeStep(1)}
                    >
                        Искать еще!
                    </Button>
                </Center>
                <Divider />
                <Stack>
                    {
                        stories.map((storie, i) => {
                            const isVideo = storie.media_type === 2
                            const upload = storie.taken_at
                            const w = storie.original_width
                            const h = storie.original_height
                            const duration = storie.video_duration

                            return (
                                <Flex
                                    px={4}
                                    py={4}
                                    key={i}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    border="1px"
                                    borderRadius="md"
                                    borderColor={colorMode === 'light' ? 'gray.200' : 'whiteAlpha.300'}
                                >
                                    <HStack spacing={2} wrap="wrap">
                                        <Text>Тип:</Text>
                                        {isVideo ? <Icon as={MdOutlineMovieFilter} /> : <Icon as={MdOutlinePhotoCameraBack} />}
                                        <Text>Загружено:</Text>
                                        <Text>{getAge(upload)}</Text>
                                        {
                                            isVideo
                                                ? <>
                                                    <Text>Продолжительность:</Text>
                                                    <Text>{Math.round(duration * 10) / 10} s</Text>
                                                </>
                                                : <>
                                                    <Text>Размер:</Text>
                                                    <Text>{w}px x {h}px</Text>
                                                </>
                                        }

                                    </HStack>
                                    <IconButton
                                        aria-label='Download content'
                                        icon={<DownloadIcon />}
                                        as="a"
                                        target="_blank"
                                        href={isVideo ? storie.video_versions[0].url : storie.image_versions2.candidates[0].url}
                                    />

                                </Flex>
                            )
                        })
                    }
                </Stack>
            </Stack>
        </Container>
    )
}

function getAge(time) {
    const storieTime = new Date(time * 1000)
    const curTime = new Date()

    if ((curTime - storieTime) >= 3600000) {
        // hours
        return `${Math.ceil((curTime - storieTime) / 3600000)} h`
    } else if ((curTime - storieTime) >= 60000) {
        // minutes
        return `${Math.ceil((curTime - storieTime) / 60000)} min`
    } else {
        // seconds
        return `${Math.ceil((curTime - storieTime) / 1000)} sec`
    }

}