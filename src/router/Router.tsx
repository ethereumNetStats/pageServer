import {memo, VFC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import { Home } from "../components/pages/Home";
import {BlockDetail} from "../components/pages/BlockDetail";
import {BlockList} from "../components/organisms/BlockList";

export const Router: VFC = memo( () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={"/block/:number"} element={<BlockDetail/>}/>
            <Route path={"/blocklist"} element={<BlockList/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
});
