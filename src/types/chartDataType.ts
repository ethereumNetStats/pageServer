type dataName =
    'actual_end_time_unix'
    | 'actual_start_time_unix'
    | 'average_block_size'
    | 'average_difficulty'
    | 'blocks'
    | 'end_block_number'
    | 'end_time_unix'
    | 'hash_rate'
    | 'id'
    | 'start_block_number'
    | 'start_time_unix'
    | 'total_block_size'
    | 'total_difficulty'
    | 'transactions'
    | 'transactions_per_block'
    | string

type chartDataType = {
    [attr in dataName]: number;
};

type chartCardDataType = {
    dataName: dataName;
    unixTime: number;
    value: number;
}

type ethBasicNetStats = {
    'startTimeReadable': string,
    'endTimeReadable': string,
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
    'noRecordFlag': boolean,
    [key: string] : number | string | boolean,
};

type resOfEthBasicNetStatsDB = ethBasicNetStats & {
    id: number,
}

type ethBasicNetStatsArray = Array<ethBasicNetStats>;

type resOfEthBasicNetStatsDBArray = Array<resOfEthBasicNetStatsDB>;

export type { dataName, chartDataType, chartCardDataType, ethBasicNetStats, resOfEthBasicNetStatsDB, ethBasicNetStatsArray, resOfEthBasicNetStatsDBArray }
