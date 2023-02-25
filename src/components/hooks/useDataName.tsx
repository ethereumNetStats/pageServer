import {useState} from "react";

export const useDataName: () => Array<string> = (): Array<string> => {

    const [displayData] = useState<Array<string>>(
        ["blocks",
            "averageBlockSize",
            "totalBlockSize",
            "averageGasUsed",
            "averageBaseFeePerGas",
            "totalTransactions",
            "transactionsPerBlock"]
    );

    return displayData;

}
