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

## 2. Remote Database Schema (PostgreSQL 16)

```sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roll_number VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    current_semester INT NOT NULL DEFAULT 1,
    cgpa NUMERIC(3, 2) DEFAULT 0.00
);

CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_code VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('PRESENT', 'ABSENT', 'LATE')),
    ble_beacon_id VARCHAR(50) NOT NULL
);
```
