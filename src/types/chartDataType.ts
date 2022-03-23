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

export type { dataName, chartDataType, chartCardDataType }
