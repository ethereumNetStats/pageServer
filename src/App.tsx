import * as React from "react"
import {
    ChakraProvider, Container,
} from "@chakra-ui/react"
import {BrowserRouter} from "react-router-dom";

import theme from "./theme/theme";
import {Router} from "./router/Router";

export const App = () => (
    <Container maxWidth="70vw">
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ChakraProvider>
    </Container>
)
