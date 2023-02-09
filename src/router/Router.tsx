// 本サイトのルーティング設定
import {memo, VFC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import {Home} from "../components/pages/Home";
import {BlockDetail} from "../components/pages/BlockDetail";
import {BlockList} from "../components/pages/BlockList";
import {TransactionDetail} from "../components/pages/TransactionDetail";
import {Header} from "../components/organisms/Header";

export const Router: VFC = memo(() => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/block/:number"} element={<BlockDetail/>}/>
                <Route path={"/blocklist"} element={<BlockList/>}/>
                <Route path={"/transaction/:transactionHash"} element={<TransactionDetail/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    )
});
