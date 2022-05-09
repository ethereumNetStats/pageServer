import {extendTheme} from "@chakra-ui/react";
import "@fontsource/ubuntu-mono";

const theme = extendTheme({
    fonts: {
        heading: "Ubuntu Mono",
        body: "Ubuntu Mono",
    },
    styles: {
        global: {
            body: {
                backgroundColor: "black",
                color: "white",
            }
        }
    },
    components: {
        Button: {baseStyle: {_focus: {boxShadow: 'none'}}},
    },
})

export default theme;
