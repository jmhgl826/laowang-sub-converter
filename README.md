# LaoWang Sub-converter

<div align="center">

![Logo](https://img.shields.io/badge/LaoWang-Sub--converter-blue?style=for-the-badge)
![License](https://img.shields.io/github/license/laowang-subscription/laowang-sub-converter?style=for-the-badge)

**强大的订阅转换工具 - 支持多种协议和客户端**

[在线体验](https://laowang-sub-conv.vercel.app) | [文档](./docs) | [问题反馈](https://github.com/laowang-subscription/laowang-sub-converter/issues)

</div>

---

## 功能特性

-  **多协议支持** - SS、SSR、VMess、VLESS（含 Reality）、Trojan、Hysteria、Hysteria2、TUIC
-  **多客户端支持** - Clash、Surge、Quantumult X、Shadowrocket、Loon、V2RayN、V2RayNG、NekoBox、sing-box 等
-  **短链接服务** - 生成短链接便于分享，支持访问统计
-  **多主题切换** - 8 种精美主题随心切换
-  **多语言支持** - 简体中文、繁体中文、English
-  **多种部署方式** - Docker、Cloudflare、Vercel、Netlify
-  **备用 API** - 支持多个后端 API 自动切换

---

## 快速开始

### 在线使用

直接访问 [https://laowang-sub-conv.vercel.app](https://laowang-sub-conv.vercel.app)

### 本地部署

```bash
# 克隆项目
git clone https://github.com/tony-wang1990/laowang-sub-converter.git
cd laowang-sub-converter

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

### Docker 部署

```bash
docker run -d -p 3000:3000 --name sub-converter ghcr.io/tony-wang1990/laowang-sub-converter:latest
```

---

## API 使用

### 基本转换

```
GET /api/convert?target=clash&url=YOUR_SUBSCRIPTION_URL
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| target | 目标客户端 | clash, surge, v2rayn |
| url | 订阅链接 | https://example.com/sub |
| emoji | 添加 Emoji | 1 |
| udp | 启用 UDP | 1 |

---

## 支持的协议

| 协议 | 状态 |
|------|------|
| Shadowsocks (SS) |  |
| ShadowsocksR (SSR) |  |
| VMess |  |
| VLESS |  |
| VLESS + Reality |  |
| Trojan |  |
| Hysteria |  |
| Hysteria2 |  |
| TUIC |  |

## 支持的客户端

| 客户端 | 平台 | 状态 |
|--------|------|------|
| Clash | 全平台 |  |
| Clash Meta | 全平台 |  |
| Surge | iOS/macOS |  |
| Quantumult X | iOS |  |
| Shadowrocket | iOS |  |
| Loon | iOS |  |
| V2RayN | Windows |  |
| V2RayNG | Android |  |
| NekoBox | Android |  |
| Surfboard | Android |  |
| Stash | iOS/macOS |  |
| sing-box | 全平台 |  |

---

## 备用 API

当主服务不可用时，系统会自动切换到备用 API：

- 本地服务
- api.v1.mk
- sub.xeton.dev
- api.dler.io

---

## 技术栈

- **前端**: Vue 3 + Vite
- **后端**: Node.js + Express
- **样式**: CSS Variables + Glassmorphism
- **部署**: Docker, Vercel, Netlify, Cloudflare

---

## 开源协议

MIT License

---

## 致谢

感谢所有贡献者和用户的支持！
