import {VStack} from "@chakra-ui/react";
import {WeeklyChartCard} from "../organisms/WeeklyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const WeeklyChart: VFC = memo(() => {

        const {weeklyBasicData} = useSocket();

        const dataNames = ['blocks', 'averageDifficulty', 'hashRate', 'averageBlockSize', 'totalBlockSize', 'transactions', 'transactionsPerBlock'];

        return (
            <>
                <DataInfo dataDuration={'weekly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <WeeklyChartCard key={'weekly' + name} dataName={name} weeklyBasicData={weeklyBasicData}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
