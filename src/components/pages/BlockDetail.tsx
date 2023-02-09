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
            <Container maxW={"container.xl"} w={"full"} mb={5}>
                <Flex alignItems={"center"}>
                    <Box mr={"auto"}>
                        {/*ページタイトルの表示*/}
                        <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"} mb={5}>
                            Block detail : {number}
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
                            <TableContainer style={{
                                borderTopStyle: "solid",
                                borderWidth: "1px",
                                borderRadius: "5px",
                                borderColor: "white"
                            }}>
                                <Table variant={"simple"} colorScheme={"white"} size={"md"}>
                                    <Tbody>
                                        {
                                            Object.entries(blockDetail).map((element, index) => {
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
        </>
    )
}
