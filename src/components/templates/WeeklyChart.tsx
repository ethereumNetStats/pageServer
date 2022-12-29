import {VStack} from "@chakra-ui/react";
import {WeeklyChartCard} from "../molecules/WeeklyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const WeeklyChart: VFC = memo(() => {

        const {weeklyNetStats} = useSocket();

    const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas','totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'weekly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <WeeklyChartCard key={'weekly' + name} dataName={name} weeklyNetStats={weeklyNetStats}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
