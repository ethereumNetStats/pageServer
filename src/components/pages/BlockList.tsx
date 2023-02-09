// Home.tsxのview all blocksをクリックした時のblock listページのコンポーネント
import {useCallback, useEffect, useRef, useState, VFC} from "react";
import {useNavigate} from "react-router-dom";
import {useSocket} from "../../context/socketContext";
import ReactPaginate from "react-paginate";
import "./pagination.css";

import type {blockData} from "../../types/chartDataType";
import {
    Box,
    Center,
    Container,
    Flex, FormControl, FormErrorMessage, Heading, IconButton,
    Input,
    Link,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead, Tooltip,
    Tr
} from "@chakra-ui/react";
import * as React from "react";
import {BiHomeAlt, BiRefresh} from "react-icons/all";
import {SafeParseReturnType, z} from "zod";

// ブロックナンバーのバリデーションルール
const schema = z.string().regex(/^([1-9]\d*|0)$/).transform((val) => Number(val));

type Schema = z.infer<typeof schema>;

// 'BlockList'コンポーネントの宣言
export const BlockList: VFC = () => {

    // useSocket Hooksの呼び出し
    const {socket, responseBlockList, setResponseBlockList, blockListCurrentPage, blockListTotalPage} = useSocket();

    // useNavigate Hooksの呼び出し
    const navigate = useNavigate();

    // 'react-paginate'用のページ数のステート変数
    const [pageOffset, setPageOffset] = useState<number>(0);

    // 入力フォームでIME入力中か否かを判定するためのステート変数
    const [typing, setTyping] = useState<boolean>(false);

    // 入力値のバリデーション結果を格納するステート変数
    const [isError, setIsError] = useState<boolean>(false);

    // バリデーション結果を格納するRef変数
    const validationResult: React.MutableRefObject<undefined | SafeParseReturnType<unknown, Schema>> = useRef<undefined | SafeParseReturnType<unknown, Schema>>();

    useEffect(() => {
        // コンポーネントのマウント時にページの初期値と共にデータを要求
        socket.emit('requestBlockList', pageOffset);
    }, []);

    // ページ番号をクリックした時の処理
    const handleClickPageChange = useCallback((event: { selected: number }) => {
        // クリックされたページ数を格納
        const newOffset = event.selected;

        // クリックされたページ数をステート変数として格納
        setPageOffset(newOffset);

        // 表示中のデータを初期化してスピナーを表示
        setResponseBlockList();

        // クリックされたページのデータを要求
        socket.emit('requestBlockList', event.selected);
    }, []);

    // ユーザーがフォームに入力中の処理
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.value);
        // ユーザーがエンターキーを押下、かつエンターキーの押下がIMEの確定操作ではない、かつ入力欄が空ではない場合にバリデーションを実行
        if (e.key === "Enter" && !typing && e.currentTarget.value !== "") {
            // 入力された値のバリデーション
            validationResult.current = schema.safeParse(e.currentTarget.value);
            // validation.currentにdataが入っているのはvalidationResult.current.successがtrueの時だけなのでif文で判定
            if (validationResult.current.success) {
                // 入力されたブロックデータが最新値以上の時はエラーメッセージ。そうでない時はリクエストをエミット
                if (validationResult.current.data <= responseBlockList.latestBlockNumber) {
                    // 入力欄の強調表示を消去
                    e.currentTarget.blur();
                    // 入力値をクリア
                    e.currentTarget.value = '';
                    // エラーメッセージをクリア
                    setIsError(false);
                    // ユーザーが要求したブロックナンバーを含むページをデータパブリッシャーに要求
                    socket.emit("requestBlockListPageByBlockNumber", validationResult.current.data);
                    // 表示中のデータを初期化してスピナーを表示
                    setResponseBlockList();
                } else {
                    setIsError(true);
                }
            } else {
                setIsError(true);
            }
        }
    }

    return (
        <>
            {/*ホームボタンとリフレッシュボタンのコンテナ*/}
            <Container maxW="container.xl" w="full" mb={5}>
                <Flex alignItems={"center"}>
                    <Heading mr={"auto"} fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]}
                             color={"white"}>
                        Block list
                    </Heading>
                    {/*ユーザーがリフレッシュボタンにマウスオーバーした時に説明を表示*/}
                    <Tooltip hasArrow label={"Refresh this page to get the latest block"}>
                        <IconButton bg={"black"} aria-label={"refresh"} icon={<BiRefresh/>} onClick={() => {
                            navigate(0)
                        }}/>
                    </Tooltip>
                    {/*ホームボタンを表示*/}
                    <IconButton bg={"black"} aria-label={"toHome"} icon={<BiHomeAlt/>} onClick={() => {
                        navigate("/")
                    }}/>
                </Flex>
            </Container>
            {/*入力欄のコンテナ*/}
            <Container maxW="container.xl" w="full" mb={5}>
                {/*ユーザーが入力欄にマウスオーバーした時に説明を表示*/}
                <Tooltip hasArrow label={"Get a page including the input number"}>
                    <FormControl w={["60%", "50%", "25%", "25%"]} mb={5} isInvalid={isError}>
                        <Input borderColor={"white"} onCompositionStart={() => {
                            // 入力中にIMEの使用を開始したらフラグを設定
                            setTyping(true)
                        }} onCompositionEnd={() => {
                            // IMEの使用が終了したらフラグを解除
                            setTyping(false)
                        }} onKeyDown={handleKeyDown}
                               type={"text"} placeholder={"Input block number"}/>
                        {isError ? (
                            // バリデーション処理でエラー判定になった時にメッセージを表示
                            <FormErrorMessage>Input an integer number greater than 0 and less than the latest
                                block
                                number.</FormErrorMessage>
                        ) : null}
                    </FormControl>
                </Tooltip>
                <Box fontSize={["10px", "10px", "16px", "16px"]}>
                    {/*ページネーション表示*/}
                    <ReactPaginate pageCount={blockListTotalPage}
                                   forcePage={blockListCurrentPage}
                                   breakLabel={"..."}
                                   onPageChange={handleClickPageChange}
                                   pageRangeDisplayed={5}
                                   previousLabel={"< previous"}
                                   nextLabel={"next >"}
                                   containerClassName={"containerClassName"}
                                   pageClassName={"pageClassName"}
                                   pageLinkClassName={"pageLinkClassName"}
                                   previousClassName={"previousClassName"}
                                   previousLinkClassName={"previousLinkClassName"}
                                   nextClassName={"nextClassName"}
                                   nextLinkClassName={"nextLinkClassName"}
                                   activeClassName={"activeClassName"}
                    />
                </Box>
            </Container>
            {
                // ブロックリストをテーブル形式で表示
                responseBlockList ? (
                        <Container maxW={"container.xl"} w={"full"} mb={5}>
                            <TableContainer style={{
                                borderTopStyle: "solid",
                                borderWidth: "1px",
                                borderRadius: "5px",
                                borderColor: "white"
                            }}>
                                <Table variant={"simple"} colorScheme={"white"} size={"md"}>
                                    <Thead>
                                        <Tr>
                                            <Th fontSize={"md"} color={"white"}>Number</Th>
                                            <Th fontSize={"md"} color={"white"}>Age</Th>
                                            <Th fontSize={"md"} color={"white"}>Transactions</Th>
                                            <Th fontSize={"md"} color={"white"}>GasUsed</Th>
                                            <Th fontSize={"md"} color={"white"}>GasLimit</Th>
                                            <Th fontSize={"md"} color={"white"}>BaseFeePerGas</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            responseBlockList.list.map((block: blockData, key: number) => (
                                                <Tr key={key}>
                                                    <Th fontSize={"md"} color={"white"}>
                                                        <Link href={"/block/" + block.number}>{block.number}</Link>
                                                    </Th>
                                                    <Th fontSize={"md"}
                                                        color={"white"}>{Math.floor((new Date().getTime() / 1000) - block.timestamp)} sec</Th>
                                                    <Th fontSize={"md"}
                                                        color={"white"}>{block.transactions.length ? block.transactions.split(",").length : block.transactions.length}</Th>
                                                    <Th fontSize={"md"}
                                                        color={"white"}>{block.gasUsed ? block.gasUsed.toLocaleString() : 0} wei</Th>
                                                    <Th fontSize={"md"}
                                                        color={"white"}>{block.gasLimit ? block.gasLimit.toLocaleString() : 0} wei</Th>
                                                    <Th fontSize={"md"}
                                                        color={"white"}>{block.baseFeePerGas ? block.baseFeePerGas.toLocaleString() : 0} wei</Th>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Container>
                    ) :
                    // データ読み込み中はスピナーを表示
                    <Center>
                        <Spinner size={"xl"}/>
                    </Center>
            }
        </>
    )
}
