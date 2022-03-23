import {useEffect, VFC} from "react";
import {Heading} from "@chakra-ui/react";

import {useSocket} from "../../context/socketContext";
import {chartDataType, chartCardDataType} from "../../types/chartDataType";

const current_time_readable = () => {
    let date_obj = new Date();
    return `${date_obj.getUTCFullYear()}-${('0' + (date_obj.getUTCMonth() + 1)).slice(-2)}-${('0' + date_obj.getUTCDate()).slice(-2)} ${('0' + date_obj.getUTCHours()).slice(-2)}:${('0' + date_obj.getUTCMinutes()).slice(-2)}:${('0' + date_obj.getUTCSeconds()).slice(-2)}`;
};

type Props = {
    dataName: string;
};

export const ChartCard: VFC<Props> = (props) => {
    const {dataName} = props;
    const {socket, chartCardData, setChartCardData} = useSocket();

    useEffect(() => {
        socket.emit('request_initial_data');

        socket.on('initial_data_to_browser', ((data: Array<chartDataType>) => {
            let tempData: Array<chartCardDataType> = [];
            if (data) {
                data.forEach((obj: any) => {
                    tempData.push({
                        value: obj[dataName],
                        unixTime: obj['end_time_unix'],
                        dataName: dataName,
                    });
                });
            }
            setChartCardData(tempData);
        }));

        socket.on('test_emit_10s', ((data: chartDataType) => {
            let addData: chartCardDataType = {
                dataName: dataName,
                unixTime: data['end_time_unix'],
                value: data[dataName],
            }
            setChartCardData( (prev: Array<chartCardDataType>) => [...prev.slice(1), addData]);
        }));
    }, []);

    return (
        <>
            {
                chartCardData ? (chartCardData.map((data: chartCardDataType) => (
                    <Heading as="h1"
                             key={data.unixTime}>{`${current_time_readable()} | ${data.unixTime} | ${data.value}`}</Heading>
                ))) : null
            }
        </>
    )
}
