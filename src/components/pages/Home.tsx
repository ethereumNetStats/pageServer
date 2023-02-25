// トップページを表示するコンポーネント
import {VFC} from "react";
import {Helmet} from "react-helmet";

import * as React from "react";

import {LatestBlocks} from "../molecules/LatestBlocks";
import {SearchBox} from "../molecules/SearchBox";
import {Statistics} from "../organisms/Statistics";
import {Twitter} from "../molecules/Twitter";

// 'Home'コンポーネントの宣言
export const Home: VFC = () => {

    return (
        <>
            {/*google analytics用のタグを埋め込む*/}
            <Helmet>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-5H890EN0MP"></script>
                <script>
                    {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5H890EN0MP', { send_page_view: true });
            `}
                </script>
            </Helmet>
            {/*検索ボックス表示*/}
            <SearchBox/>
            {/*Latest blocksセクションの表示*/}
            <LatestBlocks/>
            {/*各durationごとのチャート表示*/}
            <Statistics/>
            {/*twetherのタイムライン表示*/}
            <Twitter/>
        </>

    )
}
