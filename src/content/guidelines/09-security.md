---
title: "セキュリティ"
sectionId: "section-security"
order: 9
subsections:
  - id: "security-post"
    title: "基本"
  - id: "security-password"
    title: "強固なパスワード"
  - id: "security-password-protect"
    title: "管理画面のパスワード保護"
  - id: "security-ssl"
    title: "SSL の利用"
  - id: "security-csp"
    title: "Content Security Policy"
  - id: "security-ftp"
    title: "FTP"
  - id: "security-movable-type"
    title: "Movable Type"
---

<h3 id="security-post">基本</h3>

Web サイト、及び Web アプリケーションの実装にあたって参考とすべき外部のガイドラインとしては、IPA 独立行政法人 情報処理推進機構が公開する、「安全なウェブサイトの作り方（改訂第 7 版）」を参考とすること。

- [安全なウェブサイトの作り方：IPA 独立行政法人 情報処理推進機構](https://www.ipa.go.jp/security/vuln/websecurity.html)

また、納品物として Web アプリケーションのセキュリティ実装の実施状況を確認する必要がある場合は、同ガイドライン付属の「セキュリティ実装 チェックリスト」を利用、あるいは参考の上、クライアントの要望に応じたチェックリストを作成する。

<h3 id="security-password">強固なパスワード</h3>

CMS インストール時のアカウント設定など、新規でアカウントを設定する際は推測されにくいアカウント名、および強固なパスワードを設定すること。

パスワードは 32 桁以上が望ましいが、状況に応じて 16 桁以上であれば許容する。必ず英数字を混在させ、数字だけのパスワードや英単語によるパスワードは禁止する。また、同一のパスワードを複数のサービスやアカウントで使い回すことも禁止。

上記は、クライアントの要望によらず厳守すること。

#### 推測されやすいアカウント名の例

- `admin`
- `root`

##### 改善案

- `example-admin`（"example" 部分はクライアントに応じて変えるなど）

#### 不適切なパスワードの例

- `12345`（数字のみ / 桁数も不足）
- `companyname`（社名そのままなど）
- `0312345678`（電話番号など外部からわかりやすいもの）

#### 強固なパスワードの例

- `yrQpjO9BI4gx84a@`

<h3 id="security-password-protect">管理画面のパスワード保護</h3>

サーバに設置した管理画面をもつプログラムへのログインページは、可能な限りパスワードによって保護する。ベーシック認証を用いる場合は、**必ず HTTPS 上で運用すること**（HTTP 上のベーシック認証では認証情報が Base64 エンコードされるのみで実質的に平文送信となるため禁止）。また、ブルートフォース攻撃対策として **IP アドレスによるアクセス制限と組み合わせる**ことを強く推奨する。

例として、管理画面にベーシック認証を設定する場合は、下記のような .htaccess の記述が考えられる。

```apache
<Files mt.cgi>
  AuthUserFile /var/www/html/.htpasswd
  AuthName "Please enter your ID and password"
  AuthType Basic
  Require valid-user
</Files>
```

ディレクトリ単位で認証をかけても問題ない場合は、そのように対処する。

<h3 id="security-ssl">SSL の利用</h3>

問い合わせフォームなど、個人情報を伴うデータをブラウザ・サーバ間で受け渡すプログラムに関してはその通信を SSL（TLS）で保護する。サーバへの SSL 導入をクライアントに提案し、暗号化されていない状態でのデータ送信は原則として行わないこと。

SSL を使用する場合、レンタルサーバ業者が提供するような所謂共有 SSL の利用は原則として不可。

SSL サーバ証明書を発行する際に申請する証明書の公開鍵暗号は 2048bit RSA 以上（推奨は **ECDSA P-256 または P-384**）、ハッシュ関数は SHA-2 を基準として選択する。また暗号化強度は 128bit 以上の信頼できる認証局発行 SSL 証明書を利用する。推奨する認証局は下記の通り。

- Let's Encrypt
- セコムトラストシステムズ（セコムパスポート）
- GMO グローバルサイン
- ジオトラスト

#### HTTP Strict Transport Security（HSTS）

HTTPS 運用が確定しているサイトでは、`Strict-Transport-Security` レスポンスヘッダを設定し、ブラウザに HTTPS 接続を強制することを推奨する。

```apache
# Apache（.htaccess）での設定例
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

`max-age` は最低でも 1 年（31536000 秒）を推奨する。設定前に、サイト内のすべてのリソース（画像・スクリプト等）が HTTPS で提供されていることを確認すること。

<h3 id="security-csp">Content Security Policy</h3>

Content Security Policy（CSP）は、XSS 攻撃などを緩和するための重要なセキュリティ機能である。特に個人情報を扱うフォームや管理画面を持つ Web サイトでは、CSP の設定を検討すること。

CSP は HTTP レスポンスヘッダ（`Content-Security-Policy`）またはメタタグで設定できる。

```html
<!-- メタタグによる設定例 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://trusted.example.com;" />
```

CSP の設定は Web サイトの構成によって大きく異なるため、まずは `Content-Security-Policy-Report-Only` ヘッダを使ってレポートのみ行い、影響を確認してから実際のポリシーを設定する方法を推奨する。

<h3 id="security-ftp">FTP</h3>

サーバへのファイル転送に関して、FTP の使用は禁止する。SFTP（SSH File Transfer Protocol）、もしくは FTPS（File Transfer Protocol over SSL/TLS）を利用し、FTP クライアントに関しては、これらに対応していないものの使用は禁止。

SFTP/FTPS 対応クライアントとして、Windows 環境であれば、WinSCP の利用を推奨。macOS では Cyberduck 等を利用すること。

<h3 id="security-movable-type">Movable Type</h3>

Movable Type プログラムは、下記の通り主要な実行ファイルのリネーム、および設定ファイルへの追記を行うこと。リネームのルールは別途定めているため下記は参考。

- mt.cgi → **mt-example-example.cgi**
- mt-upgrade.cgi → **mt-upgrade-example.cgi**
- mt-data-api.cgi → **mt-data-api-example.cgi**
- mt-check.cgi → **mt-check-example.cgi**

```
#mt-config.cgiに追記
AdminScript mt-example-example.cgi
UpgradeScript mt-upgrade-example.cgi
DataAPIScript mt-data-api-example.cgi
CheckScript mt-check-example.cgi
```

また、Web サイトの構築に不要な機能に関しては .cgi ファイルの実行権限を削除してもよい。
