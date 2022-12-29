import {VStack} from "@chakra-ui/react";
import {memo, VFC} from "react";

import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";
import {MinutelyChartCard} from "../molecules/MinutelyChartCard";

export const MinutelyChart: VFC = memo(() => {

        const {minutelyNetStats} = useSocket();

        const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas','totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'minutely'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <MinutelyChartCard key={'minutely' + name} dataName={name} minutelyNetStats={minutelyNetStats}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
