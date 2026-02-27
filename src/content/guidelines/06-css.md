---
title: "CSSコーディング"
sectionId: "section-css"
order: 6
subsections:
  - id: "css-basic"
    title: "基本・バリデーション"
  - id: "css-normalize"
    title: "デフォルトスタイルシートのノーマライズ"
  - id: "css-selector-name"
    title: "セレクタの命名規則"
  - id: "css-shorthand"
    title: "ショートハンド"
  - id: "css-media-rule"
    title: "@media 規則"
  - id: "css-unit"
    title: "単位などの省略"
  - id: "css-link-color"
    title: "リンクの文字色"
  - id: "css-font-family"
    title: "font-family の指定"
  - id: "css-z-index"
    title: "z-index の値"
  - id: "css-web"
    title: "Web フォントやアイコンの利用"
  - id: "css-modern"
    title: "モダン CSS プロパティ"
  - id: "css-css-hack"
    title: "CSSハック"
  - id: "css-halfway"
    title: "中間制作物"
---

<h3 id="css-basic">基本・バリデーション</h3>

#### 基本的な考え方

CSS はメンテナンス性と再利用性を考慮すること。各ブロックのモジュール化を意識し、HTML の記述と合わせて、あるブロックを他のページにそのまま移動したり、同一ブロック内で要素が多少変更されたとしても（ul 要素 → ol 要素や段落の追加など）、レイアウトや見た目が変化しないように考慮し、モジュールの使い回しを容易にすること。

セレクタによる詳細度を極力高くしないように心がけ、単一セレクタによる記述を基本とする。また、要素セレクタの使用はなるべく避け、HTML 側の変更によって CSS の変更まで行わなければならなくなる事態を極力避けるよう配慮すること。

```css badcode
/* 非推奨 */
.block-header ul.block-main-nav li a {...}
```

```css
/* 推奨 */
.block-main-nav a {...}
```

#### フォーマット

- CSS は宣言ブロック部分に必ずインデントを入れること。
- セレクタと "{" の間には半角スペースを 1つ入れる。さらに、プロパティと ":" は続けて記述し、その後ろに半角スペースを 1つ入れた上で、値を記述する。
- すべての宣言ブロック末尾には ";" を付与すること。
- 規則集合ごとに 1行改行を入れて記述する。
- 複数のセレクタをカンマ区切りで記述する場合は、セレクタごとに改行する。
- プリプロセッサやビルドツールによる最終納品物からの改行やインデント等の自動削除は問題ない。

```css badcode
/* 非推奨 */
.example {
color:red;
margin:0
}
.sample{color:red;margin:0}
```

```css
/* 推奨 */
.example {
  color: red;
}

.sample {
  ...
}
```

```css badcode
/* 非推奨 */
h1,h2,h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

```css
/* 推奨 */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

#### バリデーション

