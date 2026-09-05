#!/usr/bin/env node

/**
 * スキル実行環境のリポジトリ情報を自動検出し、
 * ./assets/repo-context.md に保存する
 * 
 * 検出項目：
 * - OWNER: GitHubリポジトリのオーナー
 * - REPO_NAME: Gitリポジトリ名
 * - BRANCH: 現在のブランチ名
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // スクリプトのディレクトリから ../assets に出力
  const resourceDir = path.resolve(__dirname, '../assets');
  const outputFile = path.join(resourceDir, 'repo-context.md');

  // リソースディレクトリが存在しなければ作成
  if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir, { recursive: true });
  }

  // 1. リモートURL から OWNER と REPO_NAME を取得
  let remoteUrl = '';
  try {
    remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
  } catch (e) {
    console.error('Error: git remote origin が設定されていません');
    process.exit(1);
  }

  // リモートURL から owner/repo を抽出
  // 対応フォーマット：
  // - https://github.com/owner/repo.git
  // - https://github.com/owner/repo
  // - git@github.com:owner/repo.git
  // - git@github.com:owner/repo
  let owner = '';
  let repoName = '';

  const httpsMatch = remoteUrl.match(/https:\/\/github\.com\/([^/]+)\/([^/]+?)(\.git)?$/);
  const sshMatch = remoteUrl.match(/git@github\.com:([^/]+)\/([^/]+?)(\.git)?$/);

  if (httpsMatch) {
    owner = httpsMatch[1];
    repoName = httpsMatch[2];
  } else if (sshMatch) {
    owner = sshMatch[1];
    repoName = sshMatch[2];
  } else {
    console.error(`Error: リモートURL "${remoteUrl}" から owner/repo を抽出できません`);
    process.exit(1);
  }

  // 2. 現在のブランチ名を取得
  let branch = '';
  try {
    branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  } catch (e) {
    console.error('Error: ブランチ情報の取得に失敗しました');
    process.exit(1);
  }

  if (!branch) {
    console.error('Error: ブランチ名が空です');
    process.exit(1);
  }

  // 3. 結果を ./assets/repo-context.md に保存
  const content = `# Repository Context

自動検出されたリポジトリ情報です。このファイルはスキル実行時に自動生成されます。

\`\`\`
OWNER=${owner}
REPO_NAME=${repoName}
BRANCH=${branch}
\`\`\`

## GitHub Repository

https://github.com/${owner}/${repoName}

## Current Branch

${branch}

---

**Generated at**: ${new Date().toISOString()}
`;

  fs.writeFileSync(outputFile, content, { encoding: 'utf-8' });

  console.log(`✓ Repository context saved to: ${outputFile}`);
  console.log(`  OWNER: ${owner}`);
  console.log(`  REPO_NAME: ${repoName}`);
  console.log(`  BRANCH: ${branch}`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
