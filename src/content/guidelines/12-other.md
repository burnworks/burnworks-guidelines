---
title: "その他"
sectionId: "section-other"
order: 12
subsections:
  - id: "other-copyright"
    title: "他者の著作権"
  - id: "other-license"
    title: "ライセンス"
  - id: "other-buildtool"
    title: "ビルドツール等"
---

<h3 id="other-copyright">他者の著作権</h3>

映像、写真、音楽など、他者が創作したものを Web サイトで使用する場合は著作権の侵害を行わないよう十分に注意すること。映像や音楽等、他者が創作したものを公の場で利用する場合は、原則として創作者に対する利用許諾が必要なため、クライアントから提供された素材だとしても、必ず著作権の問題がクリアされているかを確認の上、使用する。

その他、フレームワークやライブラリをはじめとしたプログラムのソースコード等、ライセンスに則った適切な利用を行うこと。詳しくは[ライセンスのセクション](#other-license)を参照。

<h3 id="other-license">ライセンス</h3>

案件で使用する JavaScript ライブラリ、CSS フレームワーク、アイコンライブラリのライセンスは必ず確認し、ライセンスの元に正しく使用すること。また、ソースコードに記載されたライセンス表記は削除しないように注意すること。

ビルドツールなどを使用する場合にコメントの自動削除が適用されてしまう場合があるので `/*! ... */` 形式のコメントになっていることを確認する。

なお、リンクツール（利用にあたり、作者ページへのリンクが必須のライブラリ等）は使用不可とする。

#### ブランドロゴ等の利用

Web サービスなど、ブランドロゴをバナーやボタンに使用する際は、各ブランドロゴの利用規約、ガイドラインを必ず確認し、それに従って利用する事。下記に代表的なブランドロゴの利用規約を挙げる。

- [X（旧 Twitter）ブランドガイドライン](https://about.twitter.com/ja/who-we-are/brand-toolkit)
- [Meta Brand Resource Center](https://about.meta.com/brand/resources/)（Facebook、Instagram など）
- [YouTube ブランド関連情報とガイドライン](https://www.youtube.com/intl/ALL_jp/howyoutubeworks/resources/brand-resources/#overview)
- [Android ブランドガイドライン](https://developer.android.com/distribute/marketing-tools/brand-guidelines?hl=ja)
- [Apple マーケティングリソースとアイデンティティに関するガイドライン](https://developer.apple.com/jp/app-store/marketing/guidelines/)
- [LINE アイコンガイドライン](https://line.me/ja/logo)

<h3 id="other-buildtool">ビルドツール等</h3>

開発環境については各担当者の裁量で選択することができるが、複数人でのメンテナンス等を考慮し、下記に推奨ツールを記載する。特定の OS に依存するようなツールは使用しないこと。

#### CSS プリプロセッサ

Sass の使用を推奨する。ただし、CSS カスタムプロパティ（変数）の普及により、シンプルな案件では Sass を使わず素の CSS で対応することも可能。

#### CSS フレームワーク

クライアントと協議の上、問題ない場合は Tailwind CSS の使用を推奨する。

#### ビルドツール

[Vite](https://vite.dev/) の使用を推奨する。npm-scripts との組み合わせで高速なビルド環境を実現できる。

#### バージョン管理

Git を推奨。リポジトリサービスは GitHub の使用を推奨するが、クライアント案件のソースコードをパブリックなリポジトリには保存しないこと。

#### JavaScript ライブラリ・フレームワーク

- React、および Next.js の使用を推奨する。原則として TypeScript を導入すること。
- 静的サイトジェネレーターについては [Astro](https://astro.build/) を推奨する。
- 状態管理が必要な場合は、React の組み込み機能（useState / useReducer / Context）を優先し、必要に応じて Zustand 等の軽量ライブラリを検討すること。

#### パッケージマネージャー

npm を基本とする。プロジェクトの要件に応じて pnpm の使用も可。
