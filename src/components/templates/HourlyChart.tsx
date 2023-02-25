// トップページで'daily'タブが選択された時にdailyのチャートを表示する
import {VStack} from "@chakra-ui/react";
import {HourlyChartCard} from "../molecules/HourlyChartCard";
import {memo, VFC} from "react";
import {useSocket} from "../../context/socketContext";
import {DataInfo} from "../molecules/DataInfo";
import {useDataName} from "../hooks/useDataName";

// 'HourlyChart'コンポーネントの宣言
export const HourlyChart: VFC = memo(() => {

        // useSocket Hooksから１時間ごとのデータを取得
        const {hourlyNetStats} = useSocket();

        // 表示するデータを設定
        const dataNames = useDataName();

        return (
            <>
                {/*'DataInfo'コンポーネントにデータレンジを渡す*/}
                <DataInfo dataDuration={'hourly'}/>
                <VStack align={'stretch'} spacing={15}>
                    {/*'HourlyChartCard'コンポーネントへデータの種類ごとにデータを渡す*/}
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
