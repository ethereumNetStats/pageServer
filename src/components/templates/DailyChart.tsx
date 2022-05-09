import {VStack} from "@chakra-ui/react";
import {DailyChartCard} from "../organisms/DailyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const DailyChart: VFC = memo(() => {

        const {dailyBasicData} = useSocket();

        const dataNames = ['blocks', 'averageDifficulty', 'hashRate', 'averageBlockSize', 'totalBlockSize', 'transactions', 'transactionsPerBlock'];

        return (
            <>
                <DataInfo dataDuration={'daily'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <DailyChartCard key={'daily' + name} dataName={name} dailyBasicData={dailyBasicData}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
