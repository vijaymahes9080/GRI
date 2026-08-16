# GRI Mobile App & Enterprise University System

Official Mobile Application and Digital Workspace for **The Gandhigram Rural Institute (Deemed to be University)**, Gandhigram, Dindigul, Tamil Nadu, India.

---

## 🏛️ Application Architecture & Key Features

This application is built using **React Native 0.74**, **Expo SDK 51**, **TypeScript**, **FastAPI Microservices Gateway**, and **PostgreSQL Database**.

### 📱 5-Tab Navigation Structure
- **Home (`src/app/(tabs)/home.tsx`)**: Main University Overview with announcements, quick action tiles, academic stats, search bar, and personalized student/staff workspace banner.
- **Discover (`src/app/(tabs)/discover.tsx`)**: Complete Institutional Directory following GRI's official hierarchy (About, Governance, Administration, Academics, Admissions, Research, Campus, Placement, Alumni, E-News).
- **Services (`src/app/(tabs)/services.tsx`)**: Task-based actions ("I want to perform an action") including Digital Student ID Card, Samarth Fee Portal, Examination & Results, Hostel Out-Pass, Library OPAC, Grievances, Document Vault, and Transport.
- **Alerts (`src/app/(tabs)/alerts.tsx`)**: Real-Time Notification Center with categories (All, Urgent, Academic, Exam) connected via WebSocket environment URL (`EXPO_PUBLIC_API_URL`).
- **Profile (`src/app/(tabs)/profile.tsx`)**: Personalized Workspace with Anonymous view (Login, Register, Help) vs Authenticated view (My Profile, My Role, Academic Info, My Documents, Security, Logout, Admin Panel).

---

## 🎨 Centralized Design System (`src/components/ui/`)

- **`tokens.ts`**: Single source of truth for colors (Gandhigram Green `#518214`, Deep Maroon `#911C03`, Saffron `#F16236`), 4px-grid spacing scale, radii, typography, and elevation shadows.
- **`Screen.tsx`**: Universal SafeAreaView wrapper accounting for `useSafeAreaInsets()`, statusBar translucency, and KeyboardAvoidingView. Eliminates tab bar overlap on Android gesture navigation.
- **`ScreenHeader.tsx`**: Consistent header with proper 44pt touch targets and accessibility support.
- **`Cards.tsx`**: Typed card components (`AnnouncementCard`, `ServiceCard`, `InformationCard`, `StatCard`, `CategoryCard`).
- **`States.tsx`**: Standardized `LoadingState`, `SkeletonCard`, `EmptyState`, `ErrorState`, `OfflineState`, and `NoResultsState`.
- **`SearchBar.tsx` & `ListItem.tsx`**: Unified search and directory list row components.

---

## 🧭 Centralized Navigation Engine (`src/navigation/`)

- **`navigation.config.ts`**: Master configuration mapping the complete GRI website hierarchy into Discover categories and task-based Services.
- **`navigation.permissions.ts`**: Evaluates node visibility based on user role and feature flags.
- **`navigation.resolver.ts`**: `navigationResolver` executes safe, permission-checked navigation and handles deep links (`gri://...`).

---

## 🔒 Authentication, Security & Admin Control

- **Server-Side Role Enforcement (SEC-001)**: Public registration (`POST /api/v1/auth/register`) forces `role="student"` and `approval_status="pending"` server-side. Client-supplied role is ignored. Account requires admin approval before initial login.
- **Admin Self-Registration Removed (SEC-002)**: Public admin registration endpoint is removed (`HTTP 410 Gone`). Admin accounts can only be provisioned server-side or by existing admins via `POST /admin/users/create`.
- **Development Backdoor Removed (SEC-003)**: Mock logins only activate if `ALLOW_MOCK_USERS=true` and environment is not production.
- **Admin Route Guard (SEC-006)**: `AdminGuard` component prevents non-admin users from viewing `/admin/*` screens on the client.
- **Strict DB Admin Lookup (SEC-008)**: Admin endpoints verify DB user status. Unreachable DB returns `503 Service Unavailable` instead of operating on dummy fallback claims.
- **No Hardcoded Credentials (SEC-009)**: Removed demo credentials and client role selector from login screen.

---

## 🌐 Parameterized Content & Global Search

- **Universal Detail Route (`src/app/content/[type]/[id].tsx`)**: Consolidates static pages into a single reusable parameterized detail route that dynamically loads content from backend APIs or local institutional data.
- **Centralized Global Search (`src/app/search/index.tsx`)**: Global search screen searching across departments, academics, services, and documents with category filter chips.

---

## 🧪 Verified Quality Status

- **Backend Test Suite (`pytest backend/tests/`)**: **40/40 Passed (100%)**
- **TypeScript Typecheck (`npx tsc --noEmit`)**: **0 Errors (100%)**
- **Frontend Jest Suite (`npx jest`)**: **4/4 Passed (100%)**

---

## ⚡ Batch Scripts (.bat)

- `run_dev.bat` — 1-click startup for FastAPI backend server & Expo Metro bundler.
- `build_and_install.bat` — Full standalone release APK build, 16KB page-alignment, signing, and USB deployment.
- `install_to_phone.bat` — USB port forwarding (8081 & 8000), debug APK alignment, signing, and ADB deployment.
