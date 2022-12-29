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

export const BlockDetail = () => {

    const {socket} = useSocket();
    const {number} = useParams();
    const [blockDetail, setBlockDetail] = useState<responseBlockDetail>();
    const navigate = useNavigate();

    useEffect(() => {

        socket.emit("requestBlockDetail", (number));
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
                        <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                            Block detail
                        </Heading>
                    </Box>
                    <IconButton bg={"black"} aria-label={"toHome"} icon={<BiHomeAlt/>} onClick={() => {
                        navigate("/")
                    }}/>
                </Flex>
                <Box>
                    {
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
