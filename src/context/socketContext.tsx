import {useContext, createContext, useState, useEffect} from "react";
import {io, Socket} from "socket.io-client";

import {currentTimeReadable} from "@pierogi.dev/readable_time";

import type {
    blockData,
    blockDataArray,
    netStats,
    netStatsArray,
    responseBlockList,
    responseBlockListPageByBlockNumber
} from "../types/chartDataType";

const SocketContext = createContext<any>({});

const SocketProvider = (props: any) => {

    const [socket, _] = useState<Socket>(() => io('https://ethsocketserver.net'));
    const [minutelyNetStats, setMinutelyNetStats] = useState<netStatsArray>([]);
    const [hourlyNetStats, setHourlyNetStats] = useState<netStatsArray>([]);
    const [dailyNetStats, setDailyNetStats] = useState<netStatsArray>([]);
    const [weeklyNetStats, setWeeklyNetStats] = useState<netStatsArray>([]);
    const [blockData, setBlockData] = useState<blockDataArray>([]);
    const [responseBlockList, setResponseBlockList] = useState<responseBlockList>();
    const [blockListCurrentPage, setBlockListCurrentPage] = useState<number>(0);
    const [blockListTotalPage, setBlockListTotalPage] = useState<number>(0);

    useEffect(() => {
        // console.log('useEffect inside context');

        if (minutelyNetStats.length === 0) {
            socket.emit('requestInitialMinutelyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialMinutelyNetStats' | To : ethChartServer`);
        }
        socket.on('initialMinutelyNetStatsToFrontend', (initialMinutelyNetStats: netStatsArray) => {
            if (initialMinutelyNetStats) {
                setMinutelyNetStats(initialMinutelyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialMinutelyNetStats' | From : ethChartServer`);
                // console.log(initialMinutelyNetStats);
            }
        });
        socket.on('newMinutelyNetStatsToFrontend', (newMinutelyNetStats: netStats) => {
            setMinutelyNetStats((prev: netStatsArray) => [...prev.slice(1), newMinutelyNetStats]);
            console.log(`${currentTimeReadable()} | Receive : 'newMinutelyNetStatsToFrontend | From : ethChartServer`);
            console.log(newMinutelyNetStats);
        });

        if (hourlyNetStats.length === 0) {
            socket.emit('requestInitialHourlyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialHourlyNetStats' | To : ethChartServer`);
        }
        socket.on('initialHourlyNetStatsToFrontend', (initialHourlyNetStats: netStatsArray) => {
            if (initialHourlyNetStats) {
                setHourlyNetStats(initialHourlyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialHourlyNetStatsToFrontend' | From : ethChartServer`);
                // console.log(initialHourlyNetStats);
            }
        });
        socket.on('newHourlyNetStatsToFrontend', (newHourlyNetStats: netStats) => {
            setHourlyNetStats((prev: netStatsArray) => [...prev.slice(1), newHourlyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : 'newHourlyNetStatsToFrontend' | From : ethChartServer`);
        });

        if (dailyNetStats.length === 0) {
            socket.emit('requestInitialDailyNetStats');
            // console.log(`${currentTimeReadable()} Emit : requestInitialDailyNetStats | To : ethChartServer`);
        }
        socket.on('initialDailyNetStatsToFrontend', (initialDailyNetStats: netStatsArray) => {
            if (initialDailyNetStats) {
                setDailyNetStats(initialDailyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : initialDailyNetStatsToFrontend | From : ethChartServer`);
            }
        });
        socket.on('newDailyNetStatsToFrontend', (newDailyNetStats: netStats) => {
            setDailyNetStats((prev: netStatsArray) => [...prev.slice(1), newDailyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : newDailyNetStatsToFrontend | From : ethChartServer`);
        });

        if (weeklyNetStats.length === 0) {
            socket.emit('requestInitialWeeklyNetStats');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialWeeklyNetStats | To : ethChartServer`);
        }
        socket.on('initialWeeklyNetStatsToFrontend', (initialWeeklyNetStats: netStatsArray) => {
            if (initialWeeklyNetStats) {
                setWeeklyNetStats(initialWeeklyNetStats);
                // console.log(`${currentTimeReadable()} | Receive : 'initialWeeklyNetStatsFrontend' | From : ethChartServer`);
            }
        });
        socket.on('newWeeklyNetStatsToFrontend', (newWeeklyNetStats: netStats) => {
            setWeeklyNetStats((prev: netStatsArray) => [...prev.slice(1), newWeeklyNetStats]);
            // console.log(`${currentTimeReadable()} | Receive : 'newWeeklyNetStatsToFrontend' | From : ethChartServer`);
        });

        if (blockData.length === 0) {
            socket.emit('requestInitialBlockData');
            // console.log(`${currentTimeReadable()} | Emit : 'requestInitialBlockData' | To : ethChartServer`);
        }
        socket.on('initialBlockDataToFrontend', (initialBlockData: blockDataArray) => {
            if (initialBlockData) {
                setBlockData(initialBlockData);
                // console.log(`${currentTimeReadable()} | Receive : 'initialBlockDataToFrontend' | From : ethChartServer`);
                // console.log(initialBlockData);
            }
        });
        socket.on('newBlockDataToFrontend', (newBlockData: blockData) => {
            setBlockData( (prev: blockDataArray) => [newBlockData, ...prev.slice(0, -1)]);
            // console.log(`${currentTimeReadable()} | Receive : 'newBlockDataToFrontend' | From : ethChartServer`);
        });
        socket.on('responseBlockList', (responseBlockList: responseBlockList) => {
            // console.log(responseBlockList);
            setBlockListCurrentPage(responseBlockList.currentPage);
            setBlockListTotalPage(responseBlockList.totalPage);
            setResponseBlockList(responseBlockList);
        });
        socket.on('responseBlockListPageByBlockNumber', (responseBlockListPageByBlockNumber: responseBlockListPageByBlockNumber) => {
            setBlockListCurrentPage(responseBlockListPageByBlockNumber.currentPage);
            setBlockListTotalPage(responseBlockListPageByBlockNumber.totalPage);
            setResponseBlockList(responseBlockListPageByBlockNumber);
        });

        return function cleanup() {
            socket.disconnect();
        }
    }, []);

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

const useSocket = () => useContext(SocketContext);

export {SocketProvider, useSocket}

