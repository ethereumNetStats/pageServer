import {Container, Heading, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import {MinutelyChart} from "../templates/MinutelyChart";
import {HourlyChart} from "../templates/HourlyChart";
import {DailyChart} from "../templates/DailyChart";
import {WeeklyChart} from "../templates/WeeklyChart";
import * as React from "react";
import {VFC} from "react";

export const Statistics: VFC = () => {
    return (
        <Container maxW={'container.xl'} w={'full'} mb={5}>
            <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]}>Statistics</Heading>
            <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Data duration</Text>
            {/*時間レンジのタブを表示*/}
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
                {/*クリックされたタブに応じて各時間レンジのチャートを表示*/}
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
    )
}
