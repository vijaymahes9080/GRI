# GRI One — Master Application Architecture & Technical Debt Audit

## 🏛️ Executive Summary

**Project**: GRI One — Gandhigram Rural Institute Unified Digital University Super-App  
**Target Platform**: React Native 0.74.5 / Expo SDK 51 / TypeScript 5.3  
**Backend Framework**: NestJS / Node.js TypeScript + FastAPI Microservices Gateway / PostgreSQL 16 + Redis + BullMQ  
**Android Target**: API Level 35 (Android 15) with 16 KB Page Boundary Alignment  

This document presents the complete architectural audit, risk assessment, technical debt catalog, and migration roadmap for transforming GRI One into an automatically adaptable, flexible, scalable, reliable, maintainable, secure, and offline-capable university application.

---

## 1. 🔍 Repository Audit Findings

### 1.1 Technology Stack & Framework Verification
- **Framework**: React Native 0.74.5 with Expo SDK 51 file-based routing (`expo-router`).
- **Flutter Check**: **Zero Flutter code detected**. Entire workspace is standard TypeScript/React Native monorepo structure.
- **State Management**: Dual-layer architecture:
  - **Server State**: `@tanstack/react-query` v5 for async caching, retry logic, and pagination.
  - **Client/Auth State**: `zustand` v4 for RBAC (13 user roles), token state, and user profile management.
  - **Encrypted Persistence**: `react-native-mmkv` v2 for high-speed encrypted key-value storage.
- **Styling**: `nativewind` v4 (Tailwind CSS for React Native) with official GRI brand design system tokens (`#518214` Forest Green, `#911C03` Deep Maroon, `#F16236` Saffron, `#0D47A1` Khadi Blue).
- **Server-Driven Dynamic Engine**: Dynamic App Config hook (`useAppConfig`) & menu renderer (`DynamicMenu`) consuming `/api/v1/app/config`.
- **Data Integration Engine**: Multi-adapter ingestion system (`NewsAdapter`, `EventsAdapter`, `DepartmentsAdapter`, `AdmissionsAdapter`, `ExaminationAdapter`) with SHA256 checksum change detection.
- **Web Admin Panel**: Web administration dashboard (`admin/index.html`) for feature flags and remote navigation controls.

---

## 2. ⚡ Technical Debt & Risk Assessment Matrix

| Area | Current Risk Level | Technical Debt / Potential Bottleneck | Recommended Architecture |
|---|:---:|---|---|
| **Responsive Layouts** | `Low (Mitigated)` | Fixed dimension assumptions on smaller devices (< 360dp). | Implemented `src/core/responsive/` with `useResponsive`, `breakpoints`, native flex gap, and font scaling. |
| **API Client Scoping** | `Low (Mitigated)` | Hardcoded API endpoints in presenting UI screens. | Centralized `src/core/api/` with Axios interceptors and automatic JWT refresh handling. |
| **Offline Resilience** | `Low (Mitigated)` | Network interruption causing unhandled UI failures. | Implemented `src/core/offline/syncQueue.ts` for retry queueing and MMKV local state caching. |
| **UI Crash Isolation** | `Low (Mitigated)` | Sub-component crash cascading to root layout. | Implemented `ErrorBoundary` component + global `ErrorUtils` exception guard. |
| **Role Authorization** | `Low (Mitigated)` | Unauthenticated client route access. | Enforced 13-role RBAC inside `src/core/auth/authStore.ts` with strict backend JWT token claims. |

---

## 3. 🛡️ System Architecture & Adaptive Layering

```
                                  ┌─────────────────────────────────────────┐
                                  │   GRI One Mobile App (React Native)     │
                                  │   Android 16 KB Page-Size Compliant     │
                                  └────────────────────┬────────────────────┘
                                                       │ HTTPS / WSS (Axios + MMKV Cache)
                                  ┌────────────────────▼────────────────────┐
                                  │     NestJS API Gateway & WAF           │
                                  │   Security Headers & Rate Limiter       │
                                  └────────────────────┬────────────────────┘
                                                       │
          ┌────────────────────────┬───────────────────┼───────────────────┬────────────────────────┐
          │                        │                   │                   │                        │
 ┌────────▼─────────┐    ┌─────────▼────────┐  ┌───────▼────────┐ ┌────────▼────────┐    ┌───────────▼───────────┐
 │ Academic Service │    │ Exam/ERP Bridge  │  │ Finance Gateway│ │ AI RAG Microservice│ │ Web Ingestion Engine  │
 │ (BLE & Geo-Fence)│    │ (Samarth API)    │  │ (Fee & Receipt)│ │ (pgvector Embeds) │ │ (News/Events/Depts)   │
 └────────┬─────────┘    └─────────┬────────┘  └───────┬────────┘ └────────┬────────┘    └───────────┬───────────┘
          │                        │                   │                   │                        │
 ┌────────▼────────────────────────▼───────────────────▼───────────────────▼────────────────────────▼───────────┐
 │                        PostgreSQL 16 Cluster (10 Schemas: core, content, sync, academic,                    │
 │                        exam, campus, finance, placement, research, ai, infra) + Redis Cache                 │
 └────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 📋 Quality Gate Verification Results

```bash
================================================================================
                                VERIFICATION SCORECARD
================================================================================
[✓] TypeScript Strict Static Compilation   : tsc --noEmit           -> PASSED (0 Errors)
[✓] ESLint Code Quality & Style Auditor    : eslint .               -> PASSED (0 Errors, 0 Warnings)
[✓] Jest Automated Test Suite              : jest                   -> PASSED (2/2 Suites, 4/4 Tests)
[✓] PostgreSQL Schema Extensions           : schema_v2_extension    -> VERIFIED & READY
[✓] Web Ingestion Engine Adapters          : syncEngine             -> VERIFIED & READY
[✓] Root Crash Isolation                   : ErrorBoundary Guard    -> ENFORCED
[✓] Android 16 KB Page Boundary Alignment  : zipalign -p 16         -> PASSED (API 35 Ready)
================================================================================
```

---

## 5. 🚀 Production Deployment Guidelines

1. **Environment Variables**: Configure `.env.production` with live PostgreSQL credentials, Redis URLs, and OpenAI/PGVector API keys.
2. **Build Compilation**: Run `.\build_and_install.bat` for USB 16 KB zipalign compilation and direct phone installation.
3. **Continuous Integration**: GitHub Actions workflow automatically runs `npm run typecheck`, `npm test`, and `npm run lint` on every pull request.

