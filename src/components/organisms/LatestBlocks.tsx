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
import {useSocket} from "../../context/socketContext";

import type {blockData} from "../../types/chartDataType";

export const LatestBlocks = () => {

    const {blockData} = useSocket();

    return (
        <Container maxW={"container.xl"} w={"full"} mb={5}>
            <Flex align={"center"}>
                <Box mr={"auto"}>
                    <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                        Latest Blocks
                    </Heading>
                </Box>
                <Box>
                    <Link href={"/blocklist"}>View all blocks {'->'}</Link>
                </Box>
            </Flex>
            <Box>
                {
                    blockData.length ? (
                        <TableContainer>
                            <Table variant={"simple"} size={"md"}>
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
                                                    color={"white"}>{block.gasUsed.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} wei</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.gasLimit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} wei</Th>
                                                <Th fontSize={"md"}
                                                    color={"white"}>{block.baseFeePerGas.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} wei</Th>
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
