type convertedUnit = {
    value: number | null;
    unit: string | null;
    base_number: number | null;
}
export const unitConvertFunc = (data: number, decimals: number = 2, type: string): convertedUnit => {
    // This code is clone from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

    if (type === "difficulty" || type === "averageDifficulty") {
        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "gasUsed" || type === "averageGasUsed" || type === "averageBaseFeePerGas") {
        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['GAS', 'KGAS', 'MGAS', 'GGAS', 'TGAS', 'PGAS', 'EGAS', 'ZGAS', 'YGAS'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        const value = parseFloat((data / Math.pow(k, i)).toFixed(dm));

        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "avgSize" || type === "averageBlockSize" || type === "totalBlockSize") {
        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "hashRate") {
        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };
    } else if (type === "transactionsPerBlock") {
        const value = Number(Number(data).toFixed(2));

        return {
            value: value,
            unit: '',
            base_number: null,
        };
    } else if (type === "blocks" || type === 'transactions' || type === 'numberOfAddress' || 'totalTransactions') {
        return {
            value: data,
            unit: '',
            base_number: null,
        };
    } else if (type === 'label') {
        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const i = data !== 0 ? Math.floor(Math.log(data) / Math.log(k)) : 0;
        const base_number = Math.pow(k, i);

        const value = parseFloat((data / Math.pow(k, i)).toFixed(dm));

        return {
            value: value,
            unit: null,
            base_number: base_number,
        };
    } else {
        return {
            value: null,
            unit: null,
            base_number: null
        }
    }
}
