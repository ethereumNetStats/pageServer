import {useContext, createContext, useState, useEffect} from "react";
import {io, Socket} from "socket.io-client";

const SocketContext = createContext<any>({});

const SocketProvider = (props: any) => {

    const [socket, _] = useState<Socket>( () => io('http://18.212.221.241:80'));
    const [ chartCardData, setChartCardData ] = useState([]);

    useEffect( () => {
        return function cleanup() {
            socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, chartCardData, setChartCardData }} {...props} />
    );
}

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket }

