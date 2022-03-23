import {memo, VFC} from "react";
import {Box, Flex, Heading, Image} from "@chakra-ui/react";

export const Header: VFC = memo(() => {
    return (
        <Flex as="nav" align="center" wrap="wrap" padding={0} borderColor="white" position="static"
              borderBottom="solid">
            <Flex>
                <Image margin="5px" height="60px" width="60px" src="/LogoTwitter_circle.png"/>
            </Flex>
            <Heading as="h1" marginLeft="5px">tweetherChart</Heading>
        </Flex>
    )
})
