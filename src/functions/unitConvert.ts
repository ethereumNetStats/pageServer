// 引数dataの値をtypeに応じて小数点以下の桁数がdecimalsになるように単位付きで変換する
import type {convertedUnit} from "../types/chartDataType";

// 下記アルゴリズムの参考サイト
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

// 関数'unitConvertFunc'の宣言
export const unitConvertFunc = (data: number, decimals: number = 2, type: string): convertedUnit => {
    // データの種類が'difficulty'または'averageDifficulty'の時の処理
    if (type === "difficulty" || type === "averageDifficulty") {
        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        // 単位の変換
        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        // 戻り値として変換後の数値、単位、基数を設定
        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

        // データの種類が'gasUsed'、'averageGasUsed'、'averageBaseFeePerGas'の時の処理
    } else if (type === "gasUsed" || type === "averageGasUsed" || type === "averageBaseFeePerGas") {

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['wei', 'Kwei', 'Mwei', 'Gwei', 'Twei', 'Pwei', 'Ewei', 'Zwei', 'Ywei'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        // 単位の変換
        const value = parseFloat((data / Math.pow(k, i)).toFixed(dm));

        // 戻り値として変換後の数値、単位、基数を設定
        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

        // データの種類が'avgSize'、'averageBlockSize'、'totalBlockSize'の時の処理
    } else if (type === "avgSize" || type === "averageBlockSize" || type === "totalBlockSize") {
        // This code is copy of https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript.

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        // 単位の変換
        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        // 戻り値として変換後の数値、単位、基数を設定
        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

        // データの種類が'hashRate'の時の処理
    } else if (type === "hashRate") {

        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
        const i = Math.floor(Math.log(data) / Math.log(k));
        const base_number = Math.pow(k, i);

        // 単位の変換
        const value = data !== 0 ? parseFloat((data / Math.pow(k, i)).toFixed(dm)) : 0;

        // 戻り値として変換後の数値、単位、基数を設定
        return {
            value: value,
            unit: units[i],
            base_number: base_number,
        };

        // データの種類が'transactionsPerBlock'の時の処理
    } else if (type === "transactionsPerBlock") {
        const value = Number(Number(data).toFixed(2));

        // 戻り値として変換後の数値を設定
        return {
            value: value,
            unit: '',
            base_number: null,
        };

        // 単位が不要なデータ(blocks, transactions, numberOfAddress, totalTransactions)の時の処理
    } else if (type === "blocks" || type === 'transactions' || type === 'numberOfAddress' || 'totalTransactions') {
        // 数列をそのまま戻り値として設定
        return {
            value: data,
            unit: '',
            base_number: null,
        };

        // チャートのラベル用に表示するデータの単位を変換する処理
    } else if (type === 'label') {

        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const i = data !== 0 ? Math.floor(Math.log(data) / Math.log(k)) : 0;
        const base_number = Math.pow(k, i);

        // 単位の変換
        const value = parseFloat((data / Math.pow(k, i)).toFixed(dm));

        // 戻り値として変換後の数値、基数を設定
        return {
            value: value,
            unit: null,
            base_number: base_number,
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
