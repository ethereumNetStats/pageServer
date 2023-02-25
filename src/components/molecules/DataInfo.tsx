// 集計レンジごとに表示される'Last data time'と'Data range'を表示するコンポーネント
import {Box, Flex, Spacer, Spinner, Text} from "@chakra-ui/react";
import {useSocket} from "../../context/socketContext";
import {unixTimeReadable} from "@ethereum_net_stats/readable_time";

// Propsの型定義
type Props = {
    dataDuration: string,
}
// DataInfoコンポーネントの宣言
export const DataInfo = (props: Props) => {

    // Reactコンテクストを使ったHooksから値を受け取る
    const {minutelyNetStats, hourlyNetStats, dailyNetStats, weeklyNetStats} = useSocket();

    // 最新の日時を格納する変数の初期化
    let lastDataTime: string = '';

    // 集計レンジを格納する変数の初期化
    let dataRange: string = '';

    // Propsとして受け取った集計期間に応じて集計レンジを示す文字列を決定
    // Propsとして受け取った集計データの最新日時のunixタイムをフォーマットして格納
    switch (props.dataDuration) {
        case 'minutely':
            if (minutelyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(minutelyNetStats[minutelyNetStats.length - 1].endTimeUnix);
            }
            dataRange = '60min';
            break;
        case 'hourly':
            if (hourlyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(hourlyNetStats[hourlyNetStats.length - 1].endTimeUnix);
            }
            dataRange = '24hrs';
            break;
        case 'daily':
            if (dailyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(dailyNetStats[dailyNetStats.length - 1].endTimeUnix);
            }
            dataRange = '7days';
            break;
        case 'weekly':
            if (weeklyNetStats.length !== 0) {
                lastDataTime = unixTimeReadable(weeklyNetStats[weeklyNetStats.length - 1].endTimeUnix);
            }
            dataRange = '24weeks';
            break;
        default :
            lastDataTime = '';
            dataRange = '24hr';
    }

    return (
        <Box>
            <Flex align={'center'}>
                <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Date time(UTC)</Text>
                <Spacer/>
                {/*最新データの日時表示*/}
                {lastDataTime ?
                    (
                        <Text
                            fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>{lastDataTime}</Text>
                    )
                    : <Spinner size={'xl'}/>}
            </Flex>
            <Flex>
                <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>Data range</Text>
                <Spacer/>
                {/*集計期間の表示*/}
                <Text fontSize={["1rem", "1.2rem", "1.5rem", "3rem", "3rem"]}>{dataRange}</Text>
            </Flex>
        </Box>
    )
}
