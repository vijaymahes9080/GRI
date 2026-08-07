# Enterprise Specification: Security Architecture & OWASP Compliance

## 1. Android OWASP Mobile Security
- **ProGuard / R8 Obfuscation**: Enabled in `android/app/build.gradle` to obfuscate JavaScript bundle and native Java/Kotlin code.
- **Root Detection**: Integrates root check utilities to disable payment features on compromised devices.
- **SSL Certificate Pinning**: Enforces SHA-256 SSL certificate pinning inside Axios network layer.
- **Secure Encrypted Key-Value Store**: Sensitive user credentials are stored using **MMKV** encrypted via Android Keystore.
