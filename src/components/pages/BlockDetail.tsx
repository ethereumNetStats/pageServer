// 'Latest block'セクションでユーザーがブロックナンバーをクリックした時、及び'Block list'ページでブロックナンバーをクリックまたは入力した時に
// 表示される'Block detail'ページのコンポーネント
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
import {responseBlockDetail} from "../../types/chartDataType";
import {BiHomeAlt} from "react-icons/all";
import * as React from "react";
import {Header} from "../organisms/Header";

// 'BlockDetail'コンポーネントの宣言
export const BlockDetail = () => {

    // useSocket Hooksの呼び出し
    const {socket} = useSocket();

    // クエリパラメーター'number'の読み込み
    const {number} = useParams();

    // 表示用データ'blockDetail'をステートとして格納
    const [blockDetail, setBlockDetail] = useState<responseBlockDetail>();

    // useNavigate Hooksの呼び出し
    const navigate = useNavigate();

    useEffect(() => {

        // コンポーネントの呼び出し時にクエリパラメータで受け取ったブロックナンバーの詳細をデータパブリッシャーに要求
        socket.emit("requestBlockDetail", (number));

        // コンポーネントの呼び出し時に要求したデータのリスナーを登録
        socket.on("responseBlockDetail", (responseBlockDetail: responseBlockDetail) => {
            setBlockDetail(responseBlockDetail);
        });

    }, []);

    return (
        <>
            <Header/>
            <Container maxW={"container.xl"} w={"full"} mb={5}>
                <Flex alignItems={"center"}>
                    <Box mr={"auto"}>
                        {/*ページタイトルの表示*/}
                        <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                            Block detail
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
                        blockDetail ? (
                            <TableContainer style={{borderTopStyle: "solid", borderWidth: "1px", borderRadius: "5px"}}>
                                <Table variant={"simple"} size={"md"}>
                                    <Tbody>
                                        {
                                            <>
                                                <Tr>
                                                    <Th color={"white"}>Number</Th>
                                                    <Th color={"white"}>{blockDetail.number}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Hash</Th>
                                                    <Th color={"white"}>{blockDetail.hash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>ParentHash</Th>
                                                    <Th color={"white"}>{blockDetail.parentHash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>baseFeePerGas</Th>
                                                    <Th color={"white"}>{blockDetail.baseFeePerGas}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Nonce</Th>
                                                    <Th color={"white"}>{blockDetail.nonce}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Sha3Uncles</Th>
                                                    <Th color={"white"}>{blockDetail.sha3Uncles}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>LogsBloom</Th>
                                                    <Th color={"white"}>{blockDetail.logsBloom}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>TransactionsRoot</Th>
                                                    <Th color={"white"}>{blockDetail.transactionsRoot}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>StateRoot</Th>
                                                    <Th color={"white"}>{blockDetail.stateRoot}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>miner</Th>
                                                    <Th color={"white"}>{blockDetail.miner}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Difficulty</Th>
                                                    <Th color={"white"}>{blockDetail.difficulty}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>TotalDifficulty</Th>
                                                    <Th color={"white"}>{blockDetail.totalDifficulty}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>ExtraData</Th>
                                                    <Th color={"white"}>{blockDetail.extraData}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Size</Th>
                                                    <Th color={"white"}>{blockDetail.size}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>GasLimit</Th>
                                                    <Th color={"white"}>{blockDetail.gasLimit}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>GasUsed</Th>
                                                    <Th color={"white"}>{blockDetail.gasUsed}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Transactions</Th>
                                                    <Th color={"white"}>{blockDetail.transactions.split(',').length}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>Uncles</Th>
                                                    <Th color={"white"}>{blockDetail.uncles}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>MixHash</Th>
                                                    <Th color={"white"}>{blockDetail.mixHash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th color={"white"}>ReceiptsRoot</Th>
                                                    <Th color={"white"}>{blockDetail.receiptsRoot}</Th>
                                                </Tr>
                                            </>
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
        </>
    )
}
