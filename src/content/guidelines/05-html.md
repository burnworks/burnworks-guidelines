---
title: "HTMLコーディング"
sectionId: "section-html"
order: 5
subsections:
  - id: "html-validation"
    title: "基本・バリデーション"
  - id: "html-accessibility"
    title: "アクセシビリティ"
  - id: "html-document-type-definition"
    title: "文書型宣言"
  - id: "html-tag"
    title: "要素や終了タグの省略"
  - id: "html-semantics"
    title: "セマンティクス"
  - id: "html-include"
    title: "CSS や JavaScript ファイルの読み込み"
  - id: "html-type-attribute"
    title: "type 属性"
  - id: "html-structured-data"
    title: "構造化データ"
  - id: "html-ogp"
    title: "メタデータや OGP"
  - id: "html-conditional-comment"
    title: "条件付きコメント"
  - id: "html-anchor-link"
    title: "ページ上部へのアンカーリンク"
  - id: "html-svg"
    title: "SVG"
---

<h3 id="html-validation">基本・バリデーション</h3>

#### 基本的な考え方

HTML はメンテナンス性を考慮すること。各ブロックのモジュール化を意識し、CSS の記述と合わせて、あるブロックを他のページにそのまま移動したり、同一ブロック内で要素が多少変更されたとしても（ul 要素 → ol 要素や段落の追加など）、レイアウトや見た目が変化しないように考慮し、モジュールの使い回しを容易にすること。

HTML Living Standard で追加された新要素は適切に使用すること。また、input 要素の type 属性値などについても HTML Living Standard から追加された属性値を用途に応じて適切に使い分けること（`type="email"`、`type="number"`、`type="tel"`、`type="search"` など）。

id 属性は適切に使用すること。セレクタとしての利用も特に制限しないが、多用しすぎてメンテナンス性や再利用性が妨げられてはならない。

#### バリデーション

各要素は、HTML Living Standard のコンテンツモデルや使用できる文脈に基づき適切に記述すること。またアウトラインが適切かについて必ず確認すること。

