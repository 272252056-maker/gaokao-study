#!/bin/bash
# 推送代码到 Gitee 并提示开启 Pages
# 用法: ./scripts/push-gitee.sh [Gitee用户名]
# 示例: ./scripts/push-gitee.sh xujun2026

set -e
cd "$(dirname "$0")/.."

GITEE_USER="${1:-}"

if [ -z "$GITEE_USER" ]; then
  echo "用法: ./scripts/push-gitee.sh <Gitee用户名>"
  echo ""
  echo "示例: ./scripts/push-gitee.sh xujun2026"
  echo ""
  echo "请先在 https://gitee.com/projects/new 创建公开仓库 gaokao-study"
  exit 1
fi

REMOTE="https://gitee.com/${GITEE_USER}/gaokao-study.git"

if git remote | grep -q '^gitee$'; then
  git remote set-url gitee "$REMOTE"
else
  git remote add gitee "$REMOTE"
fi

echo "→ 推送到 Gitee: $REMOTE"
echo ""
echo "推送时在终端输入："
echo "  Username: oauth2"
echo "  Password: 你的私人令牌（不是登录密码，也不是 xujun321）"
echo ""

git push -u gitee main

echo ""
echo "✅ 代码已推送"
echo ""
echo "接下来在浏览器完成 Gitee Pages 部署："
echo "  1. 打开 https://gitee.com/${GITEE_USER}/gaokao-study"
echo "  2. 左侧「服务」→「Gitee Pages」"
echo "  3. 部署分支: main  部署目录: / (root)  勾选「强制 HTTPS」"
echo "  4. 点击「启动」或「更新」"
echo ""
echo "部署成功后访问："
echo "  https://${GITEE_USER}.gitee.io/gaokao-study/"
echo ""
echo "⚠️  首次使用需完成 Gitee 实名认证（1～3 个工作日）"
echo "⚠️  每次更新代码后，需在 Pages 页面手动点「更新」"
