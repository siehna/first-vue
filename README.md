# first-vue

> A Vue.js training project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## note
コンポーネント間通信周りについて

+ EventHub は main.js で new すること
+ mounted はコンポーネントが呼ばれたときに実行されるスクリプト。今回は created で作成したスクリプトを実行させている。
+ created を用いて EventHubに change.Title メソッドを登録した。

大体 src 内の script.js を見ておくこと

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
