---
title: "コーディング全般"
sectionId: "section-coding"
order: 4
subsections:
  - id: "coding-basic"
    title: "基本"
  - id: "coding-git"
    title: "バージョン管理"
  - id: "coding-server-path"
    title: "ディレクトリ構成"
  - id: "coding-file-name"
    title: "ファイル名の基本ルール"
  - id: "coding-browser-version"
    title: "動作検証ブラウザ"
  - id: "coding-charset"
    title: "文字コード"
  - id: "coding-indent"
    title: "インデントルール"
  - id: "coding-letter"
    title: "大文字小文字"
  - id: "coding-comment"
    title: "コメント"
  - id: "coding-viewport"
    title: "viewport"
  - id: "coding-scheme"
    title: "スキームの記述"
  - id: "coding-library"
    title: "ライブラリ・フレームワーク"
---

<h3 id="coding-basic">基本</h3>

納品は、クライアントが Git および GitHub の使用、操作に慣れている場合は、プロジェクトで使用しているリポジトリに、クライアント担当者を招待することで引き継ぎを行う。そのまま運用・更新を当該リポジトリで行う場合は、別途ブランチの作成ルール、コミットやプルリクエストのルールなどを事前にクライアントとの間で決めておくこと。

納品後に希望される場合は、リポジトリの移管も可能。その場合は移管先リポジトリをクライアントに用意して頂いた上で、手順に基づいて移管する。

上記以外で、クライアントが Git および GitHub を使用できない事情がある場合は、HTML、CSS、JavaScript 等ファイル、及び画像を含む、Web サイトを構成するリソース一式を、クライアントサーバにアップロードした状態で納品とする。

Git 管理外にある、例えば外部 CDN から直接読み込まれた JavaScript ライブラリや CMS、および使用プラグインに関してはその情報を 1つのドキュメントにまとめてディレクターに提出すること。

