// トップページで'weekly'タブが選択された時にdailyのチャートを表示する
import {VStack} from "@chakra-ui/react";
import {WeeklyChartCard} from "../molecules/WeeklyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";

// 'WeeklyChart'コンポーネントの宣言
export const WeeklyChart: VFC = memo(() => {

        // useSocket Hooksから１週間ごとのデータを取得
        const {weeklyNetStats} = useSocket();

        // 表示するデータを設定
        const dataNames = ['blocks', 'averageBlockSize', 'totalBlockSize', 'averageGasUsed', 'averageBaseFeePerGas', 'totalTransactions', 'transactionsPerBlock'];
        return (
            <>
                {/*'DataInfo'コンポーネントにデータレンジを渡す*/}
                <DataInfo dataDuration={'weekly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {/*'WeeklyChartCard'コンポーネントへデータの種類ごとにデータを渡す*/}
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
