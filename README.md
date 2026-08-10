# GRI Mobile App — Native Android Application

Official 100% Native Mobile Application for **The Gandhigram Rural Institute (Deemed to be University)**, Gandhigram, Dindigul, Tamil Nadu, India.

---

## 🏛️ Application Architecture & Key Features

This application is built as a **pure native mobile application** using React Native, Expo Router, NativeWind (Tailwind CSS), and Lucide Icons. It does **NOT** rely on webviews or external hyperlinks for navigation.

### 📱 5-Tab Navigation Structure
- **Home (`src/app/(tabs)/index.tsx`)**: Main University Dashboard with announcements, quick action tiles, stats, and press releases.
- **Explore (`src/app/(tabs)/discover.tsx`)**: Complete Category Directory for About, Governance, Administration, Academics, Admissions, Facilities, Infrastructure, Research, E-News, Alumni.
- **Services (`src/app/(tabs)/services.tsx`)**: Examination System, ESE Timetable Query Tool, e-SANAD, Ph.D. Tracker, Sub-Portals Hub, Downloads.
- **Alerts (`src/app/(tabs)/alerts.tsx`)**: Filterable Circulars, Exam Notices, Admission Deadlines, Tenders, Careers.
- **Profile (`src/app/(tabs)/profile.tsx`)**: Authenticated Portal Switcher for Student, Scholar, Department, and Alumni portals.

---

## 📂 Dedicated Route Modules Structure

Over 100 dedicated page route screens are implemented under `src/app/`:

```text
src/app/
├── (tabs)/                 # 5-Tab Bottom Navigation Bar
├── about/                  # About GRI (History, Vision, NAAC 'A', Regulations, Profile, Staff)
├── governance/             # Governance (BoM, Society, Academic Council, Finance Committee)
├── administration/         # Administration (Chancellor, VC, Registrar, CoE, FO, CVO, Deans)
├── academics/              # Academics (7 Schools, 30+ Departments, CBCS, Department Detail Template)
├── admissions/             # Admissions (UG, PG, Ph.D., Fee Refund Policy, Hostel Fee, Prospectus)
├── examination/            # Examinations (ESE Timetable Tool, Transcripts, Ph.D. Tracker, e-SANAD)
├── facilities/             # Facilities (Central Library & OPAC, Computer Centre & NKN, Labs)
├── infrastructure/         # Infrastructure (Hostels, Guest House, Health Centre, Canteen)
├── research/               # Research (RDC Policy, Patents, Projects, Scholars)
├── alumni/                 # Alumni Association (Registration, Reunions, RaiseGRI Fund)
├── enews/                  # E-News & Press Releases (Circulars, Tenders, Archives)
├── auth/                   # Authenticated Portals (Student, Scholar, Dept Login)
├── navigation.tsx          # Master Directory Screen with Search
└── search/                 # Global Search Engine across 220+ topics
```

---

## 🛠️ Build & USB Deployment (16KB Page-Aligned Standalone APK)

The application is configured to build an **offline standalone APK** with pre-bundled Hermes JavaScript assets and 16KB page alignment.

### Execution Command:
```cmd
build_and_install.bat
```

### Build Steps Performed:
1. **Offline JS Bundling**: Compiles Expo Router and TypeScript into offline assets (`index.android.bundle`).
2. **Gradle Debug APK Assembly**: Runs `./gradlew assembleDebug` with offline settings (`debuggableVariants = []`).
3. **16KB Page Alignment**: Aligns shared libraries (`zipalign -p -v 16`).
4. **Keystore Signing**: Signs aligned APK with debug keystore.
5. **ADB Installation**: Installs onto primary profile (`adb install --user 0 -r -g`) and launches `.MainActivity` on the connected mobile device.

---

## 📄 Documentation Files

- [GRI_PRODUCT_BLUEPRINT.md](file:///d:/current%20project/GRI/GRI_PRODUCT_BLUEPRINT.md): 64-Section Complete Product Blueprint and Navigation Sitemap.
- [GRI_DEEP_COMPONENT_AUDIT.md](file:///d:/current%20project/GRI/GRI_DEEP_COMPONENT_AUDIT.md): Source Website Component Audit & Portal Mapping.
