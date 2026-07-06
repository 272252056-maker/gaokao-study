# 高中学习工具

女儿的高中学习助手：单词（高考3500+）、语法、测验、错题库、学习计划。

## 在线访问

部署到 GitHub Pages 后，访问地址为：

```
https://你的用户名.github.io/仓库名/
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
| app.js | 应用逻辑 |
| grammar.js | 语法知识点与测验题 |
| words-data.js | 词库（内置，离线可用） |
| data/words.json | 词库 JSON 备用 |
