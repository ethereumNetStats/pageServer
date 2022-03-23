import {VFC} from "react";
import {Home} from "../components/pages/Home";

export const homeRoutes = [{
    path: "/",
    exact: true,
    children: <Home />
}]
