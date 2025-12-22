# LaoWang Sub-converter

<div align="center">

![Logo](https://img.shields.io/badge/LaoWang-Sub--converter-blue?style=for-the-badge)
![License](https://img.shields.io/github/license/tony-wang1990/laowang-sub-converter?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge)

**Powerful Subscription Converter - Supports Multiple Protocols and Clients**

English | [简体中文](./README.md)

</div>

---

## Preview

<div align="center">

<a href="https://laowang-sub-conv.vercel.app/">
  <img src="https://img.shields.io/badge/Click_Demo-laowang--sub--conv.vercel.app-38b2ac?style=for-the-badge" alt="Demo">
</a>

<br><br>

| Home | Converter |
|:---:|:---:|
| ![Home](./docs/screenshots/home.png) | ![Converter](./docs/screenshots/converter.png) |

</div>

---

## Features

-  **Multi-Protocol Support** - SS, SSR, VMess, VLESS (incl. Reality), Trojan, Hysteria, Hysteria2, TUIC
-  **Multi-Client Support** - Clash, Surge, Quantumult X, Shadowrocket, Loon, V2RayN, V2RayNG, NekoBox, sing-box etc.
-  **Short Link Service** - Generate short links for easy sharing, supports access statistics
-  **Multi-Theme** - 8 beautiful themes to switch freely
-  **Multi-Language** - Simplified Chinese, Traditional Chinese, English
-  **Multiple Deployment** - Docker, Cloudflare, Vercel, Netlify
-  **Backup API** - Supports automatic failover to backup backend APIs

---

##  VPS Deployment (Recommended)

If you have a VPS, you can use Docker Compose for one-click deployment, which includes both the full frontend interface and backend API (supporting short links).

1. **Install Docker & Docker Compose**
   - Ensure your VPS has Docker and Docker Compose installed.

2. **Download Code and Start**
   `ash
   # Clone the project
   git clone https://github.com/tony-wang1990/laowang-sub-converter.git
   cd laowang-sub-converter

   # Start services
   docker-compose up -d
   `

3. **Access Service**
   - Visit http://<YOUR_VPS_IP> to get started.
   - All data files will be saved in the local ./data directory.

---

##  One-Click Deployment (PaaS)

Besides VPS, this project also supports deployment to major PaaS platforms. Here are quick deployment buttons:

| Platform | Button |
|------|----------|
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tony-wang1990/laowang-sub-converter) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tony-wang1990/laowang-sub-converter) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fnoobnooc%2Fnoobnooc) |
| **Zeabur** | [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/XXXXXX) |

---

##  Local Development

`ash
git clone https://github.com/tony-wang1990/laowang-sub-converter.git
cd laowang-sub-converter
npm install
npm run dev
`

### Docker Container (Testing)

`ash
docker run -d -p 3000:3000 --name sub-converter ghcr.io/tony-wang1990/laowang-sub-converter:latest
`

---

## Supported Features

| Category | Item | Platform/Note | Status |
|:---|:---|:---|:---:|
| **Protocols** | Shadowsocks (SS) | Standard |  |
| | ShadowsocksR (SSR) | Standard |  |
| | VMess | Standard |  |
| | VLESS | Standard |  |
| | VLESS + Reality | Vision/Reality |  |
| | Trojan | Standard |  |
| | Hysteria | v1 |  |
| | Hysteria2 | v2 |  |
| | TUIC | v5 |  |
| **Clients** | Clash | All Platforms |  |
| | Clash Meta | All Platforms |  |
| | Surge | iOS/macOS |  |
| | Quantumult X | iOS |  |
| | Shadowrocket | iOS |  |
| | Loon | iOS |  |
| | V2RayN | Windows |  |
| | V2RayNG | Android |  |
| | NekoBox | Android |  |
| | Surfboard | Android |  |
| | Stash | iOS/macOS |  |
| | sing-box | All Platforms |  |

---

## Backup API

The system automatically switches to backup APIs when the main service is unavailable:

- Local Service
- api.v1.mk
- sub.xeton.dev
- api.dler.io

---

## Tech Stack

- **Frontend**: Vue 3 + Vite
- **Backend**: Node.js + Express
- **Style**: CSS Variables + Glassmorphism
- **Deployment**: Docker, Vercel, Netlify, Cloudflare

---

## License

MIT License
