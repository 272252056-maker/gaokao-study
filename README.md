# 高中学习工具

女儿的高中学习助手：科学背词、语法专项、阅读听力、测验、错题库、学习计划、打卡统计。

## 功能概览

| 模块 | 说明 |
|------|------|
| **今日学习** | 任务列表、进度环、连续打卡 |
| **单词** | 艾宾浩斯复习 + 每日新词 + 词库浏览 |
| **语法** | 6 大类 15 知识点 + 每点 3 题专项练习 |
| **阅读** | 10 篇精读 + 理解题 + 生词加入词本 |
| **听力** | 5 段模拟（浏览器朗读）+ 题目 |
| **测试** | 单词/语法测验、高考真题、错题库 |
| **计划** | 手动计划 + 系统自动计划（完成联动） |
| **统计** | 近 7 日学习、词库掌握进度 |
| **设置** | 每日新词数、复习优先、测验题数 |

## 在线访问（推荐 Gitee，国内稳定）

| 平台 | 地址 | 说明 |
|------|------|------|
| **Gitee Pages** | `https://你的Gitee用户名.gitee.io/gaokao-study/` | 国内访问快，**推荐给女儿用** |
| GitHub Pages | https://272252056-maker.github.io/gaokao-study/ | 海外可用，国内常打不开 |

**Gitee 部署步骤见 → [GITEE-DEPLOY.md](./GITEE-DEPLOY.md)**

快速推送：

```bash
./scripts/push-gitee.sh 你的Gitee用户名
```

## 本地预览

```bash
cd 03-个人应用/高中学习
python3 -m http.server 8080
```

浏览器打开 http://localhost:8080

## 部署到 GitHub Pages

### 1. 在 GitHub 创建仓库

1. 打开 https://github.com/new
2. 仓库名建议：`gaokao-study`（或任意英文名）
3. 选 **Public**
4. **不要**勾选「Add a README」（本地已有代码）
5. 点击 Create repository

### 2. 推送代码

在本目录执行（把 `你的用户名` 和 `仓库名` 换成实际值）：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选 **Deploy from a branch**
3. **Branch** 选 `main`，文件夹选 **/ (root)**
4. 点 **Save**

约 1～2 分钟后访问：`https://你的用户名.github.io/仓库名/`

### 4. 手机使用

- 用浏览器打开上述链接
- iPhone：Safari → 分享 → **添加到主屏幕**
- Android：Chrome → 菜单 → **添加到主屏幕**

## 文件说明

| 文件 | 说明 |
|------|------|
| index.html | 主页面 |
| app.js | 应用逻辑与界面 |
| learning-core.js | 存储、复习算法、打卡、计划联动 |
| reading.js | 阅读文章与题目 |
| listening.js | 听力材料与题目 |
| grammar.js | 语法知识点、测验题、专项题 |
| gaokao.js | 高考真题数据 |
| words-data.js | 词库（内置，离线可用） |
| data/words.json | 词库 JSON 备用 |
