<div align="center">

<img src="https://ruraluniv.ac.in/images/gridu.png" alt="GRI Logo" width="120" height="120"/>

# Gandhigram Rural Institute — React Native Android Platform

**Production-grade, feature-first enterprise React Native Android application for Gandhigram Rural Institute (Deemed to be University)**

[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Expo](https://img.shields.io/badge/Expo-SDK_51-000000?logo=expo&logoColor=white)](https://expo.dev)
[![Android](https://img.shields.io/badge/Android-14_(API_34)-3DDC84?logo=android&logoColor=white)](https://android.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🌐 Official Website](https://ruraluniv.ac.in) · [📚 Documentation Index](docs/Project_Overview.md) · [🏗️ Architecture Specs](docs/Architecture.md)

</div>

---

## 📖 Overview

The **GRI React Native Android Platform** is an enterprise-grade native Android mobile application engineered for **Gandhigram Rural Institute – Deemed to be University** (Dindigul, Tamil Nadu).

Built ground-up with **React Native 0.74+**, **TypeScript**, **Expo Router v3**, **Zustand**, **TanStack Query v5**, **NativeWind v4**, **MMKV**, **Axios**, and **Zod**, the architecture isolates every university feature module (Academics, Examinations, Finance, Library, Hostel, Placement, Village Outreach, Transport, Grievance Portal, and AI Knowledge Assistant) into decoupled, independently maintainable feature domains.

---

## 🏗️ High-Level Platform Architecture

```
                                 ┌─────────────────────────────────────────┐
                                 │     GRI React Native App (Android)      │
                                 │   Student · Faculty · Parent · Alumni   │
                                 └────────────────────┬────────────────────┘
                                                      │ HTTPS / WSS (Axios + MMKV Cache)
                                 ┌────────────────────▼────────────────────┐
                                 │          Kong API Gateway / Auth        │
                                 └────────────────────┬────────────────────┘
                                                      │
         ┌────────────────────────┬───────────────────┼───────────────────┬────────────────────────┐
         │                        │                   │                   │                        │
┌────────▼─────────┐    ┌─────────▼────────┐  ┌───────▼────────┐ ┌────────▼────────┐    ┌───────────▼───────────┐
│ Academic Service │    │ Exam/ERP Bridge  │  │ Finance Gateway│ │ AI RAG Microservice│ │ Outreach/Survey Svc   │
└────────┬─────────┘    └─────────┬────────┘  └───────┬────────┘ └────────┬────────┘    └───────────┬───────────┘
         │                        │                   │                   │                        │
┌────────▼────────────────────────▼───────────────────▼───────────────────▼────────────────────────▼───────────┐
│                                 PostgreSQL 16 Cluster + Redis Cache + PGVector                             │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
GRI/
├── src/
│   ├── app/                        # Expo Router entry & file-based routes
│   │   ├── _layout.tsx             # Root Layout with QueryClient & SafeArea
│   │   ├── index.tsx               # Welcome screen
│   │   └── (tabs)/                 # Bottom tab bar routes
│   ├── core/                       # Core system modules
│   │   ├── api/                    # Axios instance, interceptors, retry
│   │   ├── storage/                # MMKV storage wrapper
│   │   ├── auth/                   # Zustand auth store, biometric login
│   │   ├── theme/                  # NativeWind Tailwind tokens
│   │   └── telemetry/              # Sentry error & performance logger
│   ├── features/                   # Feature domain modules
│   │   ├── academics/              # Timetable, Attendance, Courses
│   │   ├── examinations/           # Hall Tickets, Results
│   │   ├── finance/                # Fee Payments, Receipts
│   │   ├── library/                # OPAC Search, RFID
│   │   ├── hostel/                 # Out-Pass Management Workflow
│   │   ├── placement/              # Drives, Resume Builder
│   │   ├── ai_assistant/           # RAG Vector Chatbot (Tamil & Eng)
│   │   ├── outreach/               # Geo-tagged Village Surveys
│   │   ├── transport/              # Bus Tracking
│   │   └── complaints/             # Grievance Escalation Portal
│   └── components/                 # Reusable NativeWind UI Primitives
├── docs/                           # 26 Enterprise Architectural Specs
├── package.json                    # Dependencies & NPM scripts
├── tsconfig.json                   # TypeScript config & path aliases
├── app.json                        # Expo SDK 51 Android configuration
├── babel.config.js                 # Babel NativeWind & Reanimated plugins
└── tailwind.config.js              # NativeWind theme tokens
```

---

## 📑 Complete Documentation Suite Index

| # | Specification Document | Description |
|:---:|---|---|
| 01 | [Project Overview](docs/Project_Overview.md) | Vision, scope, Android target specs, user personas |
| 02 | [System Architecture](docs/Architecture.md) | Feature-first React Native architecture & data flow |
| 03 | [Folder Structure](docs/Folder_Structure.md) | `src/` directory layout and modular boundaries |
| 04 | [Coding Standards](docs/Coding_Standards.md) | TypeScript strict standards, ESLint, Prettier rules |
| 05 | [API Standards](docs/API_Standards.md) | Axios clients, RESTful endpoints, Zod DTO validation |
| 06 | [State Management](docs/State_Management.md) | Zustand stores + TanStack Query async state management |
| 07 | [Navigation](docs/Navigation.md) | Expo Router file-based routing, stack/tab/drawer shells, deep links |
| 08 | [UI System](docs/UI_System.md) | NativeWind v4 styling, Material 3 primitives, Reanimated 60fps animations |
| 09 | [Design Tokens](docs/Design_Tokens.md) | Tailwind color tokens, typography scales, spacing grids |
| 10 | [Backend Services](docs/Backend.md) | Axios consumption of Node.js / Python microservices & Kong gateway |
| 11 | [Authentication](docs/Authentication.md) | OAuth2 / JWT refresh, MMKV Android Keystore encryption, Android Biometrics |
| 12 | [Database Design](docs/Database.md) | MMKV local storage, SQLite / WatermelonDB, PostgreSQL backend schema |
| 13 | [AI & RAG System](docs/RAG.md) | React Native AI chat client, streaming responses, bilingual NLU |
| 14 | [ERP Integration](docs/ERP_Integration.md) | Legacy ERP API adapters consumed via React Query |
| 15 | [Offline Strategy](docs/Offline_Strategy.md) | TanStack Query offline persistence, MMKV cache, background sync |
| 16 | [Security Architecture](docs/Security.md) | Android ProGuard / R8 obfuscation, SSL pinning, root detection |
| 17 | [Deployment & CI/CD](docs/Deployment.md) | Gradle release builds (`./gradlew assembleRelease`), Google Play publishing |
| 18 | [Testing Strategy](docs/Testing.md) | Jest unit tests, React Native Testing Library component tests, Detox E2E |
| 19 | [Scalability & Performance](docs/Scalability.md) | Android RAM / Garbage Collection optimization, FlashList tuning |
| 20 | [Monitoring & APM](docs/Monitoring.md) | Sentry React Native Android crash reporting (ANRs, uncaught JS exceptions) |
| 21 | [Analytics & Telemetry](docs/Analytics.md) | Privacy-compliant Android telemetry & event tracking |
| 22 | [Plugin Architecture](docs/Plugin_System.md) | Modular dynamic feature plugin registry for campus clubs |
| 23 | [Release Roadmap](docs/Roadmap.md) | Multi-phase React Native Android migration & release schedule |
| 24 | [Developer Guide](docs/Developer_Guide.md) | Onboarding guide, `npx expo run:android`, ADB commands |
| 25 | [Contributing Rules](docs/Contributing.md) | GitFlow branching, PR templates, ESLint/Prettier verification |

---

## ⚡ Quick Start & Mobile Application Preview Options

### 1. Install Dependencies
```bash
npm install
```

---

### 📲 Preview Options:

#### Option 1: Preview on Your Android Phone via Expo Go (Easiest & Fastest!)
1. **Install Expo Go on your phone**:
   - Open **Google Play Store** on your Android phone and install the free **Expo Go** app.
2. **Connect to the same Wi-Fi**:
   - Ensure your phone and PC are connected to the same Wi-Fi network.
3. **Start the Expo server**:
   ```powershell
   npx expo start
   ```
4. **Scan the QR Code**:
   - Open **Expo Go** on your phone, tap **Scan QR Code**, and scan the QR code displayed in your terminal.
   - The app will compile and launch instantly on your phone with live reload enabled!

---

#### Option 2: Live USB Debugging / Direct Android Install
If your phone is connected to your PC via USB cable (with USB Debugging enabled):
```powershell
npx expo run:android
```
Expo will compile the native APK and automatically launch the app on your connected Android phone (`RZCX2175PPX`).

---

#### Option 3: Web Browser Preview (Instant Layout Test)
If you want to quickly test screens and navigation in a browser:
```powershell
npx expo start --web
```
Open `http://localhost:8081` in Chrome or Edge to view and interact with the application layout!

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

