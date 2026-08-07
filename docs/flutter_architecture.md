# GRI Production Flutter Architecture Specification
## Clean Architecture + MVVM + Riverpod 2.x + Offline-First Design
**Author**: Google Flutter GDE (Vijay Mahes)  
**Version**: 1.0.0  
**Framework**: Flutter 3.x / Dart 3.x  

---

## 1. Architectural Layers (Clean Architecture + MVVM)

The GRI mobile & web application follows **Clean Architecture** combined with **MVVM (Model-View-ViewModel)** state management using **Riverpod 2.x**:

```
lib/
├── app/                           # App Configuration Layer
│   ├── app.dart                   # MaterialApp.router with ThemeMode
│   ├── router.dart                # GoRouter setup with auth guards
│   └── observer.dart              # Riverpod ProviderObserver logging
│
├── core/                          # Cross-Cutting Infrastructure
│   ├── constants/                 # AppColors, AppTypography, Endpoints
│   ├── theme/                     # AppTheme (Material 3 Light & Dark)
│   ├── network/                   # Dio ApiClient, JWT Refresh Interceptor
│   ├── storage/                   # SecureStorageService, HiveCacheService
│   └── utils/                     # Formatters, Validators, Helpers
│
├── features/                      # Domain-Driven Feature Modules
│   ├── auth/
│   │   ├── data/                  # Repositories & API Data Sources
│   │   ├── domain/                # Entities (UserModel) & Use Cases
│   │   └── presentation/          # Riverpod AuthNotifier & LoginScreen
│   ├── home/                      # Dashboard & Role-based Navigation
│   ├── attendance/                # Attendance Screen & Geofence Logic
│   ├── ai_assistant/              # RAG Chatbot Screen & Message Notifier
│   ├── hostel/                    # Digital Out-Pass & Mess Billing
│   ├── examination/               # Hall Tickets & Result Calculators
│   └── village_outreach/          # Offline Survey Collector
│
└── main.dart                      # Bootstrap Entry Point
```

---

## 2. Technology Stack & Key Libraries

| Component | Library / Pattern | Purpose |
|---|---|---|
| **State Management** | `flutter_riverpod` + `riverpod_annotation` | Compile-safe, reactive state management |
| **Navigation** | `go_router` | Declarative routing with auth redirect guards |
| **HTTP Client** | `dio` | Interceptors for JWT rotation & network retry |
| **Immutability & Serialization** | `freezed` + `json_serializable` | Type-safe JSON parsing & data classes |
| **Push Notifications** | `firebase_messaging` + `flutter_local_notifications` | FCM push notifications |
| **Secure Key Store** | `flutter_secure_storage` | Encrypted storage for JWTs & credentials |
| **Offline Cache** | `hive` + `hive_flutter` | High-speed NoSQL key-value cache |
| **Relational Storage** | `drift` + `sqlite3_flutter_libs` | Reactive SQLite database for offline sync |

---

## 3. Offline-First Sync & Cache Strategy

1. **Read Path**:
   - `UI` queries `Repository`.
   - `Repository` attempts to read from `HiveCacheService` / `Drift Database` first for instant UI response (<50ms).
   - `Repository` fetches fresh data from `Dio ApiClient` in the background and updates local database + UI state.

2. **Write Path (Offline Surveys / Out-Pass)**:
   - If network is disconnected (`connectivity_plus`), payload is stored in `Drift SQLite Outbox Queue`.
   - `SyncEngine` listens to connectivity recovery and flushes pending queue to backend API.

---

## 4. Performance Optimizations Applied

- **Const Constructors**: Enforced everywhere to eliminate rebuild allocations.
- **Image Caching**: MemCache sizing and WebP format compression.
- **Isolate Offloading**: Heavy JSON parsing performed via `compute()` isolates.
- **Repaint Boundaries**: Applied on animated components and list items to isolate canvas repaints.

---
*End of GRI Flutter Architecture Specification.*
