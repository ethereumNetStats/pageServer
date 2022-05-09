import {VFC} from "react";

import {
    Container,
    Flex,
    Heading,
    Image, Spacer,
    Tab,
    TabList, TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import {MinutelyChart} from "../templates/MinutelyChart";
import {HourlyChart} from "../templates/HourlyChart";
import {DailyChart} from "../templates/DailyChart";
import {WeeklyChart} from "../templates/WeeklyChart";


export const Home: VFC = () => {

    return (
        <>
            <Container maxW="container.xl" w="full" position={'sticky'} top={0} zIndex={100} mb={5}>
                <Flex align={'center'} bgColor={'black'} borderBottom={'solid'}>
                    <Image margin="5px" boxSize="60px" src="/LogoTwitter_circle.png"/>
                    <Heading as="h1" marginLeft="5px" mr="auto"
                             fontSize={{base: "1.5rem", sm: "1.2rem", md: "1.5rem", lg: "2rem"}}>ethereumChart</Heading>
                </Flex>
            </Container>
            <Container maxW={'container.xl'} w={'full'}>
                <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Data duration</Text>
                <Tabs variant={'soft-rounded'} colorScheme={'whiteAlpha'} defaultIndex={1} isFitted>
                        <TabList>
                            <Tab _focus={{boxShadow: "none"}} _selected={{color: "white"}}
                                 fontSize={["0.6rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>minutely</Tab>
                            <Spacer/>
                            <Tab _focus={{boxShadow: "none"}} _selected={{color: "white"}}
                                 fontSize={["0.6rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>hourly</Tab>
                            <Spacer/>
                            <Tab _focus={{boxShadow: "none"}} _selected={{color: "white"}}
                                 fontSize={["0.6rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>daily</Tab>
                            <Spacer/>
                            <Tab _focus={{boxShadow: "none"}} _selected={{color: "white"}}
                                 fontSize={["0.6rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>weekly</Tab>
                        </TabList>
                    <TabPanels>
                        <TabPanel padding={0}>
                            <MinutelyChart key={'MinutelyChart'}/>
                        </TabPanel>
                        <TabPanel padding={0}>
                            <HourlyChart key={'HourlyChart'}/>
                        </TabPanel>
                        <TabPanel padding={0}>
                            <DailyChart key={'DailyChart'}/>
                        </TabPanel>
                        <TabPanel padding={0}>
                            <WeeklyChart key={'WeeklyChart'}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </>

    )
}
