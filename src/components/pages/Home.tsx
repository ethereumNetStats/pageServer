import {VFC} from "react";
import { Helmet } from "react-helmet";

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
    Box
} from "@chakra-ui/react";
import {TwitterTimelineEmbed} from "react-twitter-embed";

import {MinutelyChart} from "../templates/MinutelyChart";
import {HourlyChart} from "../templates/HourlyChart";
import {DailyChart} from "../templates/DailyChart";
import {WeeklyChart} from "../templates/WeeklyChart";
import * as React from "react";

export const Home: VFC = () => {

    return (
        <>
            <Helmet>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-SG0DB4P88H"></script>
                <script>
                    {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SG0DB4P88H', { send_page_view: true });
            `}
                </script>
            </Helmet>
            <Container maxW="container.xl" w="full" position={'sticky'} top={0} zIndex={100} mb={5}>
                <Flex align={'center'} bgColor={'black'} borderBottom={'solid'}>
                    <Image margin="5px" boxSize="60px" src="/LogoTwitter_circle.png"/>
                    <Heading as="h1" marginLeft="5px" mr="auto"
                             fontSize={{base: "1.5rem", sm: "1.2rem", md: "1.5rem", lg: "2rem"}}>ethereumNetStats</Heading>
                </Flex>
            </Container>
            <Container maxW={'container.xl'} w={'full'} mb={5}>
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
            <Container>
                <Box>
                    <TwitterTimelineEmbed options={{height: "100%"}} sourceType={"profile"}
                                          screenName={"Twe_ether"}
                                          theme={"dark"} tweetLimit={1}/>
                </Box>
            </Container>
        </>

    )
}
