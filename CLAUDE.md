# CLAUDE.md — Atmosync

このファイルは、Atmosyncリポジトリで作業するAIアシスタント向けのコンテキストを提供します。

## プロジェクト概要

Atmosyncは、オフィスが静かすぎる環境を改善するために、時間帯に応じて自動的に音楽を生成・再生するアプリケーションです。Tone.jsによるアルゴリズム音楽生成を採用し、完全無料・オフラインで動作します。

**リポジトリ:** `yaberah/Atmosync`
**要件定義:** `docs/requirements.md`
**デプロイ先:** GitHub Pages（`https://yaberah.github.io/Atmosync/`）

## 技術スタック

### Webアプリ版（`web/` ディレクトリ）
- **フレームワーク**: React + TypeScript
- **ビルドツール**: Vite
- **CSS**: Tailwind CSS v4（`@tailwindcss/vite` プラグイン）
- **音楽生成**: Tone.js（Web Audio APIラッパー）
- **デプロイ**: GitHub Pages（GitHub Actions経由）

### iOS版（`ios/` — 将来）
- **言語**: Swift
- **音楽生成**: AVFoundation + AudioKit

## プロジェクト構成

```
Atmosync/
├── CLAUDE.md                         # AIアシスタント向けコンテキスト（このファイル）
├── docs/
│   └── requirements.md               # 要件定義書
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Pagesデプロイワークフロー
└── web/                              # Webアプリケーション
    ├── index.html                    # エントリーポイントHTML
    ├── vite.config.ts                # Vite設定
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── main.tsx                  # Reactエントリーポイント
        ├── App.tsx                   # メインAppコンポーネント
        ├── index.css                 # Tailwind CSSインポート
        ├── types.ts                  # 型定義（TimePeriod, MusicStyle等）
        ├── timePeriod.ts             # 時間帯検出ロジック
        ├── musicEngine.ts            # Tone.js音楽生成エンジン
        └── hooks/
            ├── useClock.ts           # 1秒ごとの時計フック
            └── useTimePeriodAutoUpdate.ts  # 時間帯変更検出フック
```

## 主要な機能

1. **再生コントロール** — 再生/停止/曲変更
2. **スタイル選択** — アンビエント、ローファイ、ジャズの3種類
3. **時間帯自動検出** — 6つの時間帯に応じて音楽パラメータ（スケール、BPM、音色、エフェクト）を自動調整
4. **情報表示** — 現在時刻、時間帯、再生状態、音楽設定

## デザイン要件

- **カラースキーム**: パープル系グラデーション（#667eea → #764ba2）
- **レイアウト**: カード型UI、中央配置、最大幅600px
- **レスポンシブ対応**: モバイルでも使用可能

## 共通タスク

すべてのコマンドは `web/` ディレクトリで実行してください。

| タスク | コマンド |
|--------|---------|
| 依存関係のインストール | `npm install` |
| 開発サーバーの起動 | `npm run dev` |
| TypeScript型チェック | `npx tsc --noEmit` |
| 本番ビルド | `npm run build` |
| ビルドのプレビュー | `npm run preview` |

## アーキテクチャの要点

### 音楽生成の仕組み
- `musicEngine.ts` の `MusicEngine` クラスがTone.jsを管理
- スタイル（ambient/lofi/jazz）× ムード（energetic/focused/relaxed/calm/mellow/peaceful）の組み合わせで18種類の音楽パラメータを定義
- `generateMelody()` でステップワイズモーションのメロディをランダム生成
- エフェクトチェーン: PolySynth → FeedbackDelay → Reverb → Destination

### 時間帯検出
- `timePeriod.ts` で現在時刻から6つの時間帯を判定
- `useTimePeriodAutoUpdate` フックで時間帯の切り替わりを検出し、再生中なら自動で音楽を更新

### 注意点
- ブラウザのオートプレイポリシーにより、ユーザーのクリックが必要（`Tone.start()` でオーディオコンテキストを開始）
- `vite.config.ts` の `base: '/Atmosync/'` はGitHub Pagesのサブパス用

## コード規約

- TypeScriptの厳格モードを使用
- Tailwind CSSのユーティリティクラスでスタイリング（カスタムCSSファイルは原則不要）
- Reactの関数コンポーネント + フック
- 型定義は `types.ts` に集約
- ビジネスロジックはコンポーネントから分離（`timePeriod.ts`, `musicEngine.ts`）

## 制約事項

- 予算ゼロ — 外部APIやサービスへの依存なし
- Web Audio APIのブラウザ対応が必須
- アルゴリズム生成であり、AI生成音楽ではない

## AIアシスタント向けガイドライン

このリポジトリで作業する際の注意事項：

1. **読んでから書く。** ファイルを変更する前に必ず読むこと。既存のコンテキストを理解する。
2. **焦点を絞る。** 直接依頼された変更、または明らかに必要な変更のみ行う。依頼外の機能追加やリファクタリングは避ける。
3. **シンプルに保つ。** 最もシンプルな解決策を選ぶ。過度な設計、早すぎる抽象化、推測的な機能は避ける。
4. **既存スタイルに合わせる。** コードベースに既にあるパターン、命名規則、フォーマットに従う。
5. **壊さない。** 変更後は `npx tsc --noEmit` と `npm run build` を実行して確認する。
6. **セキュリティを重視。** 脆弱性（インジェクション、XSS、ハードコードされた秘密情報等）を導入しない。
7. **このファイルを更新する。** プロジェクト構成、ツール、規約が大きく変わった際はCLAUDE.mdを更新する。
