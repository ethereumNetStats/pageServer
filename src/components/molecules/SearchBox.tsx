import {useRef, useState, VFC} from "react";
import {Center, Container, FormControl, FormErrorMessage, Input, Tooltip} from "@chakra-ui/react";
import * as React from "react";
import {useSocket} from "../../context/socketContext";
import {useNavigate} from "react-router-dom";
import {SafeParseReturnType, z} from "zod";

// バリデーションルールの定義。バリデーション成功時はtransformで入力データの種類を入力データに追加
const schema = z.union([
    // トランザクションハッシュのバリデーションルール
    z.string().regex(/^0x([A-Fa-f0-9]{64})$/).transform((val) => "transactionHash:" + val),
    // アドレスのバリデーションルール
    // z.string().regex(/^(0x)[0-9a-fA-F]{40}$/).transform((val) => "address:" + val),
    // ブロックナンバーのバリデーションルール
    z.string().regex(/^([1-9]\d*|0)$/).transform((val) => "blockNumber:" + val),
]);

type Schema = z.infer<typeof schema>;

export const SearchBox: VFC = () => {

    // useSocket Hooksの呼び出し
    const {blockData} = useSocket();

    // useNavigate Hooksの呼び出し
    const navigate = useNavigate();

    // 入力値のバリデーション結果を格納するステート変数
    const [isError, setIsError] = useState<boolean>(false);

    // 入力フォームでIME入力中か否かを判定するためのステート変数
    const [typing, setTyping] = useState<boolean>(false);

    // バリデーション結果を格納するRef変数
    const validationResult: React.MutableRefObject<undefined | SafeParseReturnType<unknown, Schema>> = useRef<undefined | SafeParseReturnType<unknown, Schema>>();

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // ユーザーがエンターキーを押下、かつエンターキーの押下がIMEの確定操作ではない、かつ入力欄が空ではない場合にバリデーションを実行
        if (e.key === "Enter" && !typing && e.currentTarget.value !== "") {
            // 入力された値のバリデーション
            validationResult.current = schema.safeParse(e.currentTarget.value);
            // validation.currentにdataが入っているのはvalidationResult.current.successがtrueの時だけなのでif文で判定
            if (validationResult.current.success) {
                // 入力欄の強調表示を消去
                e.currentTarget.blur();
                // 入力値をクリア
                e.currentTarget.value = '';
                // バリデーション結果に応じてイベントをemit
                if (String(validationResult.current.data).substring(0, 15) === "transactionHash") {
                    setIsError(false);
                    navigate(`/transaction/${validationResult.current.data.slice(16)}`);
                }
                    // else if (String(validationResult.current.data).substring(0, 7) === "address") {
                    //     console.log("address!");
                // }
                else if (String(validationResult.current.data).substring(0, 11) === "blockNumber") {
                    if (Number(validationResult.current.data.slice(12)) <= blockData[0].number) {
                        setIsError(false);
                        navigate(`/block/${validationResult.current.data.slice(12)}`);
                    } else {
                        setIsError(true);
                    }
                }
            } else {
                setIsError(true);
            }
        }
    }

    return (
        <Container maxW="container.xl" w="full" position={'sticky'} top={0} mt={10} mb={5}>
            <Center>
                {/*ユーザーが入力欄にマウスオーバーした時に説明を表示*/}
                <Tooltip hasArrow label={"Get the block or transaction detail"}>
                    <FormControl w={["60%", "50%", "50%", "50%"]} mb={5} isInvalid={isError}>
                        <Input style={{borderColor: "white"}} onCompositionStart={() => {
                            // 入力中にIMEの使用を開始したらフラグを設定
                            setTyping(true)
                        }} onCompositionEnd={() => {
                            // IMEの使用が終了したらフラグを解除
                            setTyping(false)
                        }} onKeyDown={handleKeyDown}
                               type={"text"} placeholder={"Input block number or transaction hash"}/>
                        {isError ? (
                            // バリデーション処理でエラー判定になった時にメッセージを表示
                            <FormErrorMessage>Input a block number({"<="}latest block number) or transaction hash.</FormErrorMessage>
                        ) : null}
                    </FormControl>
                </Tooltip>
            </Center>
        </Container>
    )
}
