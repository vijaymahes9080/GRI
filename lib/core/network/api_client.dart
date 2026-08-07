import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../storage/secure_storage_service.dart';

final apiClientProvider = Provider<ApiClient>((ref) {
  final secureStorage = ref.read(secureStorageProvider);
  return ApiClient(secureStorage);
});

/// Production Dio API Client with JWT Refresh Interceptor & Exception Handling
class ApiClient {
  late final Dio dio;
  final SecureStorageService _secureStorage;

  static const String baseUrl = 'https://api.ruraluniv.ac.in/v1';

  ApiClient(this._secureStorage) {
    dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _secureStorage.getAccessToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (DioException error, handler) async {
          if (error.response?.statusCode == 401) {
            // JWT expired — Trigger Refresh Token logic
            final refreshed = await _refreshToken();
            if (refreshed) {
              return handler.resolve(await dio.fetch(error.requestOptions));
            }
          }
          return handler.next(error);
        },
      ),
    );
  }

  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await _secureStorage.getRefreshToken();
      if (refreshToken == null) return false;

      final response = await dio.post(
        '/auth/refresh',
        data: {'refresh_token': refreshToken},
      );

      if (response.statusCode == 200) {
        final newAccessToken = response.data['access_token'];
        await _secureStorage.saveAccessToken(newAccessToken);
        return true;
      }
    } catch (_) {
      await _secureStorage.clearTokens();
    }
    return false;
  }
}
