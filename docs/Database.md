# Enterprise Specification: Local Storage & Remote Database Design

## 1. Local Device Storage (`react-native-mmkv`)
The app utilizes **`react-native-mmkv`** for fast synchronous key-value persistence (up to 10x faster than AsyncStorage).

```typescript
import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV({
  id: 'gri-user-storage',
  encryptionKey: 'gri-android-secure-key',
});
```

---

---

## 3. Remote Database Schema Extensions (PostgreSQL 16 Schema v2)

Refer to [database/schema_v2_extension.sql](file:///d:/current%20project/GRI/database/schema_v2_extension.sql):

- **`core.app_config`**: Remote versioning, maintenance status, theme tokens.
- **`core.feature_flags`**: Feature toggles (`admissions`, `examinations`, `results`, `departments`, `faculty`, `news`).
- **`core.navigation_nodes`**: Server-driven navigation structure.
- **`content.entities`**: Unified content model for announcements, news, events, departments, faculty, admissions, exams, results, documents.
- **`sync.sync_jobs`**: Ingestion execution log and change detection audits.

