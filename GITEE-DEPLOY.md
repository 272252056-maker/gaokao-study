# Gitee Pages 部署指南（国内访问推荐）

GitHub Pages 在国内经常打不开。部署到 **Gitee Pages** 后，武汉及其他城市手机访问更稳定。

## 访问地址

部署成功后：

```
https://你的Gitee用户名.gitee.io/gaokao-study/
```

---

## 第一步：注册 Gitee 并实名认证

1. 打开 [https://gitee.com/signup](https://gitee.com/signup) 注册账号
2. 进入 **设置 → 账号设置 → 实名认证**，提交身份证信息
3. 等待审核（通常 **1～3 个工作日**）
4. 认证通过后才能开启 Gitee Pages

---

## 第二步：创建公开仓库

1. 打开 [https://gitee.com/projects/new](https://gitee.com/projects/new)
2. 仓库名填：`gaokao-study`
3. 选 **公开**（Pages 要求公开仓库）
4. **不要**勾选「使用 Readme 文件初始化」（本地已有代码）
5. 点击创建

---

## 第三步：推送代码

在 Mac 终端执行（把 `你的Gitee用户名` 换成实际用户名）：

```bash
cd "/Users/xujun/Documents/02-工作/02-AI/03-个人应用/高中学习"
chmod +x scripts/push-gitee.sh
./scripts/push-gitee.sh 你的Gitee用户名
```

或手动添加远程并推送：

```bash
cd "/Users/xujun/Documents/02-工作/02-AI/03-个人应用/高中学习"

git remote add gitee https://gitee.com/你的Gitee用户名/gaokao-study.git
git push -u gitee main
```

第一次 push 会提示输入账号。**Password 处填「私人令牌」，不是登录密码**（见下方说明）。

### 获取 Gitee 私人令牌（必做）

Gitee 已不支持用登录密码 push，和 GitHub 一样要用 Token：

1. 打开 [https://gitee.com/profile/personal_access_tokens](https://gitee.com/profile/personal_access_tokens)
2. 点击 **生成新令牌**
3. 描述填 `gaokao-study`，权限至少勾选 **projects**（或 **repo** 相关读写权限）
4. 提交后 **立刻复制** 令牌（只显示一次）

推送时在终端：

| 提示 | 填什么 |
|------|--------|
| **Username** | **`oauth2`**（不是登录名！Gitee 规定用 Token 时用户名固定填这个） |
| **Password** | 粘贴刚复制的 **私人令牌** |

> 若填 `xujun321` 作用户名会报：`The token username invalid`（403）

也可一行命令推送（把 `你的令牌` 换成实际 Token）：

```bash
git push -u https://oauth2:你的令牌@gitee.com/xujun321/gaokao-study.git main
```

### 若仍提示 Incorrect username or password

Mac 可能缓存了错误密码，需清除：

1. 打开 **钥匙串访问**（Keychain Access）
2. 搜索 `gitee.com`
3. 删除相关 **互联网密码** 条目
4. 重新执行 `./scripts/push-gitee.sh xujun321`，再输入用户名 + 令牌

---

## 第四步：开启 Gitee Pages

1. 打开仓库：`https://gitee.com/你的Gitee用户名/gaokao-study`
2. 点击左侧 **服务** → **Gitee Pages**
3. 配置：
   - **部署分支**：`main`
   - **部署目录**：`/（root）` 或留空根目录
   - 勾选 **强制使用 HTTPS**
4. 点击 **启动**
5. 等待 1～3 分钟，页面会显示访问地址

---

## 第五步：发给女儿使用

1. 把链接 `https://你的Gitee用户名.gitee.io/gaokao-study/` 发到微信
2. 点开链接 → 右上角 **…** → **在浏览器中打开**（可选，Gitee 国内一般可直接打开）
3. **添加到主屏幕**：
   - iPhone：Safari → 分享 → 添加到主屏幕
   - Android：Chrome → 菜单 → 添加到主屏幕

---

## 更新网站

每次改完代码并 push 到 Gitee 后：

1. 进入仓库 → **服务** → **Gitee Pages**
2. 点击 **更新**（免费版需手动更新，不会自动部署）

推送命令：

```bash
git push gitee main
# 然后在 Gitee Pages 页面点「更新」
```

---

## 与 GitHub 双备份（可选）

可同时保留 GitHub 和 Gitee 两个远程：

| 远程 | 用途 |
|------|------|
| `origin` | GitHub（海外 / 备份） |
| `gitee` | Gitee（国内访问） |

```bash
git push origin main   # 推 GitHub
git push gitee main    # 推 Gitee，记得在 Pages 点「更新」
```

---

## 常见问题

| 问题 | 解决 |
|------|------|
| Pages 按钮灰色 | 先完成实名认证 |
| 404 | 确认根目录有 `index.html`，部署目录选 root |
| 更新后内容没变 | 在 Pages 页面手动点「更新」，等 2～5 分钟 |
| 词库加载慢 | 首次打开需下载约 600KB 词库，属正常 |

---

## 当前 GitHub 地址（备用）

https://272252056-maker.github.io/gaokao-study/

国内访问不稳定，建议以 Gitee 为主。
