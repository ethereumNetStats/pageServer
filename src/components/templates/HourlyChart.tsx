import {VStack} from "@chakra-ui/react";
import {HourlyChartCard} from "../organisms/HourlyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const HourlyChart: VFC = memo(() => {

        const {hourlyBasicData} = useSocket();

        const dataNames = ['blocks', 'averageDifficulty', 'hashRate', 'averageBlockSize', 'totalBlockSize', 'transactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'hourly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <HourlyChartCard key={'hourly' + name} dataName={name} hourlyBasicData={hourlyBasicData}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
