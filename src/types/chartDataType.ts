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
    | 'numberOfAddress'
    | string;

type basicNetStats = {
    "id"?: number,
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
    'blockSizePerBlock': number,
    'totalDifficulty': string,
    'averageDifficulty': string,
    'difficultyPerBlock': string,
    'totalUncleDifficulty': string,
    'averageUncleDifficulty': string,
    'uncleDifficultyPerBlock': string,
    'totalNumberOfUncleBlocks': number,
    'averageNumberOfUncleBlocks': number,
    'numberOfUncleBlocksPerBlock': number,
    'hashRate': number,
    'totalTransactions': number,
    'averageTransactions': number,
    'transactionsPerBlock': number,
    'totalBaseFeePerGas': number,
    'averageBaseFeePerGas': number,
    'baseFeePerGasPerBlock': number,
    'totalGasUsed': number,
    'averageGasUsed': number,
    'gasUsedPerBlock': number,
    'noRecordFlag'?: boolean,
    [key: string]: number | string | boolean | undefined,
};

type numberOfAddresses = {
    startTimeReadable: string,
    endTimeReadable: string,
    startTimeUnix: number,
    endTimeUnix: number,
    numberOfAddress: number,
    noRecordFlag: boolean,
};

type netStats = basicNetStats & Pick<numberOfAddresses, "numberOfAddress">;

type netStatsArray = Array<netStats>;

type blockData = {
    number: number,
    hash: string,
    parentHash: string,
    baseFeePerGas: number,
    nonce: string,
    sha3Uncles: string,
    logsBloom: string,
    transactionsRoot: string,
    miner: string,
    difficulty: string,
    totalDifficulty: string,
    extraData: string,
    size: number,
    gasLimit: number,
    gasUsed: number,
    timestamp: number,
    transactions: string,
    uncles: string,
    mixHash: string,
    receiptsRoot: string,
    stateRoot: string,
    timestampReadable?: string,
}

type blockDataArray = Array<blockData>;

type netStatsString = {
    "id"?: number,
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
    'blockSizePerBlock': number,
    'totalDifficulty': string,
    'averageDifficulty': string,
    'difficultyPerBlock': string,
    'totalUncleDifficulty': string,
    'averageUncleDifficulty': string,
    'uncleDifficultyPerBlock': string,
    'totalNumberOfUncleBlocks': number,
    'averageNumberOfUncleBlocks': number,
    'numberOfUncleBlocksPerBlock': number,
    'hashRate': number,
    'totalTransactions': number,
    'averageTransactions': number,
    'transactionsPerBlock': number,
    'totalBaseFeePerGas': number,
    'averageBaseFeePerGas': number,
    'baseFeePerGasPerBlock': number,
    'totalGasUsed': number,
    'averageGasUsed': number,
    'gasUsedPerBlock': number,
    'noRecordFlag'?: boolean,
    [key: string]: number | string | boolean | undefined,
};

type ValuesOfFixedUnit = {
    value: Array<number> | null;
    unit: string | null;
    base_number: number | null;
}

type requestBlockDetail = {
    number: number,
    frontendId?: string,
}

type responseBlockDetail = Pick<requestBlockDetail, "frontendId"> & blockData & {
    noRecord?: boolean,
};

type responseBlockList = {
    list: Array<blockData>,
    latestBlockNumber: number,
    totalPage: number,
    currentPage: number,
    topBlockNumber: number,
    lastBlockNumber: number,
    itemsPerPage: number,
    pageOffset: number,
    frontendId: string,
}

type requestBlockListPageByBlockNumber = number;

type blockList = Array<blockData> & {
    latestBlockNumber: number,
};

type responseBlockListPageByBlockNumber = responseBlockList;

export type {
    dataName,
    netStats,
    netStatsArray,
    netStatsString,
    ValuesOfFixedUnit,
    blockData,
    blockDataArray,
    requestBlockDetail,
    responseBlockDetail,
    blockList,
    responseBlockList,
    requestBlockListPageByBlockNumber,
    responseBlockListPageByBlockNumber
}
