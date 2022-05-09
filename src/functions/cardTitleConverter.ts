export const cardTitleConverter = (baseTitle: string): string => {
    switch (baseTitle) {
        case "averageDifficulty":
            return "avgDiff"
        case "difficulty":
            return "diff"
        case "averageBlockSize":
            return "avgSize"
        case "totalBlockSize":
            return "totalSize"
        case "hashRate":
            return "hashRate"
        case "transactions":
            return "txns"
        case "transactionsPerBlock":
            return "txns/block"
        default:
            return baseTitle
    }
}
