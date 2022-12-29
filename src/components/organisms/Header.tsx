import {Container, Flex, Heading, Image} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import * as React from "react";
import {VFC} from "react";

export const Header: VFC = () => {
    return (
        <Container maxW="container.xl" w="full" position={'sticky'} top={0} zIndex={100} mb={5}>
            <Flex align={'center'} bgColor={'black'} borderBottom={'solid'}>
                <Link to={"/"}>
                    <Image margin="5px" boxSize="60px" src="LogoTwitter_circle.png"/>
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
    )
}
