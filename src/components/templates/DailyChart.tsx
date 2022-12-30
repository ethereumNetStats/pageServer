// トップページで'daily'タブが選択された時にdailyのチャートを表示する
import {VStack} from "@chakra-ui/react";
import {DailyChartCard} from "../molecules/DailyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

// 'DailyChart'コンポーネントの宣言
export const DailyChart: VFC = memo(() => {

        // useSocket Hooksから１日ごとのデータを取得
        const {dailyNetStats} = useSocket();

        // 表示するデータを設定
        const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas', 'totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                {/*'DataInfo'コンポーネントにデータレンジを渡す*/}
                <DataInfo dataDuration={'daily'}/>
                <VStack align={'stretch'} spacing={15}>
                    {/*'DailyChartCard'コンポーネントへデータの種類ごとにデータを渡す*/}
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
