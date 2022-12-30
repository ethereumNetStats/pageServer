// トップページで'minutely'タブが選択された時にdailyのチャートを表示する
import {VStack} from "@chakra-ui/react";
import {memo, VFC} from "react";

import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";
import {MinutelyChartCard} from "../molecules/MinutelyChartCard";

// 'MinutelyChart'コンポーネントの宣言
export const MinutelyChart: VFC = memo(() => {

        // useSocket Hooksから１分ごとのデータを取得
        const {minutelyNetStats} = useSocket();

        // 表示するデータを設定
        const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas', 'totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                {/*'DataInfo'コンポーネントにデータレンジを渡す*/}
                <DataInfo dataDuration={'minutely'}/>
                <VStack align={'stretch'} spacing={15}>
                    {/*'MinutelyChartCard'コンポーネントへデータの種類ごとにデータを渡す*/}
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
