among us の公式サーバーが重すぎなので，ローカル通信を離れていても出来るプロキシアプリです．
これで ping 50 ms(以下) で対戦できます．

このアプリは https://github.com/NickCis/among-us-proxy の version 1.1.2 をベースに，ゲスト機能のみを移植しました．  
これにより，PC操作に慣れていない人でも，比較的簡単にゲームに参加することができます．  
また，追加機能として，同じローカルネットワーク内にもパケットを送信して，スマートフォンからもゲームに参加することができます．  
これは本家には無い機能です．  

# Chrome への登録方法
[Releases](https://github.com/TumoiYorozu/among_us_chrome_proxy/releases) から最新の`among_us_chrome_proxy.zip` をダウンロード，解凍してください．

Chrome の 拡張機能(chrome://extensions/) を開き，右上のの「デベロッパー モード」を有効にして，「パッケージ化されていない拡張機能を読み込む」から解凍したフォルダを選択してください．

これでChromeのアプリ(chrome://apps/)に登録されるので，among_us_chrome_proxy を起動してください．

# 使い方(ゲスト)
ホストから，接続に必要なaddressを教えてもらってください．  
"Host Address" にそのURLを入力して，"Connect"ボタンを押すと，あなたのPCから遠く離れたホストのAmong Usのローカル部屋に接続することが出来ます．  

# 使い方(ゲスト・スマートフォン)
スマートフォンなどから接続したい場合，このアプリ起動しているPC経由でスマートフォンからゲームに参加できます．  

ホストから，接続に必要なaddressを教えてもらってください．  
"Host Address" にそのURLを入力して，チェックボックスの「LAN」を選択してください．  
これにより，あなたのパソコンがつながっているWiFi などのネットワーク経由で接続できる様になります．  

### 注意
スマートフォンから部屋は認識できるけど接続できない場合，PCのファイアウォールが邪魔をしている可能性があります．  
その場合，PC の 22023番ポートのUDP 受信を許可してください．  
- [Windows の場合のやり方](https://www.fmworld.net/cs/azbyclub/qanavi/jsp/qacontents.jsp?PID=7510-8352)
- [mac でファイアウォールを無効にする方法](https://aprico-media.com/posts/3083)（初心者向けのポート開放する方法が見つかりませんでした．ゲームが終わったら有効に戻すことをおすすめします）

なお，1つのプロキシアプリに接続できるプレイヤーは1デバイスまでです． 同じWiFiで複数端末から接続しようとしても上手くいきません．  




# 使い方(Host)
**ゲームをするメンバーの中で1人だけ行います．要求PCスキルは高めです．ホスト以外の参加者は関係ないので読み飛ばしてください.**  

このアプリにはホスト機能が付いていないので，本家のamong-us-proxyを使用してください． 
例えば  
https://github.com/NickCis/among-us-proxy  
を[ダウンロード](https://github.com/NickCis/among-us-proxy/archive/master.zip) します．  

実行コードは [./packages/among-us-proxy/](https://github.com/NickCis/among-us-proxy/tree/master/packages/among-us-proxy) を使います．

次に実行環境である [nodejs をダウンロード](https://nodejs.org/ja/download/) してインストールしてください．  
ターミナル(コマンドプロンプト)でダウンロードした among-us-proxy の下の packages/among-us-proxy/ を開きます．  
そこで「npm install --production」でアプリの実行に必要なファイルを準備します．  
最後に「node src/main.js host --port 1080」と実行することによりゲストを招くことが出来ます．  
この場合，指定したポート(この例では1080番)に外部から接続できる必要があります．  
Firewall やルーターのポート転送設定を設定してください．  

あなたのコンピューターのグローバルIP addressが 123.45.67.89 の場合，  
「ws://123.45.67.89:1080」を友だちに教えてあげることにより，あなたのゲームに招くことが出来ます．


# 投げ銭先
Bitcoin : 3QZPMnkzsubp1SxYT7Z9rMpXRc6Z1jBj5x  
PayPal : https://paypal.me/TumoiYorozu   
複数のプロジェクトで同じ投げ銭先なので，コメントで「Amongus proxy を使ったよ」と書いてくれると嬉しいです．

また，この アプリ を広めるいう『無償の支援』も歓迎しております．

# ビルド方法
node.js から js に変換します．  
テンプレートをそのまま残しているだけなので未検証です．  

# among_us_chrome_proxy

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

```javascript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```






