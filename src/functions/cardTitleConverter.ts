// 引数として受け取ったデータ名がページ内に収まるように省略するための関数

export const cardTitleConverter = (baseTitle: string): string => {
    switch (baseTitle) {
        case "averageDifficulty":
            return "avgDiff";
        case "difficulty":
            return "diff";
        case "averageBlockSize":
            return "avgSize";
        case "totalBlockSize":
            return "totalSize";
        case "hashRate":
            return "hashRate";
        case "totalTransactions":
            return "txns";
        case "transactionsPerBlock":
            return "txns/block";
        case "numberOfAddress":
            return "newAddrs";
        case "averageGasUsed":
            return 'avgGasUsed';
        case "averageBaseFeePerGas":
            return 'avgBFPGas';
        default:
            return baseTitle
    }
}
