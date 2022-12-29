import {VStack} from "@chakra-ui/react";
import {HourlyChartCard} from "../molecules/HourlyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const HourlyChart: VFC = memo(() => {

        const {hourlyNetStats} = useSocket();

    const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas','totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'hourly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <HourlyChartCard key={'hourly' + name} dataName={name} hourlyNetStats={hourlyNetStats}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
