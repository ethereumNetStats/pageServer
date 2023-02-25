# pageServerについて

pageServerは、ethereumNetStatsのReactサーバーです。
ethereumNetStatsでできることは以下の通りです。  
- 直近１０ブロック分のブロックデータのリストをリアルタイムで表示  
- 各集計期間（１分、１時間、１日、１週間）ごとの 各種集計データのチャート表示  
- 全ブロックデータを２５個づつに分割してページングしたリストの表示  
- 入力・選択したブロックデータの検索・詳細表示  
- 関連のtwitterアカウントtweetherの最新のタイムラインの表示
- 入力したトランザクションハッシュのトランザクションを検索・表示

# ソースコード
ソースコードは[src](https://github.com/ethereumNetStats/pageServer/tree/main/src)内をご参照ください。