また、納品前の HTML ファイルは、必ず [The W3C Markup Validation Service](https://validator.w3.org/nu/) によるチェックを行うこと。特に HTML タグの閉じ忘れといったミスは避ける。なお、バリデーションはビルドツール等によって行っても構わない。

<h3 id="html-accessibility">アクセシビリティ</h3>

WCAG 2.2 の **適合レベル A** に該当する達成基準を満たすことを社内基準とする。ただし、Web サイトの特性や要件によっては、適合レベル A 対象となる全項目にわたる適合を必須とするものではなく、また逆に 適合レベル AA、適合レベル AAA 項目を無視してよいということではない。WCAG 2.2 の全項目に関して適切な知識を持って制作にあたる。

最低限、下記の事柄についてはクリアすること。

- 各ページにはページの内容を推測しやすい適切なタイトルを必ず付けること。ページ分割等を行う場合も、（1/2ページ）などとページ数表記を入れるなどして、ページタイトルは Web サイト内で重複しないようにすること
- 画像には適切な代替テキストを付与する。代替テキストは、画像の内容を具体的に示すものとする（下記サンプル 1）
- 文字間隔の調整を空白文字を用いて行ってはならない
- 英単語をすべて大文字で記述することは避けること。`text-transform: uppercase;` などを適切に使用すること。
- 略称にはなるべく正式名称を abbr 要素を用いて付与する（下記サンプル 2）。
- 背景色と文字色には適切なコントラスト比を持たせる。
- ブラウザによる文字サイズの変更が可能なように実装すること。また、10px 以下のサイズの文字は重要でない注釈等を除いて原則として使用しないことが望ましい。
- 文字サイズ変更ボタンを Web ページ側で独自に提供しないこと（ブラウザの UI に任せる）。
- JavaScript が無効な環境を常に配慮すること。アコーディオンメニューなど、JavaScript によって開閉するような UI については、JavaScript が無効だった場合には開いた状態になるなど、重要な操作が JavaScript の無効によって不可能になるような実装は行わない。
- リンクアンカーとなるテキストは適切に選択すること。アンカーテキストに制約がある場合は、title 属性を併用すること（下記サンプル 3）。
- リンク領域、ボタンのサイズ等は適切なサイズを考慮すること。また、各リンクのマージンは適切にとり、誤クリックを誘発するような実装は行わないこと。
- PDF ファイルなど、HTML 以外のフォーマットへのリンクを提供する場合は、そのリンク先のフォーマットやファイルサイズがわかるようにしておくことが望ましい。
- フォームコントロールは、label 要素を適切に用いてラベルとの関連づけを行うこと。
- キーボードによる操作を考慮した実装を行うこと。

```html
<!-- サンプル 1 -->
<img
  src="photo.jpg"
  alt="熱海に行ったときに撮影した写真。海をバックに白壁の民家とペットの黒猫が写っています。"
/>
```

```html
<!-- サンプル 2 -->
<p>
  <abbr title="World Wide Web Consortium">W3C</abbr> は World Wide Web で使用される各種技術の標準化を推進する為に設立された標準化団体です。
</p>
```

```html badcode
<!-- サンプル 3 非推奨 -->
資料のダウンロードは<a href="/dl/">こちら</a>から
```

```html
<!-- サンプル 3 推奨 -->
<a href="/dl/">資料のダウンロードはこちらから</a>
```

また、ある要素（例えばナビゲーションなど）の位置固定表示（e.g. `position: fixed;`）を行う場合は、画面サイズが小さいときなどに画面外に要素がはみ出して閲覧できなくなるなどの可能性を十分に配慮する。

<h3 id="html-document-type-definition">文書型宣言</h3>

新規に作成する HTML 文書は、特別な指定がある場合を除いて HTML Living Standard を使用すること。文書型宣言は `<!DOCTYPE html>` と記述。大文字小文字も左記の通りとする。

MIME Type は `text/html` を指定すること。特別な指定がある場合を除いて、XHTML（`application/xhtml+xml`）は使用しないこと。

HTML は記述統一の観点から下記のルールに則って記述すること。

- 閉じタグは省略しないこと
- 空要素は必ず閉じること。`<br>` → `<br />`
- 属性値は必ず `" "` で囲むこと
- 論理属性は必ず 属性名="属性値" という記述にすること。`<input type="checkbox" checked />` → `<input type="checkbox" checked="checked" />`
- URL 内やテキストノード内の & は `&amp;` と文字参照で記述すること

ただし、静的サイトジェネレーターなど、フレームワークを使用した場合に空要素が閉じられなかったり、論理属性が属性名のみになるなど、フレームワーク側のデフォルト設定、あるいは仕様により避けられない場合は問題ない。一方でページによって記述方法にばらつきが出るようなことはないように注意すること。

<h3 id="html-tag">要素や終了タグの省略</h3>

HTML における省略可能な要素、あるいは終了タグの省略は原則として行わないこと。

```html badcode
<!-- 非推奨 -->
<title>example page</title>
<article>
  <h1>Example 1
  <p>This is example page.
```

```html
<!-- 推奨 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>example page</title>
  </head>
  <body>
    <article>
      <h1>Example 1</h1>
      <p>This is example page.</p>
    </article>
  </body>
</html>
```

本セクションにおける「省略可能な要素」とは、ある要素のコンテンツモデル上は必須だが、条件を満たすことで記述を省略することができるとされている要素（html 要素、head 要素、body 要素）がその対象となる。記述が任意の要素、例えば table 要素内における thead 要素、tbody 要素などはこの限りではない。

なお、要素に関わらず、終了タグの省略は禁止する。

#### 参考リンク（省略可能な要素）

- [13.1.2.4 Optional tags - HTML Standard](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags)

<h3 id="html-semantics">セマンティクス</h3>

要素の意味と異なる動作を与えたりしないこと。例えば div 要素や p 要素をクリックすることでリンクとして機能させたりといったことは行わない。リンクを設定したい場合は a 要素を使用すること。

```html badcode
<!-- 非推奨 -->
<div onclick="allEntries();">すべての記事一覧へ</div>
```

```html
<!-- 推奨 -->
<a href="/all/">すべての記事一覧へ</a>
```

また、class 名や id 名を要素に付与する際も命名規則にはセマンティクスを意識すること。

```html badcode
<!-- 非推奨 -->
<span class="red">注意してください</span>
```

```html
<!-- 推奨 -->
<span class="elm-caution">注意してください</span>
```

class 名や id 名の命名規則に関して詳しくは[セレクタの命名規則セクション](#css-selector-name)を参照。

<h3 id="html-include">CSS や JavaScript ファイルの読み込み</h3>

CSS を外部ファイルとして読み込む場合、パフォーマンスを考慮して 1ファイルにまとめること（ビルドツールを使用する場合はバンドル処理に任せてよい）。また、link 要素に対する media 属性の使用は原則として行わず、CSS ファイル内に @media 規則を用いて記述すること。また、原則として CSS ファイル内での @import 規則の使用、および HTML 文書内でのインライン・スタイルの記述は禁止する。

JavaScript の読み込みは、script 要素を body 要素の終了タグ直前に記述する。また、可能な場合は async 属性や defer 属性を付与してレンダリングブロックを避ける。なお、Google タグマネージャが使用できる場合は、導入することが望ましい。

```html badcode
<!-- 非推奨 -->
<link rel="stylesheet" href="base.css" media="screen" />
<link rel="stylesheet" href="grid.css" media="screen" />
<link rel="stylesheet" href="print.css" media="print" />
```

```html
<!-- 推奨 -->
<link rel="stylesheet" href="style.css" />
```

```html badcode
<!-- 非推奨 -->
<head>
  <script src="plugin.js"></script>
  <script src="function.js"></script>
</head>
```

```html
<!-- 推奨 -->
  <script src="plugin.js" defer="defer"></script>
  <script src="function.js" defer="defer"></script>
</body>
```

ただし、async 属性、defer 属性はスクリプトの依存関係等によって正常に動作しなくなる場合があるため、スクリプトの動作を優先してよい。

[パフォーマンスのセクション](#section-performance)もあわせて参照のこと。

<h3 id="html-type-attribute">type 属性</h3>

link 要素による CSS の読み込み時や、script 要素に対して type 属性は付与せず省略する。

```html badcode
<!-- 非推奨 -->
<link rel="stylesheet" href="style.css" type="text/css" />
```

```html
<!-- 推奨 -->
<link rel="stylesheet" href="style.css" />
```

```html badcode
<!-- 非推奨 -->
<script src="https://example.com/library.min.js" type="text/javascript"></script>
```

```html
<!-- 推奨 -->
<script src="https://example.com/library.min.js"></script>
```

<h3 id="html-structured-data">構造化データ</h3>

HTML 文書に対する構造化データの付与は、JSON-LD を推奨する（Microdata、RDFa Lite も可）。語彙は [schema.org](https://schema.org/) を原則として使用すること。ただし、構造化データの付与自体は必須ではない。

構造化データのテストには、Google の [リッチリザルト テスト](https://search.google.com/test/rich-results) を推奨する。

<h3 id="html-ogp">メタデータや OGP</h3>

#### メタデータ

`<meta name="description" />` に関しては、主要なページでは設定しておく事。その際、重複が発生しないように注意。主要でないページで description が重複するくらいであれば最初から記述しない事。

`<meta name="keywords" />` に関しては記述不要。

#### OGP

トップページに関しては原則として OGP の記述を入れておく事。その他、商品ページなど重要なページに関してはクライアントとの取り決め、もしくはディレクター、実装担当者の判断で記述する。下記に標準的な OGP 設定のサンプルを示す。

```html
<!-- トップページへの記述例 -->
<meta property="og:title" content="サイト名" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:description" content="サイトの説明" />
<meta property="og:image" content="https://example.com/img/1200x630.png" />
<meta property="og:type" content="website" />
```

```html
<!-- 個別ページ（商品ページやニュース記事）への記述例 -->
<meta property="og:title" content="記事タイトル" />
<meta property="og:url" content="https://example.com/article/1/" />
<meta property="og:site_name" content="サイト名" />
<meta property="og:description" content="記事の説明" />
<meta property="og:image" content="https://example.com/img/article/1200x630.png" />
<meta property="og:type" content="article" />
```

<h3 id="html-conditional-comment">条件付きコメント</h3>

条件付きコメントの使用は禁止する。

```html badcode
<!-- 非推奨 -->
<!--[if IE 8]>
 ...
<![endif]-->
```

<h3 id="html-anchor-link">ページ上部へのアンカーリンク</h3>

ページ上部に移動するためのページ内リンク（所謂アンカーリンク）として使用する a 要素の href 属性値には `#top` を指定すること。HTML Living Standard においては、`#top` を指定することで自動的にページ上部へのリンクとして機能する。

```html
<a href="#top">このページの上部へ</a>
```

<h3 id="html-svg">SVG</h3>

スクリプトを伴わない SVG データに関しては img 要素での埋め込みを推奨する。スクリプトを伴う場合は、iframe、もしくは object 要素による埋め込みを推奨。文書内への svg 要素による直接記述（インライン SVG）は、アニメーションやスタイル制御が必要な場合、またはアイコンの再利用を目的とする場合（`<use>` 要素を使ったスプライト）に活用できる。
