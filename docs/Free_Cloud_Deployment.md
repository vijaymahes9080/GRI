# ☁️ GRI One — Free Cloud Deployment Architecture

This document specifies the zero-cost, high-availability production cloud infrastructure for **GRI One — Gandhigram Rural Institute Unified Digital University Application**.

---

## 🛠️ Free Cloud Stack Overview

| Service | Purpose | Plan / Tier | Integration Point |
|---|---|:---:|---|
| **GitHub** | Source Code & Version Control | Free Public/Private Repo | `github.com/vijaymahes9080/GRI` |
| **GitHub Actions** | Automated CI/CD Pipeline | 2,000 Free Build Mins/mo | `.github/workflows/deploy_free_stack.yml` |
| **Cloudflare** | DNS Routing, SSL & Global CDN | Free Tier | DNS CNAMEs & DDoS Protection |
| **Supabase** | PostgreSQL Database + Auth + Storage | Free Tier (500MB DB, 1GB Storage) | `database/schema.sql` (9 Schemas + pgvector) |
| **Railway** | FastAPI Backend Microservices | $5 Free Monthly Credit | `backend/Dockerfile` + `railway.json` |
| **Firebase** | FCM Push Notification Engine | Spark Plan (Unlimited Push) | `Expo Notifications` + FCM v1 HTTP API |
| **Vercel** | Admin Web Portal Hosting | Hobby Free Tier | `vercel.json` Static Admin Deployment |
| **Docker** | Microservices Containerization | Multi-stage Dockerfile | `backend/Dockerfile` & `docker-compose.yml` |
| **Uptime Kuma** | Real-time Uptime Monitoring | Self-Hosted / Free Cloud Node | `deploy/monitoring/uptime_kuma_config.json` |

---

## 🏗️ Deployment Architecture Diagram

```
                                  ┌───────────────────────────────────────────┐
                                  │           Cloudflare CDN & DNS            │
                                  │      SSL Encryption & WAF Protection      │
                                  └─────────────────────┬─────────────────────┘
                                                        │
                      ┌─────────────────────────────────┴─────────────────────────────────┐
                      │                                                                   │
           ┌──────────▼──────────┐                                             ┌──────────▼──────────┐
           │   Vercel Hosting    │                                             │   Railway Hosting   │
           │  (Admin Web Portal) │                                             │  (FastAPI Backend)  │
           └─────────────────────┘                                             └──────────┬──────────┘
                                                                                          │
                                            ┌─────────────────────────────────────────────┼─────────────────────────────────────────────┐
                                            │                                             │                                             │
                                 ┌──────────▼──────────┐                       ┌──────────▼──────────┐                       ┌──────────▼──────────┐
                                 │   Supabase Cloud    │                       │  Firebase FCM Engine│                       │ Uptime Kuma Monitor │
                                 │ (PostgreSQL+Vector) │                       │ (Push Notifications)│                       │ (Uptime Health Check)│
                                 └─────────────────────┘                       └─────────────────────┘                       └─────────────────────┘
```

---

## ⚙️ Step-by-Step Setup Guide

### 1. Database & Storage: Supabase Setup
1. Create a free project at [supabase.com](https://supabase.com).
2. Execute [database/schema.sql](file:///d:/current%20project/GRI/database/schema.sql) in the Supabase SQL Editor to initialize all 9 database schemas (`core`, `academic`, `exam`, `campus`, `finance`, `placement`, `research`, `ai`, `infra`) and enable `pgvector`.
3. Copy the Connection String into `.env.production` as `DATABASE_URL`.

### 2. Backend Microservices: Railway Setup
1. Link your GitHub repository at [railway.app](https://railway.app).
2. Configure build strategy to **Dockerfile** using `backend/Dockerfile`.
3. Set Environment Variables (`DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`).
4. Railway will automatically build and expose `https://api.ruraluniv-app.railway.app`.

### 3. Push Notifications: Firebase Cloud Messaging (FCM)
1. Register `com.gri.mobile` in the Firebase Console.
2. Download `google-services.json` and place in `android/app/`.
3. Generate Server Key for push notification dispatch via FastAPI `notifications.py`.

### 4. Admin Portal: Vercel Setup
1. Connect repository to [vercel.com](https://vercel.com).
2. Set build settings according to `vercel.json`.

### 5. Monitoring: Uptime Kuma Configuration
1. Import `deploy/monitoring/uptime_kuma_config.json` into your Uptime Kuma instance.
2. Configured endpoints: `/health` API check, Vercel Admin Portal check, and live `ruraluniv.ac.in` sync monitor.

---

## 🔒 Verification & Quality Gates

Run local quality checks before pushing:
```bash
npm run typecheck   # TypeScript Static Compiler (0 Errors)
npm run lint        # ESLint Quality Auditor (0 Errors, 0 Warnings)
npm test            # Jest Unit Test Suite (4/4 Passed)
```
