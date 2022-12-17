import {VStack} from "@chakra-ui/react";
import {DailyChartCard} from "../organisms/DailyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const DailyChart: VFC = memo(() => {

        const {dailyNetStats} = useSocket();

    const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas','totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'daily'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <DailyChartCard key={'daily' + name} dataName={name} dailyNetStats={dailyNetStats}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
