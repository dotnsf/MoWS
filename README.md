# MoWS(MQTT over WebSocket)

## Overview

`MQTT over WebSocket` 技術を使って、Twitter や facebook のような **「更新データがあると、リロードしなくてもタイムラインが更新される」** 仕組みを実現したサンプル


## How to run app

- Node.js & npm インストール

- ソースコード取得
  - `$ git clone https://github.com/dotnsf/MoWS`
  
- ライブラリインストール
  - `$ cd MoWS`
  - `$ npm install`

- 実行
  - `$ node app`


## How to demonstrate

- アプリ実行後に２つのブラウザで以下にそれぞれアクセス
  - タイムライン表示
    - `http://localhost:8080`

  - 編集画面表示
    - `http://localhost:8080/edit`

- タイムライン画面にはアプリ起動から現在までに投稿されたデータが新しい順に表示される
  - 画面をリロードすると、その時点での投稿データが新しい順に表示される

- 編集画面にタイトルと本文を入力して送信すると、その内容が記録される
  - 記録後、自動的に編集画面に戻るので、繰り返し入力＆送信が可能

- タイムラインを表示時に新しいデータが投稿されると、タイムライン画面をリロードしなくても入力されたデータが最新データとして追加表示される

- （このサンプルでは）データの永続化は非対応。`$ node app` したアプリケーションが終了するまでデータを記録するが、アプリケーションを終了してから再起動するとデータも初期化される。


## Environment values

- `MOWS_URL` : URL for MOWS broker(default: ``)

- `MQTT_URL` : URL for MQTT broker(default: ``)

- `MQTT_PORT` : Port for MQTT broker(default: `1880`)

- `MQTT_TOPIC` : Topic string of MQTT(default: ``)


## Licensing

This code is licensed under MIT.


## Copyright

2023 K.Kimura @ Juge.Me all rights reserved.

