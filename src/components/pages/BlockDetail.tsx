import {Link, useNavigate, useParams} from "react-router-dom";
import {
    Box, Center,
    Container,
    Flex,
    Heading, IconButton, Image,
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
            <Container maxW="container.xl" w="full" position={'sticky'} top={0} zIndex={100} mb={5}>
                <Flex align={'center'} bgColor={'black'} borderBottom={'solid'}>
                    <Link to={"/"}>
                        <Image margin="5px" boxSize="60px" src="/LogoTwitter_circle.png"/>
                    </Link>
                    <Heading as="h1" marginLeft="5px" mr="auto"
                             fontSize={{
                                 base: "1.5rem",
                                 sm: "1.2rem",
                                 md: "1.5rem",
                                 lg: "2rem"
                             }}>ethereumNetStats</Heading>
                </Flex>
            </Container>
            <Container maxW={"container.xl"} w={"full"} mb={5}>
                <Flex alignItems={"center"}>
                    <Box mr={"auto"}>
                        <Heading fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                            Block detail
                        </Heading>
                    </Box>
                    <IconButton bg={"black"} aria-label={"toHome"} icon={<BiHomeAlt/>} onClick={ () => {navigate("/")} }/>
                </Flex>
                <Box>
                    {
                        blockDetail ? (
                            <TableContainer>
                                <Table variant={"simple"} size={"md"}>
                                    <Tbody>
                                        {
                                            <>
                                                <Tr>
                                                    <Th>Number</Th>
                                                    <Th>{blockDetail.number}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Hash</Th>
                                                    <Th>{blockDetail.hash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>ParentHash</Th>
                                                    <Th>{blockDetail.parentHash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>baseFeePerGas</Th>
                                                    <Th>{blockDetail.baseFeePerGas}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Nonce</Th>
                                                    <Th>{blockDetail.nonce}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Sha3Uncles</Th>
                                                    <Th>{blockDetail.sha3Uncles}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>LogsBloom</Th>
                                                    <Th>{blockDetail.logsBloom}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>TransactionsRoot</Th>
                                                    <Th>{blockDetail.transactionsRoot}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>StateRoot</Th>
                                                    <Th>{blockDetail.stateRoot}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>miner</Th>
                                                    <Th>{blockDetail.miner}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Difficulty</Th>
                                                    <Th>{blockDetail.difficulty}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>TotalDifficulty</Th>
                                                    <Th>{blockDetail.totalDifficulty}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>ExtraData</Th>
                                                    <Th>{blockDetail.extraData}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Size</Th>
                                                    <Th>{blockDetail.size}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>GasLimit</Th>
                                                    <Th>{blockDetail.gasLimit}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>GasUsed</Th>
                                                    <Th>{blockDetail.gasUsed}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Transactions</Th>
                                                    <Th>{blockDetail.transactions.split(',').length}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>Uncles</Th>
                                                    <Th>{blockDetail.uncles}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>MixHash</Th>
                                                    <Th>{blockDetail.mixHash}</Th>
                                                </Tr>
                                                <Tr>
                                                    <Th>ReceiptsRoot</Th>
                                                    <Th>{blockDetail.receiptsRoot}</Th>
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
