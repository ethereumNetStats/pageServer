import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box, Center,
    Container,
    Flex,
    Heading, IconButton,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Th,
    Tr
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useSocket} from "../../context/socketContext";
import {BiHomeAlt} from "react-icons/all";
import type {requestTransactionDetail, responseTransactionDetail} from "../../types/chartDataType";

export const TransactionDetail = () => {

    // useSocket Hooksの呼び出し
    const {socket} = useSocket();

    // クエリパラメーター'transactionHash'の読み込み
    const {transactionHash} = useParams();

    // 表示用データ'blockDetail'をステートとして格納
    const [transactionDetail, setTransactionDetail] = useState<responseTransactionDetail>();

    // useNavigate Hooksの呼び出し
    const navigate = useNavigate();

    useEffect(() => {

        // コンポーネントの呼び出し時にクエリパラメータで受け取ったブロックナンバーの詳細をデータパブリッシャーに要求
        let requestTransactionDetail: requestTransactionDetail = {
            transactionHash: transactionHash as string,
            frontendId: "storeAtServerSide",
        }

        socket.emit("requestTransactionDetail", (requestTransactionDetail));

        // コンポーネントの呼び出し時に要求したデータのリスナーを登録
        socket.on("responseTransactionDetail", (responseTransactionDetail: responseTransactionDetail) => {
            setTransactionDetail(responseTransactionDetail);
        });

    }, []);

    return (
        <Container maxW={"container.xl"} w={"full"} mb={5}>
            <Flex alignItems={"center"}>
                <Box mr={"auto"}>
                    {/*ページタイトルの表示*/}
                    <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"} mb={5}>
                        Transaction detail
                    </Heading>
                </Box>
                {/*ホームボタンの表示*/}
                <IconButton bg={"black"} aria-label={"toHome"} icon={<BiHomeAlt/>} onClick={() => {
                    navigate("/")
                }}/>
            </Flex>
            <Box>
                {
                    // ブロックの詳細データをテーブル形式で表示
                    transactionDetail ? (
                        <TableContainer style={{
                            borderTopStyle: "solid",
                            borderWidth: "1px",
                            borderRadius: "5px",
                            borderColor: "white"
                        }}>
                            <Table variant={"simple"} colorScheme={"white"} size={"md"}>
                                <Tbody>
                                    <Tr>
                                        <Th color={"white"}>Result</Th>
                                        <Th color={"white"}>
                                            {
                                                // データの検索結果の表示
                                                transactionDetail.error === "noTransaction" ? (
                                                    <p>No transaction
                                                        : {transactionDetail.requestedTransactionHash}</p>
                                                ) : (<p>Found transaction</p>)
                                            }
                                        </Th>
                                    </Tr>
                                    {
                                        transactionDetail.transactionDetail && Object.entries(transactionDetail.transactionDetail).map((element, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Th color={"white"}>{element[0]}</Th>
                                                    <Th color={"white"}>{element[1]}</Th>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    ) : (
                        // データの読み込み中はスピナーを表示
                        <Center>
                            <Spinner size={"xl"}/>
                        </Center>
                    )
                }
            </Box>
        </Container>
    )
}

