import {memo, VFC} from "react";
import { ChartCard } from "../organisms/ChartCard";

export const Home: VFC = memo(() => {
    return (
        <>
            <ChartCard dataName="hash_rate" />
        </>
    )
})
