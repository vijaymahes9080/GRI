# Enterprise Specification: Authentication & Security Tokens

## 1. Authentication Lifecycle (OAuth2 + JWT)
The app uses OAuth2 password & refresh token grants. Tokens are stored in high-performance **MMKV** storage backed by Android Keystore hardware security.

---

## 2. Axios Auto-Refresh Token Interceptor Flow

```typescript
import axios from 'axios';
import { mmkvStorage } from '@core/storage';

export const setupAuthInterceptor = (instance: typeof axios) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = mmkvStorage.getString('jwt_refresh_token');
        if (refreshToken) {
          try {
            const res = await axios.post('https://api.ruraluniv.ac.in/api/v1/auth/refresh', { refreshToken });
            const newAccessToken = res.data.data.accessToken;
            mmkvStorage.set('jwt_access_token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshErr) {
            mmkvStorage.delete('jwt_access_token');
            mmkvStorage.delete('jwt_refresh_token');
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
```

---

## 3. Biometric Unlock (`expo-biometrics`)
Android Fingerprint and Face Unlock can be enabled for instant authentication without re-typing passwords.
