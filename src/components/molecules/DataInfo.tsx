import {Box, Flex, Spacer, Spinner, Text} from "@chakra-ui/react";
import {useSocket} from "../../context/socketContext";
import {unixTimeReadable} from "../../functions/unixTimeReadable";

type Props = {
    dataDuration: string,
}

export const DataInfo = (props: Props) => {

    const {minutelyBasicData, hourlyBasicData, dailyBasicData, weeklyBasicData} = useSocket();

    let lastDataTime: string = '';
    let dataRange: string = '';

    switch (props.dataDuration) {
        case 'minutely':
            if (minutelyBasicData.length !== 0) {
                lastDataTime = unixTimeReadable(minutelyBasicData[minutelyBasicData.length - 1].endTimeUnix * 1000);
            }
            dataRange = '60min';
            break;
        case 'hourly':
            if (hourlyBasicData.length !== 0) {
                lastDataTime = unixTimeReadable(hourlyBasicData[hourlyBasicData.length - 1].endTimeUnix * 1000);
            }
            dataRange = '24hrs';
            break;
        case 'daily':
            if (dailyBasicData.length !== 0) {
                lastDataTime = unixTimeReadable(dailyBasicData[dailyBasicData.length - 1].endTimeUnix * 1000);
            }
            dataRange = '7days';
            break;
        case 'weekly':
            if (weeklyBasicData.length !== 0) {
                lastDataTime = unixTimeReadable(weeklyBasicData[weeklyBasicData.length - 1].endTimeUnix * 1000);
            }
            dataRange = '12weeks';
            break;
        default :
            lastDataTime = '';
            dataRange = '24hr';
    }

    return (
        <>
            <Box>
                <Flex align={'center'}>
                    <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Last data time(UTC)</Text>
                    <Spacer/>
                    {lastDataTime ?
                        (
                            <Text
                                fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>{lastDataTime}</Text>
                        )
                        : <Spinner size={'xl'}/>}
                </Flex>
                <Flex>
                    <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Data range</Text>
                    <Spacer/>
                    <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>{dataRange}</Text>
                </Flex>
            </Box>
        </>
    )
}
