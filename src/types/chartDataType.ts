// データ名を型として定義
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

// 集計データの型定義
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

// アドレスのカウント数データの定義
type numberOfAddresses = {
    startTimeReadable: string,
    endTimeReadable: string,
    startTimeUnix: number,
    endTimeUnix: number,
    numberOfAddress: number,
    noRecordFlag: boolean,
};

// 集計データとアドレス数のカウントデータを合わせて改めて集計データとして定義
type netStats = basicNetStats & Pick<numberOfAddresses, "numberOfAddress">;

// 集計データを時系列で格納する配列の型定義
type netStatsArray = Array<netStats>;

// データベース'blockData'の型定義。'Block list'ページ、'Latest blocks'セクションの表示などで使用
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

// blockDataを時系列で格納するための配列の型定義
type blockDataArray = Array<blockData>;

// 集計データのプロパティ名を文字列型で定義
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

// 関数'fixUnitOfArray'の戻り値の型定義
type ValuesOfFixedUnit = {
    value: Array<number> | null;
    unit: string | null;
    base_number: number | null;
}

// ユーザーがブロックナンバーをクリックまたは入力した時のリクエストデータの型定義
type requestBlockDetail = {
    number: number,
    frontendId?: string,
}

// 'requestBlockDetail'に対する応答データの型定義
type responseBlockDetail = Pick<requestBlockDetail, "frontendId"> & blockData & {
    noRecord?: boolean,
};

// 'Block list'ページで使用するデータの型定義
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

// 'Block list'ページでユーザーがブロックナンバーを入力またはクリックした時のリクエストデータの型定義
type requestBlockListPageByBlockNumber = number;

// 'requestBlockListPageByBlockNumber'に対する応答データの型定義
type responseBlockListPageByBlockNumber = responseBlockList;

// 関数'unitConvert'の戻り値の型定義
type convertedUnit = {
    value: number | null;
    unit: string | null;
    base_number: number | null;
}

// transactionデータの型定義
type transactionDetail = {
    hash: string,
    nonce: number,
    blockHash: string | null,
    blockNumber: number | null,
    transactionIndex: number | null,
    from: string,
    to: string | null,
    input: string,
    value: string,
    gasPrice: string,
    gas: number,
    type?: number,
    v?: string,
    r?: string,
    s?: string,
    chainId?: string
}

// requestTransactionDetailのデータ型の定義
type requestTransactionDetail = {
    transactionHash: string,
    frontendId: string,
}

// responseTransactionDetailのデータ型の定義
type responseTransactionDetail = {
    transactionDetail: transactionDetail | null,
    requestedTransactionHash: string,
    frontendId: string,
    error: string,
}


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
    responseBlockList,
    requestBlockListPageByBlockNumber,
    responseBlockListPageByBlockNumber,
    convertedUnit,
    transactionDetail,
    responseTransactionDetail,
    requestTransactionDetail
}
