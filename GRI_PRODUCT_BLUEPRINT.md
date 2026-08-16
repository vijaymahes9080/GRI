# GRI Mobile Application — Master Product Blueprint & Sitemap

## Executive Architecture Statement

GRI Mobile is the official digital university platform for **The Gandhigram Rural Institute (Deemed to be University)**. It provides a secure, task-oriented mobile experience for Students, Faculty, Staff, Alumni, and Administrators.

---

## 1. 📱 Top-Level Mobile Navigation Sitemap

```text
GRI Mobile Application
│
├── Home ((tabs)/home)
│   ├── University Identity & Vision Banner
│   ├── Personalized Student/Staff Workspace Card
│   ├── Live Samarth & Exam Announcement Banner
│   ├── Attendance Rate & CGPA Quick Stats
│   ├── Global Search Bar
│   └── Quick Service Shortcuts
│
├── Discover ((tabs)/discover) — "I Want Information"
│   ├── About GRI (History, Vision, Mission, Profile, NAAC/NIRF Accreditation, Statutory Regulations)
│   ├── Governance (Board of Management, Academic Council, Finance Committee, Planning Board)
│   ├── Administration (Chancellor, VC, Registrar, COE, Finance Officer, Deans)
│   ├── Academics (Schools, Departments, Programmes Offered, Calendar 2025-26, CBCS Syllabi)
│   ├── Admissions 2026 (UG, PG, PhD, Fee Structure & Prospectus)
│   ├── Research & RDC (RDC Cell, Projects, Publications & Patents)
│   ├── Campus & Facilities (Central Library & OPAC, Hostels, Health Centre, Computer Centre)
│   ├── Placements (Cell, Drives, Recruiter Info)
│   ├── Alumni Network (Association, Registration, Events)
│   └── E-News & Circulars (News, Circulars, Tenders, Careers)
│
├── Services ((tabs)/services) — "I Want to Perform an Action"
│   ├── Digital Student ID Card (QR Verified Modal Credential)
│   ├── Samarth Fee Payment Portal
│   ├── Examination & Results (Timetables, Grade Sheets, Transcripts)
│   ├── Hostel Out-Pass & Leave Requests
│   ├── Library OPAC Catalog (Book Search & Renewals)
│   ├── Grievance Portal (CRAMS Complaint Filing & Tracking)
│   ├── Document Vault & Downloads
│   └── Transport & Bus Pass Renewal
│
├── Alerts ((tabs)/alerts) — Official Notification Center
│   ├── All / Urgent / Academic / Examination / Admission Categories
│   ├── WebSocket Real-Time Push Dispatch (/ws/announcements)
│   ├── Read / Unread Status Management
│   └── Deep-Link Navigation Resolution
│
└── Profile ((tabs)/profile) — Personal Workspace
    ├── Anonymous View: Login, Account Registration Request, Helpdesk
    └── Authenticated View: Academic Profile, Document Vault, Notifications, Security, Logout
        └── Admin Panel ((admin/dashboard)): Notification Composer, Approval Queue, Emergency Broadcast (Admin Only)
```

---

## 2. 🔒 Security & Role Authorization System

- **Roles Supported**: `student`, `scholar`, `faculty`, `staff`, `alumni`, `other`, `admin`.
- **Self-Registration Rule**: Forced `role="student"` and `approval_status="pending"` server-side.
- **Admin Provisioning**: Public admin self-registration removed. Admins created exclusively via `POST /admin/users/create` or server scripts.
- **Client Route Protection**: `AdminGuard` enforces RBAC checks before rendering `/admin/*` screens.
- **Backend Verification**: Server dependencies independently verify JWT signature and DB user status on every request.

---

## 3. 🧪 Technical Verification Metrics

- **Backend Pytest Suite**: 40 Passed / 0 Failed
- **TypeScript Compiler**: 0 Errors
- **Frontend Jest Suite**: 4 Passed / 0 Failed
