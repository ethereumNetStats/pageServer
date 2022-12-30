// MinutelyChart.tsxからデータ名と集計データを受け取って、データ名とチャートを対応させて表示する
import {VFC, memo} from "react";
import {Heading, Flex, Spacer, Text, Box, Spinner} from "@chakra-ui/react";
import {Chart as ChartJS, registerables} from 'chart.js';
import {Line} from "react-chartjs-2";

import {unitConvertFunc} from "../../functions/unitConvert";
import {cardTitleConverter} from "../../functions/cardTitleConverter";
import {fixUnitOfArray} from "../../functions/fixUnitOfArray";

import type {netStatsArray, netStatsString, ValuesOfFixedUnit} from "../../types/chartDataType";

// コンポーネントが受け取るPropsの型定義
type Props = {
    dataName: string,
    minutelyNetStats: netStatsArray,
};

// react-chartjs-2用の登録
ChartJS.register(...registerables);

// コンポーネント'MinutelyChartCard'の定義
export const MinutelyChartCard: VFC<Props> = memo(({dataName, minutelyNetStats}) => {

        // チャートのラベル用の文字列（横軸の値）を格納する配列・変数の初期化
        let labels: Array<string> = [];
        let labelHour: string;
        let labelMinute: string;

        // チャートに表示する集計値（縦軸の値）を格納する配列の初期化
        let values: Array<number> = [];

        minutelyNetStats.forEach((obj: netStatsString) => {
            // Propsとして受け取った集計データの日時から月と日を抜き出す
            labelHour = new Date(new Date(obj.endTimeUnix * 1000).toUTCString()).getUTCHours().toString();
            labelMinute = '0' + new Date(new Date(obj.endTimeUnix * 1000).toUTCString()).getUTCMinutes().toString();

            // 抜き出した月と日のデータを整形して時系列順に配列に格納
            labels.push(labelHour + ':' + labelMinute.slice(-2));

            // Propsとして受け取った集計データから集計値を時系列順に格納
            values.push(Number(obj[dataName]));
        });

        // 集計値の単位を揃える
        let valuesOfFixedUnit: ValuesOfFixedUnit = fixUnitOfArray(values, 2, dataName);

        // チャート表示のラベル（横軸）と集計値（縦軸）をreact-chartjs-2に渡すデータとして設定
        let data = {
            labels: labels,
            datasets: [{
                lineTension: 0,
                fill: true,
                backgroundColor: 'rgb(255,255,255,0.5)',
                borderColor: 'rgb(255,255,255)',
                data: valuesOfFixedUnit.value,
            }],
        }

        // react-chartjs-2のオプション設定
        let options = {
            maintainAspectRatio: false,
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                        callback: (index: any) => {
                            return index % 10 === 0 ? labels[index] : null;
                        },
                    },
                    grid: {
                        borderColor: "white",
                        borderWidth: 2,
                        tickColor: "white",
                        color: "rgb(125, 125, 125)",
                    },
                },
                y: {
                    ticks: {
                        color: 'white',
                        maxTicksLimit: 3,
                    },
                    grid: {
                        borderColor: 'white',
                        borderWidth: 2,
                        tickColor: 'white',
                        color: "rgb(125, 125, 125)",
                    }
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            animation: {
                duration: 0,
            },
            pointRadius: 0,
            pointHitRadius: 3,
        }

        // 最新値として表示する集計値の単位と値を求める
        let lastNumber = unitConvertFunc(values[values.length - 1], 2, dataName);

        // Propsで受け取ったデータ名が表示領域に収まるように省略形に変換
        let cardTitle = cardTitleConverter(dataName);

        return (
            <>
                <Box>
                    <Flex marginBottom={0} align={'center'}>
                        <Heading as='h2'
                                 fontSize={["1.5rem", "3rem", "3rem", "6rem", "6rem"]}>{cardTitle}</Heading>
                        <Spacer/>
                        {/*最新値の表示*/}
                        {lastNumber.value ?
                            <Text
                                fontSize={["1.5rem", "3rem", "3rem", "6rem", "6rem"]}>{`${lastNumber.value}${lastNumber.unit}`}
                            </Text> : <Spinner size={'xl'}/>
                        }
                    </Flex>
                    {/*チャートの描画*/}
                    {
                        minutelyNetStats ?
                            (
                                <Box h={["150px", "200px", "300px", "300px", "300px"]} width={"100%"}>
                                    <Line data={data} options={options}/>
                                </Box>
                            ) : null
                    }
                </Box>
            </>
        )
    }
    , (prev, next) => {
        if (prev.minutelyNetStats.length !== 0) {
            return prev.minutelyNetStats[prev.minutelyNetStats.length - 1].endTimeUnix === next.minutelyNetStats[next.minutelyNetStats.length - 1].endTimeUnix
        } else {
            return false
        }
    });
