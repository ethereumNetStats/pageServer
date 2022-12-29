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
import {Header} from "../organisms/Header";

export const BlockList: VFC = () => {

    const {socket, responseBlockList, setResponseBlockList, blockListCurrentPage, blockListTotalPage} = useSocket();
    const navigate = useNavigate();
    const [pageOffset, setPageOffset] = useState<number>(0);
    const [typing, setTyping] = useState<boolean>(false);
    const inputBlockNumber: React.MutableRefObject<string | number> = useRef<string | number>('');
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        socket.emit('requestBlockList', pageOffset);
    }, []);

    const handleClickPageChange = useCallback((event: { selected: number }) => {
        const newOffset = event.selected;
        setPageOffset(newOffset);
        setResponseBlockList();
        socket.emit('requestBlockList', event.selected);
    }, []);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.value);
        if (e.key === "Enter" && !typing && e.currentTarget.value !== "") {
            if (Number(e.currentTarget.value)) {
                inputBlockNumber.current = Number(e.currentTarget.value);
                if (Number.isInteger(inputBlockNumber.current)) {
                    if (Math.sign(inputBlockNumber.current) === 1) {
                        if (inputBlockNumber.current <= responseBlockList.latestBlockNumber) {
                            e.currentTarget.blur();
                            e.currentTarget.value = '';
                            setIsError(false);
                            socket.emit("requestBlockListPageByBlockNumber", inputBlockNumber.current);
                            setResponseBlockList();
                        } else {
                            setIsError(true);
                        }
                    } else {
                        setIsError(true);
                    }
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
            <Header/>
            <Container maxW="container.xl" w="full" mb={5}>
                <Flex alignItems={"center"}>
                    <Heading mr={"auto"} fontSize={["1.4rem", "1.6rem", "2rem", "3.5rem", "3.5rem"]} color={"white"}>
                        Block list
                    </Heading>
                    <Tooltip hasArrow label={"Refresh this page to get the latest block"}>
                        <IconButton bg={"black"} aria-label={"refresh"} icon={<BiRefresh/>} onClick={() => {
                            navigate(0)
                        }}/>
                    </Tooltip>
                    <IconButton bg={"black"} aria-label={"toHome"} icon={<BiHomeAlt/>} onClick={() => {
                        navigate("/")
                    }}/>
                </Flex>
            </Container>
            <Container maxW="container.xl" w="full" mb={5}>
                <Tooltip hasArrow label={"Get a page including the input number"}>
                    <FormControl w={["60%", "50%", "25%", "25%"]} mb={5} isInvalid={isError}>
                        <Input onCompositionStart={() => {
                            setTyping(true)
                        }} onCompositionEnd={() => {
                            setTyping(false)
                        }} onKeyDown={handleKeyDown}
                               type={"text"} placeholder={"Input block number"}/>
                        {isError ? (
                            <FormErrorMessage>Input an integer number greater than 0 and less than the latest block number.</FormErrorMessage>
                        ) : null}
                    </FormControl>
                </Tooltip>
                <Box fontSize={["10px", "10px", "16px", "16px"]}>
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
                responseBlockList ? (
                        <Container maxW={"container.xl"} w={"full"} mb={5}>
                            <TableContainer style={{borderTopStyle: "solid", borderWidth: "1px", borderRadius: "5px"}}>
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
                    <Center>
                        <Spinner size={"xl"}/>
                    </Center>
            }
        </>
    )
}
