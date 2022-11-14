import {Box, Flex, Spacer, Spinner, Text} from "@chakra-ui/react";
import {useSocket} from "../../context/socketContext";
import {unixTimeReadable} from "../../functions/unixTimeReadable";

type Props = {
    dataDuration: string,
}

export const DataInfo = (props: Props) => {

    const {minutelyNetStats, hourlyNetStats, dailyNetStats, weeklyNetStats} = useSocket();

    let lastDataTime: string = '';
    let dataRange: string = '';

    switch (props.dataDuration) {
        case 'minutely':
            if (minutelyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(minutelyNetStats[minutelyNetStats.length - 1].endTimeUnix * 1000);
            }
            dataRange = '60min';
            break;
        case 'hourly':
            if (hourlyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(hourlyNetStats[hourlyNetStats.length - 1].endTimeUnix * 1000);
            }
            dataRange = '24hrs';
            break;
        case 'daily':
            if (dailyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(dailyNetStats[dailyNetStats.length - 1].endTimeUnix * 1000);
            }
            dataRange = '7days';
            break;
        case 'weekly':
            if (weeklyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(weeklyNetStats[weeklyNetStats.length - 1].endTimeUnix * 1000);
            }
            dataRange = '24weeks';
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
