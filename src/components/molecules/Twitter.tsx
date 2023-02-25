import {VFC} from "react";
import {Box, Container} from "@chakra-ui/react";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import * as React from "react";

export const Twitter: VFC = () => {
    return (
        <Container>
            <Box bgColor={"black"}>
                {/*Twitterのタイムラインを表示*/}
                <TwitterTimelineEmbed options={{height: "400px"}} sourceType={"profile"}
                                      screenName={"Twe_ether"}
                                      theme={"dark"} tweetLimit={1}/>
            </Box>
        </Container>
    )
}
