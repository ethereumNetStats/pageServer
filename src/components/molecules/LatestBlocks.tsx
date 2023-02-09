// Home.tsxで表示される'Latest blocks'セクションの表示
import {
    Box,
    Center,
    Container,
    Flex,
    Heading, Link,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import * as React from "react";

// socketContext Hooksのインポート
import {useSocket} from "../../context/socketContext";

// データパブリッシャーから受け取るデータの型定義のインポート
import type {blockData} from "../../types/chartDataType";

// 'LatestBlocks'コンポーネントの定義
export const LatestBlocks = () => {

    // useSocket Hooksの呼び出し
    const {blockData} = useSocket();

    return (
        <Container maxW={"container.xl"} w={"full"} mb={5}>
            <Flex align={"center"}>
                <Box mr={"auto"}>
                    {/*セクション名の表示*/}
                    <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                        Latest Blocks
                    </Heading>
                </Box>
                <Box>
                    {/*blocklistページへのリンク表示*/}
                    <Link href={"/blocklist"}>View all blocks {'->'}</Link>
                </Box>
            </Flex>
            <Box>
                {/*blockDataに含まれるデータをテーブル形式で表示*/}
                {
                    blockData.length ? (
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
                                        blockData.map((block: blockData, key: number) => (
                                            <Tr key={key}>
                                                <Th fontSize={"md"} color={"white"}>
                                                    <Link href={"/block/" + block.number}>{block.number}</Link>
                                                </Th>
                                                <Th fontSize={"md"} color={"white"}>{Math.floor((new Date().getTime() / 1000) - block.timestamp)} sec</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.transactions.split(",").length}</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.gasUsed.toLocaleString()} wei</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.gasLimit.toLocaleString()} wei</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.baseFeePerGas.toLocaleString()} wei</Th>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Center>
                            <Spinner size={"xl"}/>
                        </Center>
                    )
                }
            </Box>
        </Container>
    )
}
