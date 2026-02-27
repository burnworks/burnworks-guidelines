---
title: "JavaScript"
sectionId: "section-javascript"
order: 7
subsections:
  - id: "javascript-basic"
    title: "基本・バリデーション"
  - id: "javascript-quotation-mark"
    title: "シングルクォーテーションとダブルクォーテーション"
  - id: "javascript-semicolon"
    title: "セミコロン"
  - id: "javascript-function"
    title: "変数 / 関数の命名規則"
  - id: "javascript-function-declaration"
    title: "ブロックの中での関数宣言"
  - id: "javascript-jquery"
    title: "jQuery"
---

<h3 id="javascript-basic">基本・バリデーション</h3>

#### 基本的な考え方

操作、および情報の取得に影響する部分については、常に JavaScript が無効な環境を考慮すること。それらに影響のない、装飾的な部分に関してはその限りではない。

Web サイトのパフォーマンスを重視し、本質的でない不要な処理を入れないこと。また、モダンブラウザが標準で提供する Web API（`fetch`、`IntersectionObserver`、`ResizeObserver`、`querySelectorAll` 等）を積極的に活用し、外部ライブラリへの依存を最小化すること。

TypeScript の使用を推奨する。型安全なコードはバグの早期発見とメンテナンス性の向上に貢献する。

#### バリデーション・静的解析

[ESLint](https://eslint.org/) を使用した静的解析を推奨する。TypeScript を使用する場合は `@typescript-eslint` プラグインを合わせて導入すること。

ESLint の設定例（`eslint.config.js`）：

```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
```

<h3 id="javascript-quotation-mark">シングルクォーテーションとダブルクォーテーション</h3>

統一感の問題から、シングルクォーテーションを基本とする。ただし、TypeScript / モダン JavaScript ではテンプレートリテラル（バッククォート）の積極的な活用を推奨する。

```javascript
const message = 'Hello, World!';
const greeting = `Hello, ${name}!`;
```

<h3 id="javascript-semicolon">セミコロン</h3>

セミコロンの省略は行わないこと。JavaScript ではセミコロンの省略が許されるが、セミコロンの挿入を処理系に任せた結果、自動補完が意図せず行われたり、または行われないことでエラーが発生し、デバッグが困難になる等の問題が想定されるため。

<h3 id="javascript-function">変数 / 関数の命名規則</h3>

変数名 / 関数名は原則として、キャメルケースを使用する。変数名 / 関数名における「`$`」は使用禁止。

変数の宣言には `const` を基本とし、再代入が必要な場合のみ `let` を使用すること。`var` は使用禁止。

```javascript
const firstName = 'taro';
```

```javascript
function getListElement() {
  // ...
}
```

アロー関数を積極的に使用すること。

```javascript
const getListElement = () => {
  // ...
};
```

#### コンストラクタ関数 / クラス

コンストラクタ関数やクラス名の先頭は大文字とする。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const taro = new Person('taro', 32);
```

#### 定数

定数はすべて大文字で記述し、単語間をアンダースコア（`_`）で接続する。

```javascript
const API_KEY = 'b6lC50HCr4mA';
```

<h3 id="javascript-function-declaration">ブロックの中での関数宣言</h3>

ブロック内での関数宣言は、実行環境によって挙動が一致しない場合があり、可読性も低下するため推奨しない。

```javascript badcode
// 非推奨
if (x) {
  function foo() {}
}
```

ブロック内で関数を定義したい場合は、関数式（またはアロー関数）を使用する。

```javascript
// 推奨
if (x) {
  const foo = () => {};
}
```

<h3 id="javascript-jquery">jQuery</h3>

jQuery の使用は原則として推奨しない。モダンブラウザの Web API を使えばほとんどの処理をバニラ JavaScript で実現できる。新規プロジェクトでは jQuery を導入しないことを基本とする。

ただし、下記の場合は使用を検討してよい。

- 既存プロジェクトで jQuery が使われており、追加の依存関係となることが許容される場合
- クライアントの要件により特定の jQuery プラグインの使用が求められる場合

要件により使用する場合は 3.x 系の最新版を使用すること。

#### プラグイン

jQuery プラグインの利用に特に制限はないが、メンテナンスが継続されていること、軽量であることを重視して選択すること。また動作検証ブラウザにおいてプラグインを使用しなくても実装可能な方法があればそちらを優先すること。

プラグインの動作を理由に読み込む jQuery のバージョンを下げることは禁止する。最新の jQuery で動作しないプラグインは利用不可。

また、使用したライブラリは一覧できるように別途ドキュメントに記載すること。
