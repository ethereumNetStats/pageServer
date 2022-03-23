import {memo, VFC, ReactNode} from "react";
import {Header} from "../organisms/Header";

type Props = {
    children: ReactNode;
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const {children} = props;
    return (
        <>
            <Header/>
            {children}
        </>
    )
})
