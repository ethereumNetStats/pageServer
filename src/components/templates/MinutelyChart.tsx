import {VStack} from "@chakra-ui/react";
import {MinutelyChartCard} from "../organisms/MinutelyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

export const MinutelyChart: VFC = memo(() => {

        const {minutelyBasicData} = useSocket();

        const dataNames = ['blocks', 'averageDifficulty', 'hashRate', 'averageBlockSize', 'totalBlockSize', 'transactions', 'transactionsPerBlock'];
        return (
            <>
                <DataInfo dataDuration={'minutely'}/>
                <VStack align={'stretch'} spacing={15}>
                    {dataNames.map((name) => {
                        return (
                            <MinutelyChartCard key={'minutely' + name} dataName={name} minutelyBasicData={minutelyBasicData}/>
                        )
                    })}
                </VStack>
            </>
        )
    }
)
