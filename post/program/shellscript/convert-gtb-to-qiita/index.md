---
title: "Gatsby.js向けに書いた記事をQiita向けに変換したい"
date: "2021/02/09"
description: "Gatsby"
tags: ["program"]
thumbnail: 0.png
---

![0](0.png)

# やりたいこと

- `Gatsbyjs`向けに書いた記事を
- Qiita 向けの記事の書き方にしたい

## ちょっとよくわからないので噛み砕いて

- `Gatsbyjs`向けに書いた記事をコピーし
- 正規表現で Qiita 向けの記述になるように変形し
- なんでもいいのでテキストとしてすぐ扱えるようにする

じゃあやってみましょう。

以前、`A to Bな変換系WebアプリをFlaskで作ろう！`という記事を書きましたが、  
こんな変換のためにいちいち Web アプリをローンチするのもかったるすぎるので  
PC 上で完結できるようにしましょう。

### そもそも〜向けの記事って何？

**コードブロックの書き方がちょっと違います。**  
そのせいで片方向けの記事を書いてもう片方で公開したいとなるとちょっとめんどくさいです。

Gatsby 向けの記事だと`python:title=hoge`。
Qiita 向けの記事だと`python :hoge`みたいな感じ。

これをごちゃごちゃにするとこうなります。

```python:title=script.py

```

これではちょっと嫌ですね。
それでは、やっていきます。

## 材料

- ShellScript もとい bash

以上。

## 早速組み立てていく

できたものがこちらになります。

```sh:title=script.sh
# クリップボードから文字列を変数に代入する
copied=`pbpaste | nkf -w`

# Qiita <- Gatsby
pat_1_before='(`{3,4})(.+):title=(.+)'
pat_1_after=':'
strings=`echo "$copied" | sed -E "s/$pat_1_before/$pat_1_after/g"`
echo "$strings" | open -f
```

- 変数`copied`を作る。
- `copied`に`pbpaste | nkf -w`で、  
  クリップボードの中身をエンコードしたのちぶち込む。
- 正規表現のパターンを用意する。
- 変換する
- `open -f`でテキストエディタ上に開く。

これで、

- Gatsby 向けに書いた記事をコピーする
- スクリプトを実行する
- 変換されて、テキストとしてアウトプットされる

といった感じで使えるようになりました、やったね。

…

**まあ、ShellScript 初見で挑んで**  
**こんな簡単に終わったわけがないんですけど**

## 詰まったところ

Q. `pbpaste`使うなら相方の`pbcopy`でコピーすればスマートじゃね？  
A. **何故か知らないんですけどそれができなかったのです。**  
できなかったので、妥協案として「テキストエディタ上に開く」という動作にしました。  
これはこれでファイルが生成されないのでスマートです。

以上です。
`pbcopy`使えないじゃん！って気づくのに 1 時間位かかりました。

### 参考

[sed を使って": 1 not defined in the RE"などと出たらキャプチャの構文が間違っている Bye Bye Moore](https://shuzo-kino.hateblo.jp/entry/2017/06/21/235134)

[文字コードと改行コード UNIX & Linux コマンド・シェルスクリプト リファレンス](https://shellscript.sunone.me/character_code.html)

[［clip / pbcopy・pbpaste］クリップボードにコピー \| 日経クロステック（xTECH）](https://xtech.nikkei.com/it/atcl/column/15/042000103/080400036/)
