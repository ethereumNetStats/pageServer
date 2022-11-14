import type {ValuesOfFixedUnit} from "../types/chartDataType";

export const fixUnitOfArray = (data: Array<number>, decimals: number = 2, type: string): ValuesOfFixedUnit => {

    const maxValue = Math.max(...data);
    const dm = decimals < 0 ? 0 : decimals;
    let fixedValueArray: Array<number> = [];

    // This code is clone from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

    if (type === "difficulty" || type === "averageDifficulty") {

        const k = 1000;
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);
        const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];

        data.forEach( (value) => {
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "gasUsed") {

        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1024;
        const units = ['GAS', 'KGAS', 'MGAS', 'GGAS', 'TGAS', 'PGAS', 'EGAS', 'ZGAS', 'YGAS'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "avgSize" || type === "averageBlockSize" || type === "totalBlockSize") {

        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1024;
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    } else if (type === "hashRate") {

        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1000;
        const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };
    } else if (type === "blocks" || type === 'transactions' || type === 'numberOfAddress' || type === 'totalTransactions') {
        return {
            value: data,
            unit: '',
            base_number: null,
        };
    } else if (type === 'transactionsPerBlock') {

        data.forEach( (value) => {
            fixedValueArray.push(Number(Number(value).toFixed(2)));
        });

        return {
            value: fixedValueArray,
            unit: '',
            base_number: null,
        };
    } else {
        return {
            value: null,
            unit: null,
            base_number: null
        }
    }
}
