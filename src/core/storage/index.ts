import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'gri-app-storage',
  encryptionKey: 'gri-android-secure-key-v1',
});

export const storageKeys = {
  ACCESS_TOKEN: 'jwt_access_token',
  REFRESH_TOKEN: 'jwt_refresh_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  APP_CONFIG: 'server_app_config',
  FEATURE_FLAGS: 'server_feature_flags',
} as const;

export const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
};

export const setItem = (key: string, value: any): void => {
  if (typeof value === 'string') {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
};

export const removeItem = (key: string): void => {
  storage.delete(key);
};

export const clearStorage = (): void => {
  storage.clearAll();
};
