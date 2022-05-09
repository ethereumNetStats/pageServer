import {VFC} from 'react';

import {MinutelyChart} from "./MinutelyChart";
import {HourlyChart} from "./HourlyChart";

type Props = {
    dataPeriod: string,
}

export const SelectChart: VFC<Props> = (props: Props) => {

    switch (props.dataPeriod) {
        case "minutely":
            return <MinutelyChart key={'MinutelyChart'}/>
        case "hourly":
            return <HourlyChart key={'HourlyChart'}/>
        default:
            return <HourlyChart key={'HourlyChart'}/>
    }
}
