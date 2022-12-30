// チャートに表示する全ての数値の単位を統一するための関数
import type {ValuesOfFixedUnit} from "../types/chartDataType";

// 'fixUnitOfArray'関数の宣言
export const fixUnitOfArray = (data: Array<number>, decimals: number = 2, type: string): ValuesOfFixedUnit => {

    // 受け取った数値配列の中から最大値を抽出
    const maxValue = Math.max(...data);
    // 小数点以下の桁数を設定
    const dm = decimals < 0 ? 0 : decimals;
    // 単位を統一した後の数列を格納する配列の初期化
    let fixedValueArray: Array<number> = [];

    // 下記アルゴリズムの参考サイト
    // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

    // データの種類が'difficulty'または'averageDifficulty'の時の単位を統一
    if (type === "difficulty" || type === "averageDifficulty") {

        const k = 1000;
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);
        const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];

        data.forEach( (value) => {
            // 単位を統一後の数値を配列に格納
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        // 統一後の数列、単位、基数を戻り値にする
        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    // データの種類が'gasUsed'、'averageGasUsed'、'averageBaseFeePerGas'の時の単位を統一
    } else if (type === "gasUsed" || type === "averageGasUsed" || type === "averageBaseFeePerGas") {

        const k = 1024;
        const units = ['wei', 'Kwei', 'Mwei', 'Gwei', 'Twei', 'Pwei', 'Ewei', 'Zwei', 'Ywei'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            // 単位を統一後の数値を配列に格納
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        // 統一後の数列、単位、基数を戻り値にする
        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    // データの種類が'avgSize'、'averageBlockSize'、'totalBlockSize'の時の単位を統一
    } else if (type === "avgSize" || type === "averageBlockSize" || type === "totalBlockSize") {

        const k = 1024;
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            // 単位を統一後の数値を配列に格納
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        // 統一後の数列、単位、基数を戻り値にする
        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    // データの種類が'hashRate'の時の単位を統一
    } else if (type === "hashRate") {

        const k = 1000;
        const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
        const i = Math.floor(Math.log(maxValue) / Math.log(k));
        const base_number = Math.pow(k, i);

        data.forEach( (value) => {
            // 単位を統一後の数値を配列に格納
            fixedValueArray.push(value !== 0 ? parseFloat((value / Math.pow(k, i)).toFixed(dm)) : 0)
        });

        // 統一後の数列、単位、基数を戻り値にする
        return {
            value: fixedValueArray,
            unit: units[i],
            base_number: base_number,
        };

    // 単位が不要なデータ(blocks, transactions, numberOfAddress, totalTransactions)の時の処理
    } else if (type === "blocks" || type === 'transactions' || type === 'numberOfAddress' || type === 'totalTransactions') {
        // 数列をそのまま戻り値として設定
        return {
            value: data,
            unit: '',
            base_number: null,
        };

    // データの種類が'transactionsPerBlock'の時の単位を統一
    } else if (type === 'transactionsPerBlock') {
        // 単位を統一後の数値を配列に格納
        data.forEach( (value) => {
            fixedValueArray.push(Number(Number(value).toFixed(2)));
        });

        // 統一後の数列、単位、基数を戻り値にする
        return {
            value: fixedValueArray,
            unit: '',
            base_number: null,
        };

    // 未定義のデータの種類の場合は戻り値にnullを設定
    } else {
        return {
            value: null,
            unit: null,
            base_number: null
        }
    }
}
