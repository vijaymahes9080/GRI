<div align="center">

<img src="https://ruraluniv.ac.in/images/gridu.png" alt="GRI Logo" width="120" height="120"/>

# GRI ONE — Gandhigram Rural Institute Unified Digital University Super-App

**Complete, production-grade mobile-first digital university application for The Gandhigram Rural Institute (Deemed to be University)**

Official Reference Website: [https://ruraluniv.ac.in/](https://ruraluniv.ac.in/)

[![React Native](https://img.shields.io/badge/React_Native-0.74.5-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Expo](https://img.shields.io/badge/Expo-SDK_51-000000?logo=expo&logoColor=white)](https://expo.dev)
[![Android](https://img.shields.io/badge/Android_16KB_Aligned-API_35-3DDC84?logo=android&logoColor=white)](https://developer.android.com/16kb-page-size)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16_+_pgvector-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🌐 Official University Website](https://ruraluniv.ac.in) · [📚 Documentation Index](docs/Project_Overview.md) · [🏗️ System Architecture](docs/Architecture.md)

</div>

---

## 📖 Executive Summary & Core Product Principle

**GRI One** transforms the entire digital ecosystem of **The Gandhigram Rural Institute (Deemed to be University)** into a unified, secure, scalable, and adaptive mobile application.

Rather than acting as a simple web wrapper or student portal, **GRI One** serves as a complete **University Super-App** built with a two-layer adaptive architecture:

### 🏛️ Layer A — Public University (No Login Required)
- **University Identity**: About GRI, Vision & Mission, Governance, Administration, NIRF Ranking, NAAC Accreditation.
- **Academic Discovery**: UG, PG, Ph.D., Diploma, and Certificate programmes across all Departments & Centres.
- **Live News & Notices**: Real-time synchronization with `ruraluniv.ac.in` for circulars, exam notices, press releases, tenders, and career opportunities.
- **Campus Facilities**: Infrastructure, Hostels, Library OPAC, Sports, Health Centre, Transport, and Emergency Contacts.

### 🔐 Layer B — Authenticated Role-Based Services (13 Distinct User Roles)
Role-specific dashboards, permissions, and features tailored for:
1. **Student** — Digital Student ID, Geo-fenced Attendance, Grades/CGPA, Samarth Fee Payments, Hall Ticket PDF, Grievances.
2. **Faculty** — Class Attendance Marking, Internal Assessment (CFA), Assigned Courses, Student Roster.
3. **Research Scholar** — Thesis Progress, Fellowship Tracking, Coursework, Viva Schedules.
4. **Department Administrator** — Departmental Notices, Course Allocation, Student Requests.
5. **Examination Staff** — Exam Timetables, Seating Arrangement, Mark Verification, Revaluation.
6. **Hostel Staff / Warden** — Digital Outpass Approvals, Room Allocation, Mess Fee Management.
7. **Finance Staff** — Fee Collection Ledger, Receipt Generation, Scholarship Processing.
8. **University Administrator** — University-wide Analytics, Content Management (CMS), System Monitoring.
9. **Librarian** — Library OPAC Catalog, Book Transactions, Due Date Alerts.
10. **Placement Officer** — Campus Drive Announcements, Student Applications, Interview Schedules.
11. **Alumni** — Alumni Directory, Networking, Mentorship, Contribution Portal.
12. **Pensioner** — Pension Status, Life Certificate Submission, Medical Claim Tracking.
13. **System Administrator** — Role RBAC, Feature Flags, Audit Logs, System Health.

---

## 🏗️ End-to-End System Architecture

```
                                  ┌─────────────────────────────────────────┐
                                  │   GRI One Mobile App (React Native)     │
                                  │   Android 16 KB Page-Size Compliant     │
                                  └────────────────────┬────────────────────┘
                                                       │ HTTPS / WSS (Axios + MMKV Cache)
                                  ┌────────────────────▼────────────────────┐
                                  │         FastAPI API Gateway & WAF       │
                                  │       Security Headers & Rate Limiter   │
                                  └────────────────────┬────────────────────┘
                                                       │
          ┌────────────────────────┬───────────────────┼───────────────────┬────────────────────────┐
          │                        │                   │                   │                        │
 ┌────────▼─────────┐    ┌─────────▼────────┐  ┌───────▼────────┐ ┌────────▼────────┐    ┌───────────▼───────────┐
 │ Academic Service │    │ Exam/ERP Bridge  │  │ Finance Gateway│ │ AI RAG Microservice│ │ Live Website Sync     │
 │ (BLE & Geo-Fence)│    │ (Samarth API)    │  │ (Fee & Receipt)│ │ (pgvector Embeds) │ │ (ruraluniv.ac.in)     │
 └────────┬─────────┘    └─────────┬────────┘  └───────┬────────┘ └────────┬────────┘    └───────────┬───────────┘
          │                        │                   │                   │                        │
 ┌────────▼────────────────────────▼───────────────────▼───────────────────▼────────────────────────▼───────────┐
 │                        PostgreSQL 16 Cluster (9 Schemas: core, academic, exam, campus,                    │
 │                        finance, placement, research, ai, infra) + Redis Cache + PGVector                  │
 └────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Architecture & Folder Structure

```
GRI/
├── src/
│   ├── app/                        # Expo Router file-based routing
│   │   ├── _layout.tsx             # Root layout with QueryClient & SafeAreaProvider
│   │   ├── index.tsx               # Welcome screen & gateway portal
│   │   └── (tabs)/                 # Bottom tab bar routes (Home, Academics, Services, AI Chat, Profile)
│   │       ├── index.tsx           # Default tab redirect
│   │       ├── home.tsx            # Official GRI website news, circulars & portal cards
│   │       ├── academics.tsx       # Timetable, Geo-Attendance & Courses
│   │       ├── examinations.tsx    # Hall Tickets, CFA & Semester Results
│   │       ├── hostel.tsx          # Digital Outpass & Hostel Requests
│   │       ├── ai_chat.tsx         # Bilingual (Eng/Ta) AI RAG Knowledge Assistant
│   │       └── profile.tsx         # User Profile, Digital Student ID & RBAC Switcher
│   ├── core/                       # Core infrastructure primitives
│   │   ├── api/                    # Axios REST client with JWT auto-refresh
│   │   ├── auth/                   # Zustand authentication store & 13 user roles
│   │   ├── i18n/                   # Multi-language localization (English & Tamil)
│   │   ├── offline/                # Offline queue & background synchronization
│   │   ├── storage/                # MMKV encrypted storage wrapper
│   │   └── theme/                  # GRI Brand tokens (#518214 Green, #911C03 Maroon, #F16236 Saffron)
│   ├── features/                   # Feature domain modules
│   │   ├── academics/              # Attendance, Timetable & Course Registration
│   │   ├── auth/                   # Login, Biometric & Role Switcher screens
│   │   ├── complaints/             # Student Grievance Redressal System
│   │   ├── examinations/           # Results, CFA & Hall Ticket Download
│   │   ├── finance/                # Fee Payments & Payment Receipts
│   │   ├── hostel/                 # Digital Outpass & Room Management
│   │   ├── library/                # OPAC Book Search & Transactions
│   │   ├── outreach/               # Geo-tagged Rural Extension Surveys
│   │   ├── placement/              # Campus Drives & Interview Registration
│   │   └── transport/              # Live Bus Tracking & Route Maps
│   └── components/                 # Reusable UI Primitives (Header, Card, Button, TextField)
├── backend/                        # FastAPI Microservices Backend
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry with security headers & Prometheus monitoring
│   │   ├── api/v1/endpoints/       # 13 REST API endpoints (Auth, Academics, Exams, Hostel, RAG, Sync, etc.)
│   │   └── core/config.py          # Environment settings & Database credentials
│   ├── requirements.txt            # FastAPI, SQLAlchemy, AsyncPG, PyPDF, Redis dependencies
│   ├── Dockerfile                  # Production Docker container definition
│   └── docker-compose.yml          # Full-stack orchestrator (FastAPI, PostgreSQL 16, Redis, Nginx)
├── database/
│   └── schema.sql                  # PostgreSQL multi-schema database definition (9 schemas)
├── docs/                           # 37 Enterprise Architectural & Design Specifications
├── install_to_phone.bat            # Automated USB 16 KB zipalign, sign & adb deployment script
├── build_and_install.bat          # Full Gradle assembleDebug + 16 KB zipalign + ADB push script
├── package.json                    # Dependencies & Expo SDK 51 configuration
└── tailwind.config.js              # NativeWind theme extension with official GRI brand tokens
```

---

## 🎨 Official GRI Branding & Visual Identity

The mobile application directly adopts the official color palette and design elements of **The Gandhigram Rural Institute** ([ruraluniv.ac.in](https://ruraluniv.ac.in/)):

| Brand Element | Hex Code | Visual Application |
|---|:---:|---|
| **GRI Forest Green** | `#518214` | Primary Header bar, Active tab indicators, Success badges |
| **GRI Deep Maroon** | `#911C03` | Official University Notice Banner, Urgent Announcements |
| **GRI Warm Saffron** | `#F16236` | Action buttons, High-priority alerts, Special notifications |
| **GRI Khadi Blue** | `#0D47A1` | Secondary accents, Card badges, Information headers |
| **Khadi Light** | `#82B1FF` | Subtitles, Secondary text on dark backgrounds |

---

## 🚀 Key Application Modules

### 1. 🪪 Digital Student Identity
- Displays student photograph, name, registration number, department, academic year, and validity.
- Includes a dynamic **QR Code** for instant campus gate verification and library check-in.
- Supports cached offline identity display when internet connectivity is unavailable.

### 2. 📍 Geo-Fenced & BLE Attendance
- Allows students to mark attendance inside designated lecture halls via **Bluetooth Low Energy (BLE) Beacons** and **GPS Geofencing**.
- Visualizes overall attendance percentages, subject-wise attendance, and attendance threshold alerts.

### 3. 📄 Examinations, CFA Marks & Hall Tickets
- Displays continuous internal assessment (CFA) marks, semester grade sheets, SGPA, and CGPA.
- Generates downloadable PDF **Hall Tickets** and official semester result statements.

### 4. 💳 Samarth Portal & Fee Payments
- Deep integration with **Samarth Portal** (`ruraluniv.samarth.ac.in`) for semester fee, examination fee, and hostel fee payments.
- Generates instant digital payment receipts with transaction tracking.

### 5. 🤖 GRI AI Assistant (Bilingual RAG Engine)
- RAG (Retrieval-Augmented Generation) chatbot trained on official GRI documents, circulars, and course guidelines.
- Responds in **English** and **Tamil** with source citations to official university announcements.

### 6. 🏡 Hostel & Digital Out-Pass Management
- Digital weekend outpass requests with automated warden approval workflows.
- Room allocation details, mess menu schedules, and hostel complaint ticketing.

### 7. 📢 Grievance Redressal System
- Multi-category grievance filing (Academic, Hostel, SC/ST Cell, Infrastructure) with status tracking (`Submitted` → `Under Review` → `In Progress` → `Resolved`).

---

## 📲 Build, Verification & Installation Guide

### Prerequisites
- Node.js `v18+` or `v20+`
- Android SDK with Build-Tools `34.0.0+`
- Connected Android Device with USB Debugging enabled

### 1. Install Project Dependencies
```bash
npm install
```

### 2. Run Unit Test Suite
```bash
npm test
```

### 3. Build & Install 16 KB Page-Aligned APK onto Phone
Execute the automated build script:
```powershell
.\build_and_install.bat
```
This script performs:
1. `gradlew.bat assembleDebug` compilation.
2. `zipalign.exe -f -p 16` alignment for 16 KB page boundary compliance (Android 15/16).
3. Debug keystore signing with `apksigner.bat`.
4. USB port forwarding (`adb reverse tcp:8081 tcp:8081`).
5. Direct installation to your connected phone (`adb install -r app-debug-16kb.apk`).

### 4. Quick Deployment to Phone (Existing APK)
If the APK is already compiled:
```powershell
.\install_to_phone.bat
```

---

## 📑 Complete Architectural Specifications Index

| # | Specification Document | Description |
|:---:|---|---|
| 01 | [Project Overview](docs/Project_Overview.md) | Vision, scope, target specs, and 13 user personas |
| 02 | [System Architecture](docs/Architecture.md) | Feature-first React Native architecture & data flow |
| 03 | [Folder Structure](docs/Folder_Structure.md) | `src/` directory layout and modular boundaries |
| 04 | [Coding Standards](docs/Coding_Standards.md) | TypeScript strict standards, ESLint, Prettier rules |
| 05 | [API Standards](docs/API_Standards.md) | Axios clients, RESTful endpoints, Zod DTO validation |
| 06 | [State Management](docs/State_Management.md) | Zustand stores + TanStack Query async state management |
| 07 | [Navigation](docs/Navigation.md) | Expo Router file-based routing & deep links |
| 08 | [UI System](docs/UI_System.md) | NativeWind v4 styling, Material 3 primitives, Reanimated |
| 09 | [Design Tokens](docs/Design_Tokens.md) | Tailwind color tokens, typography scales, spacing grids |
| 10 | [Backend Services](docs/Backend.md) | FastAPI microservices & Kong gateway integration |
| 11 | [Authentication](docs/Authentication.md) | OAuth2 / JWT refresh, MMKV encryption, Android Biometrics |
| 12 | [Database Design](docs/Database.md) | PostgreSQL multi-schema database & pgvector design |
| 13 | [AI & RAG System](docs/RAG.md) | React Native AI chat client, streaming, bilingual NLU |
| 14 | [ERP Integration](docs/ERP_Integration.md) | Samarth & legacy ERP API adapters consumed via React Query |
| 15 | [Offline Strategy](docs/Offline_Strategy.md) | TanStack Query offline persistence, MMKV cache, background sync |
| 16 | [Security Architecture](docs/Security.md) | Android ProGuard / R8 obfuscation, SSL pinning, root detection |
| 17 | [Deployment & CI/CD](docs/Deployment.md) | 16 KB zipalign, Gradle release builds, Google Play publishing |
| 18 | [Testing Strategy](docs/Testing.md) | Jest unit tests, React Native Testing Library, Detox E2E |
| 19 | [Scalability & Performance](docs/Scalability.md) | Android RAM / Garbage Collection optimization, FlashList tuning |
| 20 | [Monitoring & APM](docs/Monitoring.md) | Sentry React Native Android crash reporting (ANRs, uncaught JS) |
| 21 | [Analytics & Telemetry](docs/Analytics.md) | Privacy-compliant Android telemetry & event tracking |
| 22 | [Plugin Architecture](docs/Plugin_System.md) | Modular dynamic feature plugin registry for campus clubs |
| 23 | [Release Roadmap](docs/Roadmap.md) | Multi-phase React Native Android migration & release schedule |
| 24 | [Developer Guide](docs/Developer_Guide.md) | Onboarding guide, `npx expo run:android`, ADB commands |
| 25 | [Contributing Rules](docs/Contributing.md) | GitFlow branching, PR templates, ESLint/Prettier verification |

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