[W3C CSS 検証サービス](https://jigsaw.w3.org/css-validator/)によるバリデーションを行うこと。特にスペルミスや記述ミスは確実にチェックし、排除すること。なお、プリプロセッサやビルドツールを用いたバリデーション、あるいはエディタの機能として提供されている機能（Stylelint 等）を利用したバリデーションでも構わない。

<h3 id="css-normalize">デフォルトスタイルシートのノーマライズ</h3>

デフォルトスタイルシートのノーマライズには、下記の選択肢から適切なものを使用する。リセット CSS の使用は非推奨とする。

- [modern-normalize](https://github.com/sindresorhus/modern-normalize) — 軽量で現代的なブラウザ向けのノーマライズ
- [Normalize.css](https://necolas.github.io/normalize.css/) — 従来の実績あるノーマライズ
- Tailwind CSS の Preflight（Tailwind CSS を使用する場合）

<h3 id="css-selector-name">セレクタの命名規則</h3>

セレクタとなる class 属性名、id 属性名は、セマンティクスを意識した命名規則を用いること。また、キャメルケースは用いず、"-"（ハイフン）による連結を原則とする。

```css badcode
/* 非推奨 */
.blockHeader {...}
.mainNavigation {...}

.red {...}
.h1 {...}
```

また、レイアウト、モジュール、テキストへの意味づけ等、用途別に先頭文字列を分類するなど、class 名や id 名からセレクタの用途がある程度推測できるなどが望ましい。セレクタの命名規則に関しては、下記を基準とする。

`layout-`
: Web ページ内のレイアウトに用いられる要素には `layout-` から始まる class 名を使用する。

`block-`
: 各ページに共通の要素ブロックなどは `block-` から始まる class 名を使用する。原則として `layout-` の子要素のみに使用する。

`module-`
: `block-` 内でそのまま他の場所に抜き出しても意味が通じる程度のまとまりとなった要素ブロックに付ける。原則として `block-` の子要素のみに使用する。

`elm-`
: `module-` 内で単一の要素にスタイルを当てるために使用する class 名は `elm-` から始める。原則として `module-` の子要素のみに使用する。

状態の変化
: `block-` や `module-`、`elm-` がスクリプトなどによって変化した状態を示すマークアップは、WAI-ARIA / state を利用することが望ましい。ただし、WAI-ARIA / state では語彙が足りない場合（active など）に関しては `state-` から始まる class 名を使用する。

```css
/* 推奨 */
.layout-main-content {...}
.layout-sub-content {...}

.block-header {...}
.block-main-nav {...}
.block-section {...}

.module-section-header {...}
.module-page-title {...}

.elm-pub-time {...}
.elm-caution {...}
```

```html
<!-- 推奨 -->
<ul class="module-sub-menu" aria-expanded="true">
  <li class="state-active">
  ...
```

```css
/* 推奨 */
.module-sub-menu[aria-expanded="true"] {...}
.state-active {...}
```

なお、Tailwind CSS や CSS Modules などのユーティリティファースト・スコープベースの手法を採用する場合は、本命名規則に縛られず、各手法の推奨規則に従うこと。

<h3 id="css-shorthand">ショートハンド</h3>

極力ショートハンドプロパティを使用する。

```css badcode
/* 非推奨 */
font-family: "Hiragino Kaku Gothic ProN", Sans-Serif;
font-size: 100%;
font-style: normal;
font-weight: bold;
line-height: 1.6;
margin-bottom: 1em;
margin-left: 1em;
margin-right: 1em;
margin-top: 1em;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
```

```css
/* 推奨 */
font: normal bold 100%/1.6 "Hiragino Kaku Gothic ProN", Sans-Serif;
margin: 1em;
padding: 0 1em 2em;
```

ただし、font 関連プロパティのショートハンドに関しては、記述順などが煩雑なことや、スタイルの継承が複雑になる場合もあるため、メンテナンス性や記述ミスのリスクを考慮して、無理に使用する必要はない。body 要素に対しての指定のみにとどめるなど、実装時に判断する。

<h3 id="css-media-rule">@media 規則</h3>

HTML ガイドラインにて、link 要素に対する media 属性の使用は原則として禁止しているため、メディアクエリに関しては CSS ファイル内での @media 規則のみ許可する。

ただし、プリント用 CSS を記述する場合は、CSS ファイルの末尾に記述すること。また、原則として CSS ファイル内での @import 規則の使用は禁止する。

<h3 id="css-unit">単位などの省略</h3>

値が 0 となるプロパティに関しては、単位を省略して記述すること。

```css
margin: 0;
padding: 0;
```

また、line-height プロパティの値も原則として単位を省略して記述すること。

```css
line-height: 1.5;
```

値が 0 以下の数値となる場合、0 は省略して記述すること。

```css
opacity: .8;
font-size: .875em;
```

<h3 id="css-link-color">リンクの文字色</h3>

リンクの文字色は、`:link`、`:visited`、`:hover` それぞれに必ず異なる文字色を設定すること。

```css
a {
  color: #52a437;
  text-decoration: none;
}

a:visited {
  color: #428bca;
}

a:hover {
  color: #fc4f00;
  text-decoration: underline;
}

a:active {
  color: #fc4f00;
}
```

リンクの下線はデザイン要件により非表示にしてもよいが、本文内など、通常のテキストとリンクテキストが混在する部分では、下線やアイコンを付与するなどして通常のテキストとの差異を明確にし、リンクがわかりやすいように配慮すること。

<h3 id="css-font-family">font-family の指定</h3>

font-family プロパティの指定は下記を標準とする。

```css
body {
  font-family: system-ui, "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
               "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif;
}
```

ビルドツールや CSS フレームワーク（Tailwind CSS など）を使用する場合は、各ツールの設定ファイルでフォントスタックを定義すること。

<h3 id="css-z-index">z-index の値</h3>

z-index プロパティの値は下記の範囲、及びルールに従い指定する。

- 使用可能な数値の範囲：**0〜5000 まで、10 刻み** を基本とする。
  - 10 刻みとする理由はメンテナンス等でどうしても既存要素の中間となる値を指定しないといけなくなった場合に備えて。
- スタート数値はある要素群の役割ごとに変えてもよい。例えばロールオーバーする要素は 1000 番台から始めるなど。
- オーバーレイなど、確実に他の要素より上部に表示されないと困る要素群に対しては 4000 以上の値を指定する。
- 大規模サイトで上記ルールでは数値が足りなそうなことが想定される場合はこの限りではない。

<h3 id="css-web">Web フォントやアイコンの利用</h3>

Web フォントやアイコンフォントの利用は可能。アイコンについては、SVG アイコン（インライン SVG またはスプライト）の利用を推奨する。アイコンフォントを利用する場合は [Font Awesome 6.x](https://fontawesome.com/) などを推奨する。

第三者が提供するフォントを使用する場合は、[ライセンスのセクション](#other-license)も確認すること。

<h3 id="css-modern">モダン CSS プロパティ</h3>

現代の CSS で追加された新しいプロパティは積極的に利用して構わない。当社が定めた動作検証ブラウザでサポートされているプロパティは原則として使用可能。

下記はよく利用されるモダン CSS の例。

- `border-radius`、`text-shadow`、`box-shadow`、`linear-gradient` — 広くサポートされており問題なく使用可能。
- CSS カスタムプロパティ（変数）：`--color-primary: #333;` — テーマ管理やコンポーネント設計に積極的に活用すること。
- CSS Grid / Flexbox — レイアウトには積極的に使用すること。
- `clamp()`、`min()`、`max()` — レスポンシブなサイズ指定に有効。
- `:is()`、`:where()`、`:has()` — セレクタの簡潔化に活用できる。
- `@container`（コンテナクエリ）— ビューポートではなく親要素の幅に基づいてスタイルを切り替えられる。コンポーネント単位のレスポンシブデザインに活用できる。
- `@layer`（カスケードレイヤー）— スタイルの優先順位をレイヤー単位で明示的に制御できる。サードパーティ CSS との詳細度の競合を防ぐのに有効。

サポート対象ブラウザでサポートされていないプロパティを使用することで、閲覧に支障が出るほどレイアウトが大きく崩れたり、アクセシビリティを損ねるような状態になることが予想される場合には、フォールバックを用意すること。

<h3 id="css-css-hack">CSSハック</h3>

CSS ハックは原則として使用しないこと。やむを得ない場合のみ使用できるが、CSS ファイル内の末尾などにまとめて記述し、標準的なスタイルの記述と混ぜないこと。

<h3 id="css-halfway">中間制作物</h3>

ビルドツールやプリプロセッサを使用する場合、最終納品物（Web サイトで読み込まれる CSS ファイル）と、実際に編集している Sass ファイル等の間に、改行、コメントを残し、1ファイルにまとめた CSS ファイルを中間制作物として必ず出力するようにすること。CSS によるコードレビューが必要な場合などに配慮して。

通常は、中間制作物となる CSS ファイルからコメント、改行等を取り除いた（Minify した）ものが最終納品物となる。
