import {VFC, memo} from "react";
import {Heading, Flex, Spacer, Text, Box, Spinner} from "@chakra-ui/react";
import {Chart as ChartJS, registerables} from 'chart.js';
import {Line} from "react-chartjs-2";

import {unitConvertFunc} from "../../functions/unitConvert";
import {cardTitleConverter} from "../../functions/cardTitleConverter";
import {fixUnitOfArray} from "../../functions/fixUnitOfArray";

type fixUnitOfArrayType = {
    value: Array<number> | null;
    unit: string | null;
    base_number: number | null;
}

type recordOfEthDB = {
    'id'?: number,
    'startTimeReadable'?: string,
    'endTimeReadable'?: string,
    'startTimeUnix': number,
    'endTimeUnix': number,
    'actualStartTimeUnix': number,
    'actualEndTimeUnix': number,
    'startBlockNumber': number,
    'endBlockNumber': number,
    'blocks': number,
    'totalBlockSize': number,
    'averageBlockSize': number,
    'totalDifficulty': number,
    'averageDifficulty': number,
    'totalUncleDifficulty': number,
    'hashRate': number,
    'transactions': number,
    'transactionsPerBlock': number,
    'noRecordFlag'?: boolean,
    [key: string]: number | string | boolean | undefined,
};

type recordOfEthDBArray = Array<recordOfEthDB>;

type Props = {
    dataName: string;
    hourlyBasicData: recordOfEthDBArray;
};

ChartJS.register(...registerables);

export const HourlyChartCard: VFC<Props> = memo(({dataName, hourlyBasicData}) => {

        let labels: Array<string> = [];
        let labelHour: string;
        let labelMinute: string;

        let values: Array<number> = [];

        hourlyBasicData.forEach((obj: recordOfEthDB) => {
            labelHour = new Date(new Date(obj.endTimeUnix * 1000).toUTCString()).getUTCHours().toString();
            labelMinute = '0' + new Date(new Date(obj.endTimeUnix * 1000).toUTCString()).getUTCMinutes().toString();
            labels.push(labelHour + ':' + labelMinute.slice(-2));
            values.push(obj[dataName] as number);
        });

        let unitFixedValue: fixUnitOfArrayType = fixUnitOfArray(values, 2, dataName);

        let data = {
            labels: labels,
            datasets: [{
                lineTension: 0,
                fill: true,
                backgroundColor: 'rgb(255,255,255,0.5)',
                borderColor: 'rgb(255,255,255)',
                data: unitFixedValue.value,
            }],
        }

        let options = {
            maintainAspectRatio: false,
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                        callback: (index: any) => {
                            return index % 6 === 0 ? labels[index] : null;
                        },
                    },
                    grid: {
                        borderColor: "white",
                        borderWidth: 2,
                        tickColor: "white",
                        color: "rgb(125, 125, 125)",
                    },
                },
                y: {
                    ticks: {
                        color: 'white',
                        maxTicksLimit: 3,
                    },
                    grid: {
                        borderColor: 'white',
                        borderWidth: 2,
                        tickColor: 'white',
                        color: "rgb(125, 125, 125)",
                    }
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            animation: {
                duration: 0,
            },
        }

        let lastNumber = unitConvertFunc(values[values.length - 1], 2, dataName);
        let cardTitle = cardTitleConverter(dataName);

        return (
            <>
                <Box>
                    <Flex marginBottom={0} align={'center'}>
                        <Heading as='h1'
                                 fontSize={["1.5rem", "3rem", "3rem", "6rem", "6rem"]}>{cardTitle}</Heading>
                        <Spacer/>
                        {lastNumber.value ?
                            <Text fontSize={["1.5rem", "3rem", "3rem", "6rem", "6rem"]}>{`${lastNumber.value}${lastNumber.unit}`}
                            </Text> : <Spinner size={'xl'}/>
                        }
                    </Flex>
                    {
                        hourlyBasicData ?
                            (
                                <Box h={["150px", "200px", "300px", "300px", "300px"]} width={"100%"}>
                                    <Line data={data} options={options}/>
                                </Box>
                            ) : null
                    }
                </Box>
            </>
        )
    }
    , (prev, next) => {
        if (prev.hourlyBasicData.length !== 0) {
            return prev.hourlyBasicData[prev.hourlyBasicData.length - 1].endTimeUnix === next.hourlyBasicData[next.hourlyBasicData.length - 1].endTimeUnix
        } else {
            return false
        }
    });
