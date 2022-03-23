import {memo, VFC} from "react";
import {Routes, Route} from "react-router-dom";

import { Home } from "../components/pages/Home"
import {HeaderLayout} from "../components/templates/HeaderLayout";

export const Router: VFC = memo( () => {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout>{<Home/>}</HeaderLayout>} />
        </Routes>
    )
})
