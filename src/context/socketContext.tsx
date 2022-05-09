import {useContext, createContext, useState, useEffect} from "react";
import {io, Socket} from "socket.io-client";

type recordOfEthDB = {
    'id'?: number,
    'startTimeReadable'?: string,
    'endTimeReadable'?: string,
    'startTimeUnix': number,
    'endTimeUnix': number,
    'actualStartTimeUnix': number,
    'actualEndTimeUnix': number,
    'startBlockNumber': number,
    'endBlockNumber': number,
    'blocks': number,
    'totalBlockSize': number,
    'averageBlockSize': number,
    'totalDifficulty': number,
    'averageDifficulty': number,
    'totalUncleDifficulty': number,
    'hashRate': number,
    'transactions': number,
    'transactionsPerBlock': number,
    'noRecordFlag'?: boolean,
    [key: string]: number | string | boolean | undefined,
};

type recordOfEthDBArray = Array<recordOfEthDB>;

const SocketContext = createContext<any>({});

const SocketProvider = (props: any) => {

    const [socket, _] = useState<Socket>(() => io('https://ethsocketserver.net'));
    const [minutelyBasicData, setMinutelyBasicData] = useState<recordOfEthDBArray>([]);
    const [hourlyBasicData, setHourlyBasicData] = useState<recordOfEthDBArray>([]);
    const [dailyBasicData, setDailyBasicData] = useState<recordOfEthDBArray>([]);
    const [weeklyBasicData, setWeeklyBasicData] = useState<recordOfEthDBArray>([]);

    useEffect(() => {
        console.log('useEffect inside context');

        if (minutelyBasicData.length === 0) {
            socket.emit('requestMinutelyInitialBasicData');
            console.log('Emit the requestMinutelyInitialBasicData event.');
        }
        socket.on('minutelyInitialBasicDataToFrontend', ((minutelyInitialBasicData: recordOfEthDBArray) => {
            if (minutelyInitialBasicData) {
                setMinutelyBasicData(minutelyInitialBasicData);
                console.log('Receive the minutelyInitialBasicDataToFrontend event.');
            }
        }));
        socket.on('minutelyBasicNewDataToFrontend', (minutelyBasicNewData: recordOfEthDB) => {
            setMinutelyBasicData((prev: recordOfEthDBArray) => [...prev.slice(1), minutelyBasicNewData]);
            console.log('Receive the minutelyBasicNewDataToFrontend event.');
        });

        if (hourlyBasicData.length === 0) {
            socket.emit('requestHourlyInitialBasicData');
            console.log('Emit the requestHourlyInitialBasicData event.');
        }
        socket.on('hourlyInitialBasicDataToFrontend', ((hourlyInitialBasicData: recordOfEthDBArray) => {
            if (hourlyInitialBasicData) {
                setHourlyBasicData(hourlyInitialBasicData);
                console.log('Receive the hourlyInitialBasicDataToFrontend event.');
            }
        }));
        socket.on('hourlyBasicNewDataToFrontend', (hourlyBasicNewData: recordOfEthDB) => {
            setHourlyBasicData((prev: recordOfEthDBArray) => [...prev.slice(1), hourlyBasicNewData]);
            console.log('Receive the hourlyBasicNewDataToFrontend event.');
        });

        if (dailyBasicData.length === 0) {
            socket.emit('requestDailyInitialBasicData');
            console.log('Emit the requestDailyInitialBasicData event.');
        }
        socket.on('dailyInitialBasicDataToFrontend', ((dailyInitialBasicData: recordOfEthDBArray) => {
            if (dailyInitialBasicData) {
                setDailyBasicData(dailyInitialBasicData);
                console.log('Receive the dailyInitialBasicDataToFrontend event.');
            }
        }));
        socket.on('dailyBasicNewDataToFrontend', (dailyBasicNewData: recordOfEthDB) => {
            setDailyBasicData((prev: recordOfEthDBArray) => [...prev.slice(1), dailyBasicNewData]);
            console.log('Receive the dailyBasicNewDataToFrontend event.');
        });

        if (weeklyBasicData.length === 0) {
            socket.emit('requestWeeklyInitialBasicData');
            console.log('Emit the requestWeeklyInitialBasicData event.');
        }
        socket.on('weeklyInitialBasicDataToFrontend', ((weeklyInitialBasicData: recordOfEthDBArray) => {
            if (weeklyInitialBasicData) {
                setWeeklyBasicData(weeklyInitialBasicData);
                console.log('Receive the weeklyInitialBasicDataToFrontend event.');
            }
        }));
        socket.on('weeklyBasicNewDataToFrontend', (weeklyBasicNewData: recordOfEthDB) => {
            setWeeklyBasicData((prev: recordOfEthDBArray) => [...prev.slice(1), weeklyBasicNewData]);
            console.log('Receive the weeklyBasicNewDataToFrontend event.');
        });

        return function cleanup() {
            socket.disconnect();
        }
    }, []);

    return (
        <>
            <SocketContext.Provider value={{
                socket,
                minutelyBasicData,
                setMinutelyBasicData,
                hourlyBasicData,
                setHourlyBasicData,
                dailyBasicData,
                setDailyBasicData,
                weeklyBasicData,
                setWeeklyBasicData
            }} {...props} />
        </>
    );
}

const useSocket = () => useContext(SocketContext);

export {SocketProvider, useSocket}

