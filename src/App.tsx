import * as React from "react"
import {
    ChakraProvider,
} from "@chakra-ui/react"
import {BrowserRouter} from "react-router-dom";

import theme from "./theme/theme";
import '@fontsource/ubuntu/400.css';

import {Router} from "./router/Router";

export const App = () => (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ChakraProvider>
)
