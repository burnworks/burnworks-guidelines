---
title: "パフォーマンス"
sectionId: "section-performance"
order: 10
subsections:
  - id: "performance-basic"
    title: "基本"
  - id: "performance-core-web-vitals"
    title: "Core Web Vitals"
  - id: "performance-imagemin"
    title: "画像の最適化"
  - id: "performance-cssmin"
    title: "CSS の最適化"
  - id: "performance-javascriptmin"
    title: "JavaScript の最適化"
  - id: "performance-server"
    title: "サーバサイドでの設定"
  - id: "performance-prefetch"
    title: "リソースの先読み"
---

<h3 id="performance-basic">基本</h3>

Web ページの表示速度、反応速度に関して、フロントエンド側で対応できる部分に関しては可能な限り配慮すること。

#### HTML 側での配慮

HTML での配慮については、[CSS や JavaScript ファイルの読み込みのセクション](#html-include)を参照のこと。

#### パフォーマンスチェック

[PageSpeed Insights](https://pagespeed.web.dev/) によるパフォーマンスチェックを必須とする。目安は PC で 85 点以上、モバイルで 75 点以上。

ただしこれを下回った場合でも、すでにやるべきことができているのであれば問題はない。特にスマートフォン向けに最適化されていないサイトのモバイル項目の数値は低く出るので、実機テストにおいて著しく操作性が低いといった問題がない場合は不問。

<h3 id="performance-core-web-vitals">Core Web Vitals</h3>

Google が定める Core Web Vitals はユーザー体験を測定する重要な指標であり、SEO にも影響する。下記 3 指標の改善を目標とすること。

| 指標 | 意味 | 目標値 |
|------|------|--------|
| **LCP**（Largest Contentful Paint） | 最大コンテンツの描画時間 | 2.5 秒以下 |
| **INP**（Interaction to Next Paint） | インタラクションの応答性 | 200 ミリ秒以下 |
| **CLS**（Cumulative Layout Shift） | 累積レイアウトシフト | 0.1 以下 |

#### LCP 改善のポイント

- ヒーロー画像などに `fetchpriority="high"` を付与する
- `<link rel="preload">` でクリティカルリソースを先読みする
- 画像の最適化（WebP / AVIF 形式、適切なサイズ）
- サーバ応答時間の短縮

#### CLS 改善のポイント

- 画像や動画には `width` / `height` 属性を必ず指定する
- 広告や動的コンテンツの埋め込みに十分なスペースを確保する
- Web フォントの読み込みには `font-display: swap` を使用する

#### INP 改善のポイント

- JavaScript の長時間実行タスクを分割する
- 不要な JavaScript の読み込みを排除する
- イベントハンドラの処理を軽量化する

<h3 id="performance-imagemin">画像の最適化</h3>

画像は用途に応じて適切なフォーマットを選択すること。

- **写真・複雑な画像**：WebP または AVIF 形式を推奨（JPEG はフォールバック用）
- **ロゴ・アイコン・図版**：SVG を推奨
- **シンプルなグラフィック**：PNG（8ビットカラー / アルファチャンネル可）

ブラウザが対応している場合は WebP や AVIF を使用し、`<picture>` 要素で対応を確認してから配信すること。

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="説明" width="800" height="600" />
</picture>
```

#### 画像圧縮ツール

- [Squoosh](https://squoosh.app/) — ブラウザ上で様々な形式に変換・圧縮可能
- [TinyPNG](https://tinypng.com/) — PNG / JPEG の圧縮
- [SVGOMG](https://jakearchibald.github.io/svgomg/) — SVG の最適化

ビルドツールを使用する場合は `sharp`、`imagemin` 等のプラグインで自動最適化すること。

#### Retina 対応

JPEG / PNG 画像の Retina 対応については、表示サイズの 2 倍サイズで画像を用意した上で、WebP で高圧縮することで見た目とファイルサイズのバランスが最もよい場合がある。

<h3 id="performance-cssmin">CSS の最適化</h3>

CSS は必ず 1 ファイルにまとめ、CSS ファイル内での @import 規則は使用しないこと（ビルドツールのバンドル処理に任せる場合を除く）。また、セレクタは簡略に記述し、スタイルの上書きが頻繁に行われないように配慮することでパフォーマンスは向上する。

Sass 等を使用する場合は、ネストが深くなりすぎないように注意。またはメディアクエリが複数の場所に分散したりしないように配慮すること。また、実際にページで読み込まれる CSS は必ず Minify すること。

また、メンテナンス等により、使われていないスタイル宣言が大量に残ったままになるなど、ファイルサイズを無駄に肥大化させる記述は、ツール（PurgeCSS 等）などを用いてなるべく早期に排除するよう心がける。

<h3 id="performance-javascriptmin">JavaScript の最適化</h3>

複数の JavaScript ファイルを使用する場合は、なるべく 1 ファイルにまとめること（ビルドツールのバンドル処理に任せてよい）。実際に読み込まれる JavaScript は必ず Minify し、ファイルサイズを最適化すること。

Google Analytics のトラッキングコード、各 SNS のシェアボタン系コードなどは、必ず最新のコードを使用すること。また、[CSS や JavaScript ファイルの読み込みのセクション](#html-include)を参照し、`defer` 属性を可能な限り使用する。

#### Google タグマネージャ

可能な限り、Google タグマネージャの利用を推奨する。Google Analytics のトラッキングコードも Google タグマネージャから配信すれば個別にコードをページに入れる必要はない。

#### コード分割

モダンなビルドツール（Vite 等）を使用する場合は、dynamic import によるコード分割を活用し、初期読み込みを最小化すること。

```javascript
// 必要な時だけ読み込む
const module = await import('./heavy-module.js');
```

<h3 id="performance-server">サーバサイドでの設定</h3>

下記の設定がサーバ側で可能な場合はできる限り行うこと。

#### 圧縮転送

gzip または Brotli による圧縮転送を有効にすること。Apache の場合は mod_deflate / mod_brotli が有効であれば .htaccess に下記の記述で有効にできる。

```apache
<ifModule mod_deflate.c>
  SetOutputFilter DEFLATE
  SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|ico|webp|avif)$ no-gzip dont-vary
</ifModule>
```

#### キャッシュ設定

画像など、一度公開されれば変更される可能性が低いファイルはキャッシュを長めに設定する。

```apache
<ifModule mod_expires.c>
  ExpiresActive On
  <Files ~ "\.(gif|jpg|jpeg|png|webp|avif|ico|svg)$">
    ExpiresDefault "access 1 year"
  </Files>
  ExpiresByType text/css "access 1 month"
  ExpiresByType text/javascript "access 1 month"
  ExpiresByType application/javascript "access 1 month"
  ExpiresByType font/ttf "access 1 year"
  ExpiresByType font/woff2 "access 1 year"
</ifModule>
```

#### HTTP/2 以降

サーバ側で HTTP/2 または HTTP/3 の利用が可能であれば利用する。CDN（Content Delivery Network）の利用など、サードパーティのサービスを利用する場合はクライアントと協議の上決定すること。

<h3 id="performance-prefetch">リソースの先読み</h3>

チュートリアルなど、連続して次のページを読んでいくようなコンテンツの場合、あるいは、ほぼ次に移動する静的なページが決まっているような場合は、Link prefetching の利用が効果的な場合がある。

```html
<link rel="prefetch" href="step-2.html" />
```

なお、`rel="prerender"` はモダンブラウザでは廃止されており使用しないこと。代替として **Speculation Rules API** が利用可能。次に移動する可能性が高いページを JSON 形式で宣言的に指定することで、ブラウザがバックグラウンドでページのプリレンダリングを行う。

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "urls": ["step-2.html"]
    }
  ]
}
</script>
```

詳細は下記を参照。

- [rel=prefetch：MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/rel/prefetch)
- [Speculation Rules API によるページのプリレンダリング：Chrome Developers](https://developer.chrome.com/docs/web-platform/prerender-pages)
