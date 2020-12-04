このアプリは https://github.com/NickCis/among-us-proxy の version 1.1.2 をベースに，ゲスト機能のみを移植しました．
これにより，Computer操作に慣れていない人でも，簡単にゲームに参加することができます．
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
スマートフォンなどから接続したい場合，PCでこのアプリをLAN ゲストモードで起動する事により，PC経由でスマートフォンからゲームに参加できます．

ホストから，接続に必要なaddressを教えてもらってください．
"Host Address" にそのURLを入力して，チェックボックスの「LAN」を選択してください．
これにより，あなたのパソコンがつながっているWiFi などのネットワーク経由で接続できる様になります．

スマートフォンから部屋は認識できるけど接続できない場合，PCのファイアウォールが邪魔をしている可能性があります．
その場合，PC の 22023番ポートのUDP 受信を許可してください．

なお，1つのプロキシアプリに接続できるプレイヤーは1デバイスまでです． 同じWiFiで複数端末から接続しようとしても上手くいきません．




# 使い方(Host)
**ゲームをするメンバーの中で1人だけ行います．要求PCスキルは高めです．ホスト以外の参加者は関係ないので読み飛ばしてください.**  

このアプリにはホスト機能が付いていないので，本家のamong-us-proxyを使用してください．
例えば
https://github.com/NickCis/among-us-proxy/tree/master/packages/among-us-proxy
をダウンロードして， nodejs をインストール，
「npm install --production」でアプリを準備して
「node src/main.js host --port 1080」と実行することによりゲストを招くことが出来ます．
この場合，指定したポート(この例では1080番)に外部から接続できる必要があります．
Firewall やルーターのポート転送設定を設定してください．

あなたのコンピューターのグローバルIP addressが 123.45.67.89 の場合，
「ws://123.45.67.89:1080」を友だちに教えてあげることにより，あなたのゲームに招くことが出来ます．




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






