# pageServerについて

pageServerは、ethereumNetStatsのReactサーバーです。
ethereumNetStatsでできることは以下の通りです。  
- 直近１０ブロック分のブロックデータのリストをリアルタイムで表示  
- 各集計期間（１分、１時間、１日、１週間）ごとの 各種集計データのチャート表示  
- 全ブロックデータを２５個づつに分割してページングしたリストの表示  
- 入力・選択したブロックデータの検索・詳細表示  
- 関連のtwitterアカウントtweetherの最新のタイムラインの表示
- 入力したトランザクションハッシュのトランザクションを検索・表示

# 事前準備
事前に以下のことを完了して下さい。
- [blockDataRecorder](https://github.com/ethereumNetStats/blockDataRecorder)のDockerのインストール〜ソースコードの実行
- [minutelyBasicNetStatsRecorder](https://github.com/ethereumNetStats/minutelyBasicNetStatsRecorder)の実行
- [hourlyBasicNetStatsRecorder](https://github.com/ethereumNetStats/hourlyBasicNetStatsRecorder)の実行
- [dailyBasicNetStatsRecorder](https://github.com/ethereumNetStats/dailyBasicNetStatsRecorder)の実行
- [weeklyBasicNetStatsRecorder](https://github.com/ethereumNetStats/weeklyBasicNetStatsRecorder)の実行
- [socketServer](https://github.com/ethereumNetStats/socketServer)の実行
- [dataPoolServer](https://github.com/ethereumNetStats/dataPoolServer)の実行
- [dataPublisher](https://github.com/ethereumNetStats/dataPublisher)の実行

# ソースコード
このレポジトリは[React](https://ja.reactjs.org/)と、[chakra-ui](https://chakra-ui.com/)を使用して作成されたものです。  
ソースコードは[src](https://github.com/ethereumNetStats/pageServer/tree/main/src)内をご参照ください。

# 使い方
以下では、ubuntu server v22.04での使用例を説明します。  
まずこのレポジトリを`clone`します。
```shell
git clone https://github.com/ethereumNetStats/pageServer.git
```
`clone`が終わったら以下のコマンドでクローンしたディレクトリに移動して下さい。
```shell
cd ./pageServer
```
次に[Node.js](https://nodejs.org/ja/)のインストールをします。
以下のコマンドを実行して下さい。なお、以下の手順は最も簡単なインストール方法です。必要に応じて`nvm`などのバージョンマネージャーを使用してインストールしても構いません。
```shell
sudo apt update
sudo apt install nodejs
```
次にパッケージマネージャー(`npm`)をインストールします。
```shell
sudo apt install npm
```
`npm`をインストールしたら以下のコマンドでパッケージをインストールします。
```shell
npm install
```
`npm`を使用してサーバーを起動します。  
```shell
npm start
```
上記のサーバーは開発サーバーですが、以下のコマンドでビルドしたものを独自のサーバーで提供することもできます。  
```shell
npm run build
npm install -g serve
serve -s build
```
