import {memo, VFC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import { Home } from "../components/pages/Home";

export const Router: VFC = memo( () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
});
