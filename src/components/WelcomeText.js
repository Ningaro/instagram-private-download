// UI elems
import {
    Container,
    OrderedList,
    ListItem,
    Text,
    Divider,
    Stack,
    Tooltip,
    Button,
    Center,
    chakra,
    useColorMode
} from "@chakra-ui/react"

/**
 * First page with info about site
 * @returns {React}
 */
export default function WelcomeText({ changeStep }) {
    const { colorMode } = useColorMode()

    return (
        <Container h="100%">
            <Center h="100%">
                <Stack spacing={8}>
                    <Text>
                        На этом сайте вы можете бесплатно и <SaveTip><chakra.span as="u" color="blue.300">безопасно</chakra.span></SaveTip> скачать любую историю из социальной сети Instagram.
                        Фактически данный сайт является простым инстурментом, который выполняет ряд функций за вас.
                    </Text>
                    <Divider />
                    <Text>
                        Вот, что делает сайт наглядно:
                    </Text>
                    <Container>
                        <OrderedList>
                            <ListItem>Совершает запрос на сервер Instagram от вашего имени</ListItem>
                            <ListItem>Получает данные о всех последних историях конкретного аккаунта</ListItem>
                            <ListItem>Представляет полученную информацию в удобном виде</ListItem>
                        </OrderedList>
                    </Container>
                    <Center>
                        <Button
                            colorScheme={colorMode === 'dark' ? 'cyan' : 'teal'}
                            onClick={() => changeStep(1)}
                        >
                            Хорошо, давайте попробуем!
                        </Button>
                    </Center>
                </Stack>

            </Center>
        </Container>

    )
}

function SaveTip(props) {
    return (
        <Tooltip
            label="Мы не храним информацию о наших пользователях, а наш код открыт и вы можете ознакомиться c ним на Github"
            {...props}
        >
            {props.children}
        </Tooltip>
    )
}