また、クライアントサーバへのアップロードにて納品する場合、Sass ファイルや、プリプロセスされた中間制作物一式（[中間制作物のセクション](#css-halfway)を参照）は、特に要望がない限りはクライアントへは納品しない。元のファイル群が Git 管理されていることをクライアントに説明し、納品物への直接の編集は、差分や修正履歴の把握が難しくなることを前提として共有すること。

<h3 id="coding-git">バージョン管理</h3>

バージョン管理には Git、および GitHub を使用する。新規リポジトリの作成に当たっては別途定める社内ルールに基づいてディレクターが申請を行うこと。プロジェクトに使用されるリポジトリはすべてプライベートリポジトリとし、会社契約以外の個人リポジトリをプロジェクトに使用することなどは一切禁止する。

ただし、クライアントからの指定で、クライアントが管理するリポジトリでの作業を行う場合などは、クライアントからの指示、要望に従って対応すること。

なお、デザインデータに関しては、GitHub にはアップロードしないこと。

<h3 id="coding-server-path">ディレクトリ構成</h3>

既存の Web サイトを踏襲する場合やクライアントからの指定がある場合等を除き、基本的なディレクトリ構成は下記の通りとする。

```
htdocs/
├── index.html
├── css/
│   └── style.css
├── img/
│   ├── share/
│   │   └── logo.png
│   └── service/ (例)
│       └── image.png
├── inc/
│   └── header.inc
└── js/
    └── function.js
```

スタイルシートは css ディレクトリへ、同様に、画像、インクルード用ファイル、JavaScript ファイルをそれぞれのディレクトリに格納する。画像は全ページ共通で使用するものを share ディレクトリへ、その他は使用するページのディレクトリ構成に合わせて格納する。

フレームワークやビルドツールを利用する場合は、そのツールの標準的なディレクトリ構成に準じること。

<h3 id="coding-file-name">ファイル名の基本ルール</h3>

画像などのファイル名は下記の基本ルールに則って付ける。

- 区切り文字はハイフン（`-`）を使用する。
- 大文字小文字を混ぜず、すべて小文字で付ける。
- 同じ種別のファイルは頭に同じ接頭辞を付ける。例えば、バナー関連なら `bnr-` など。
- 背景画像は頭に `bg-` という接頭辞を付ける。
- 例えば同じ内容の画像でサイズが異なる場合はサイズを入れたり（例：`example-200x50.png`）、デバイスピクセル比を入れたりしてわかりやすくする（例：`example-x2.png`）。
- ある class 名に対応する画像は、class 名と同じファイル名を付けるなどわかりやすくするとよい（例：`bg-module-section-header.png`）。

[ディレクトリ構成のルール](#coding-server-path)とあわせて、第三者が見てもわかりやすいファイル名を心がけること。

<h3 id="coding-browser-version">動作検証ブラウザ</h3>

当社が標準で保証する動作環境ブラウザは下記の通りとする。このセクションは 6ヶ月ごとに見直される。

#### パソコン

- Microsoft Edge（Chromium 版）最新版および 1つ前のバージョン
- Google Chrome 最新版および 1つ前のバージョン
- Safari 最新版および 1つ前のバージョン
- Mozilla Firefox 最新版および 1つ前のバージョン

#### スマートフォン

スマートフォン OS に関しては、原則としてプロジェクト開始時点における最新リリースから 1 バージョン前までを動作確認対象とする。

- iOS Safari（最新版および 1つ前のメジャーバージョン）
- Android Chrome（最新版）

#### その他

ヘルプページ等に対応ブラウザ（推奨環境）を記載する場合は、上記動作検証ブラウザを踏まえ、下記の記述を基本とする。

---

JavaScript、スタイルシート、画像表示が有効になっている下記のブラウザソフト

- Microsoft Edge 最新版
- Google Chrome 最新版
- Safari 最新版
- Mozilla Firefox 最新版

---

#### プログレッシブエンハンスメント

上記、動作検証ブラウザに含まれない旧式ブラウザに関しても、最低限必要な操作、情報の取得ができるよう、スタイルシートを無効にした場合の構造には配慮すること。例えばある CSS プロパティが解釈されなかったときに、重要な情報が表示されない、といったことが起こらないように最低限の配慮は必要。一方で多少のレイアウト崩れや装飾目的の画像の表示がされないといった問題に関しては気にする必要はない。

[HTML コーディング → アクセシビリティのセクション](#html-accessibility)や、[JavaScript → 基本・バリデーションのセクション](#javascript-basic)等もあわせて参照のこと。

<h3 id="coding-charset">文字コード</h3>

Web サイトの文字コードは、特別な指定がない限り UTF-8 (no BOM) を使用すること。HTML 文書においては、`<meta charset="utf-8" />` を head 要素内の可能な限り上部（基本的には最初の子要素として）に記述すること。

<h3 id="coding-indent">インデントルール</h3>

インデントを行う場合、タブ文字は使用しないこと。エディタの設定等で **1タブ = 2半角スペース** に設定し、1階層の字下げは 2半角スペースを基準とする。HTML のインデントは任意。CSS は宣言ブロック部分に必ずインデントを入れること。

```html
<!-- 推奨 -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
```

```css
/* 推奨 */
.example {
  color: red;
}
```

```css badcode
/* 非推奨 */
.example {color: red;}
.example{
color:blue;
}
```

CSS においては、@media 規則内に記述した規則集合を、すべて 1階層インデントすること。

```css
/* 推奨 */
@media (min-width: 1200px) {
  .block-container {
    max-width: 970px;
  }
}
```

ただし、プリプロセッサやビルドツールを使用する場合においては、最終的な納品物からインデントや改行が削除されていてもよい。元のコーディングファイル、あるいは中間制作物はこのフォーマットに従うこと。

<h3 id="coding-letter">大文字小文字</h3>

HTML の要素名、属性名、および CSS 内のカラーコード等はすべて小文字で統一すること。また、画像をはじめとしたファイル名などでも大文字小文字を混在させたりしないこと。

```html badcode
<!-- 非推奨 -->
<A HREF="/sample/"><IMG SRC="sampleImage.png" ALT="Sample" /></A>
```

```html
<!-- 推奨 -->
<a href="/sample/"><img src="sample-image.png" alt="Sample" /></a>
```

```css badcode
/* 非推奨 */
.example {
  color: #E5E5E5;
}
```

```css
/* 推奨 */
.example {
  color: #e5e5e5;
}
```

<h3 id="coding-comment">コメント</h3>

HTML、CSS、JavaScript 共にわかりやすくコメントを付けること。ただし、プリプロセッサやビルドツールを使用する場合においては、最終的な納品物にコメントが含まれなくてもよい。元のコーディングファイル、あるいは中間制作物にコメントが残るようにすること。

HTML において、要素の閉じタグを認識するためにコメントを入れる場合は、下記のように「//」に続けて該当する要素の class 名、id 名を記述するルールに従う。

```html
<div class="example">
  <p>...</p>
<!--//.example--></div>
```

```html
<div id="example">
  <p>...</p>
<!--//#example--></div>
```

また、HTML 文書内で不要になった要素ブロックや、CSS ファイル内の不要なスタイル宣言等を、一時的な場合を除いてコメントアウトで長い期間運用することは推奨しない。

<h3 id="coding-viewport">viewport</h3>

viewport に関しては、原則として下記の記述を標準とする。

```html
<!-- 推奨 -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

ユーザーによる拡大縮小ができなくなるため、下記の記述を使用してはいけない。

```html badcode
<!-- 禁止 -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
```

#### 補足

なお、ページ幅が固定されている Web ページの場合、viewport meta を記述しない、もしくは数値を指定して記述する。

```html
<meta name="viewport" content="width=640px" />
```

<h3 id="coding-scheme">スキームの記述</h3>

外部 CDN からの JavaScript ライブラリ読み込み等を行う場合、URI のスキーム（http: / https:）はすべて `https://` から記述すること。

```html badcode
<!-- 非推奨 -->
<script src="http://example.com/library.min.js"></script>
```

```html badcode
<!-- 非推奨 -->
<script src="//example.com/library.min.js"></script>
```

```html
<!-- 推奨 -->
<script src="https://example.com/library.min.js"></script>
```

原則として HTTPS で提供されない第三者サーバからのライブラリの読み込みは禁止する。また配信先ドメイン所有者の信頼性については事前に確認すること。

<h3 id="coding-library">ライブラリ・フレームワーク</h3>

CSS / JavaScript ライブラリやフレームワークの利用はプロジェクトの要件に応じて選択可能。ただし、使用するライブラリやフレームワークに関してはメンテナンスが継続されていること、バグフィックスや脆弱性への対応等が、適切に行われていることを重視して選択すること。また、各ライブラリ、フレームワークの利用規約、ライセンスは必ず確認し、不明な点がある場合はディレクターに相談すること。

OSS については Fork した上で、クライアントの要望に合わせて利用することも可能だが、継続的なメンテナンスが可能、かつ会社としてメリットがある場合のみとする。

また、使用したライブラリ・フレームワークは一覧できるように別途ドキュメントに記載すること。
