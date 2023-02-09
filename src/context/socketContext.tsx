// サイトの使用中にバックグラウンドでソケット通信を行ってデータの送受信をするためのコンテキストオブジェクト
import {useContext, createContext, useState, useEffect} from "react";
import {io, Socket} from "socket.io-client";

import type {
    blockData,
    blockDataArray,
    netStats,
    netStatsArray,
    responseBlockList,
    responseBlockListPageByBlockNumber
} from "../types/chartDataType";

// コンテキストオブジェクトの生成
const SocketContext = createContext<any>({});

// SocketProviderの宣言
const SocketProvider = (props: any) => {

    // socket.io-clientオブジェクトをステート変数として格納
    const [socket, _] = useState<Socket>(() => io('https://ethsocketserver.net'));
    // １分ごとのデータをステート変数として格納
    const [minutelyNetStats, setMinutelyNetStats] = useState<netStatsArray>([]);
    // １時間ごとのデータをステート変数として格納
    const [hourlyNetStats, setHourlyNetStats] = useState<netStatsArray>([]);
    // １日ごとのデータをステート変数として格納
    const [dailyNetStats, setDailyNetStats] = useState<netStatsArray>([]);
    // １週間ごとのデータをステート変数として格納
    const [weeklyNetStats, setWeeklyNetStats] = useState<netStatsArray>([]);
    // 'Latest block'セクションで使用するデータをステート変数として格納
    const [blockData, setBlockData] = useState<blockDataArray>([]);
    // 'Block list'ページで表示するデータをステート変数として格納
    const [responseBlockList, setResponseBlockList] = useState<responseBlockList>();
    // 'Block list'ページで表示中のページをステート変数として格納
    const [blockListCurrentPage, setBlockListCurrentPage] = useState<number>(0);
    // 'Block list'ページのトータルページ数をステート変数として格納
    const [blockListTotalPage, setBlockListTotalPage] = useState<number>(0);

    useEffect(() => {
        // １分ごとの集計データがない場合はリクエスト
        if (minutelyNetStats.length === 0) {
            socket.emit('requestInitialMinutelyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialMinutelyNetStats' | To : ethChartServer`);
        }

        // １分ごとの集計データの初期データを受け取った時の処理
        socket.on('initialMinutelyNetStatsToFrontend', (initialMinutelyNetStats: netStatsArray) => {
            // 受け取ったデータが空(null, undefined)でない場合に処理を進める
            if (initialMinutelyNetStats) {
                // 受け取ったデータをステートとしてセット
                setMinutelyNetStats(initialMinutelyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialMinutelyNetStats' | From : ethChartServer`);
                // console.log(initialMinutelyNetStats);
            }
        });

        // 新しい１分集計データを受け取った時の処理
        socket.on('newMinutelyNetStatsToFrontend', (newMinutelyNetStats: netStats) => {
            // すでに保持しているデータの古いデータを一つ削除し、新しいデータを追加してステートを更新
            setMinutelyNetStats((prev: netStatsArray) => [...prev.slice(1), newMinutelyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : 'newMinutelyNetStatsToFrontend | From : ethChartServer`);
            // console.log(newMinutelyNetStats);
        });

        // １時間ごとのデータがない場合はリクエスト
        if (hourlyNetStats.length === 0) {
            socket.emit('requestInitialHourlyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialHourlyNetStats' | To : ethChartServer`);
        }

        // １時間ごとの集計データの初期データを受け取った時の処理
        socket.on('initialHourlyNetStatsToFrontend', (initialHourlyNetStats: netStatsArray) => {
            // 受け取ったデータが空(null, undefined)でない場合に処理を進める
            if (initialHourlyNetStats) {
                // 受け取ったデータをステートとしてセット
                setHourlyNetStats(initialHourlyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialHourlyNetStatsToFrontend' | From : ethChartServer`);
                // console.log(initialHourlyNetStats);
            }
        });

        // 新しい１時間集計データを受け取った時の処理
        socket.on('newHourlyNetStatsToFrontend', (newHourlyNetStats: netStats) => {
            // すでに保持しているデータの古いデータを１つ削除し、新しいデータを追加してステートを更新
            setHourlyNetStats((prev: netStatsArray) => [...prev.slice(1), newHourlyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : 'newHourlyNetStatsToFrontend' | From : ethChartServer`);
        });

        // １日ごとのデータがない場合はリクエスト
        if (dailyNetStats.length === 0) {
            socket.emit('requestInitialDailyNetStats');
            // console.log(`${currentTimeReadable()} Emit : requestInitialDailyNetStats | To : ethChartServer`);
        }

        // １日ごとの集計データの初期データを受け取った時の処理
        socket.on('initialDailyNetStatsToFrontend', (initialDailyNetStats: netStatsArray) => {
            // 受け取ったデータが空(null, undefined)でない場合に処理を進める
            if (initialDailyNetStats) {
                // 受け取ったデータをステートとしてセット
                setDailyNetStats(initialDailyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : initialDailyNetStatsToFrontend | From : ethChartServer`);
                // console.log(initialDailyNetStats);
            }
        });

        // 新しい１日集計データを受け取った時の処理
        socket.on('newDailyNetStatsToFrontend', (newDailyNetStats: netStats) => {
            // すでに保持しているデータの古いデータを１つ削除し、新しいデータを追加してステートを更新
            setDailyNetStats((prev: netStatsArray) => [...prev.slice(1), newDailyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : newDailyNetStatsToFrontend | From : ethChartServer`);
        });

        // １週間ごとのデータがない場合はリクエスト
        if (weeklyNetStats.length === 0) {
            socket.emit('requestInitialWeeklyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialWeeklyNetStats | To : ethChartServer`);
        }

        // １週間ごとの集計データの初期データを受け取った時の処理
        socket.on('initialWeeklyNetStatsToFrontend', (initialWeeklyNetStats: netStatsArray) => {
            // 受け取ったデータが空(null, undefined)でない場合に処理を進める
            if (initialWeeklyNetStats) {
                // 受け取ったデータをステートとしてセット
                setWeeklyNetStats(initialWeeklyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialWeeklyNetStatsFrontend' | From : ethChartServer`);
            }
        });

        // 新しい１週間集計データを受け取った時の処理
        socket.on('newWeeklyNetStatsToFrontend', (newWeeklyNetStats: netStats) => {
            // すでに保持しているデータの古いデータを１つ削除し、新しいデータを追加してステートを更新
            setWeeklyNetStats((prev: netStatsArray) => [...prev.slice(1), newWeeklyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : 'newWeeklyNetStatsToFrontend' | From : ethChartServer`);
        });

        // 'Latest block'セクション用のデータがない場合はリクエスト
        if (blockData.length === 0) {
            socket.emit('requestInitialBlockData');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialBlockData' | To : ethChartServer`);
        }

        // 'Latest block'セクション用の初期データを受け取った時の処理
        socket.on('initialBlockDataToFrontend', (initialBlockData: blockDataArray) => {
            // 受け取ったデータが空(null, undefined)でない場合に処理を進める
            if (initialBlockData) {
                // 受け取ったデータをステートとしてセット
                setBlockData(initialBlockData);
                // console.log(`${currentTimeReadable()} | Receive : 'initialBlockDataToFrontend' | From : ethChartServer`);
                // console.log(initialBlockData);
            }
        });

        // 'Latest block'セクション用の新しいブロックデータを受け取った時の処理
        socket.on('newBlockDataToFrontend', (newBlockData: blockData) => {
            // すでに保持しているデータの古いデータを１つ削除し、新しいデータを追加してステートを更新
            setBlockData( (prev: blockDataArray) => [newBlockData, ...prev.slice(0, -1)]);
            // console.log(`${currentTimeReadable()} | Receive : 'newBlockDataToFrontend' | From : ethChartServer`);
        });

        // ユーザーが'Block list'ページを要求した時の応答データを受信した時の処理
        socket.on('responseBlockList', (responseBlockList: responseBlockList) => {
            // console.log(responseBlockList);
            // ユーザーが表示中のページ番号をステートとして設定
            setBlockListCurrentPage(responseBlockList.currentPage);
            // トータルページ数をステートとして設定
            setBlockListTotalPage(responseBlockList.totalPage);
            // ページにテーブル形式で表示するデータをステートとして設定
            setResponseBlockList(responseBlockList);
        });

        // ユーザーが'Block list'ページでページ番号をクリック、または入力フォームに入力した時の応答データを受信した時の処理
        socket.on('responseBlockListPageByBlockNumber', (responseBlockListPageByBlockNumber: responseBlockListPageByBlockNumber) => {
            // ユーザーが表示中のページ番号をステートとして設定
            setBlockListCurrentPage(responseBlockListPageByBlockNumber.currentPage);
            // トータルページ数をステートとして設定
            setBlockListTotalPage(responseBlockListPageByBlockNumber.totalPage);
            // ページにテーブル形式で表示するデータをステートとして設定
            setResponseBlockList(responseBlockListPageByBlockNumber);
        });

        // ユーザーがサイトを離れた時にソケット通信を切断
        return function cleanup() {
            socket.disconnect();
        }
    }, []);

    // このHooksから提供するステート、セットステート関数の定義
    return (
        <>
            <SocketContext.Provider value={{
                socket,
                minutelyNetStats,
                setMinutelyNetStats,
                hourlyNetStats,
                setHourlyNetStats,
                dailyNetStats,
                setDailyNetStats,
                weeklyNetStats,
                setWeeklyNetStats,
                blockData,
                setBlockData,
                responseBlockList,
                setResponseBlockList,
                blockListCurrentPage,
                setBlockListCurrentPage,
                blockListTotalPage,
                setBlockListTotalPage,
            }} {...props} />
        </>
    );
}

// Hooksの宣言
const useSocket = () => useContext(SocketContext);

export {SocketProvider, useSocket}

