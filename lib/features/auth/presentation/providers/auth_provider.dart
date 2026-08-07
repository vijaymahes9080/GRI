import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/models/user_model.dart';
import '../../../../core/storage/secure_storage_service.dart';

class AuthState {
  final bool isAuthenticated;
  final bool isLoading;
  final UserModel? user;
  final String? errorMessage;

  const AuthState({
    this.isAuthenticated = false,
    this.isLoading = false,
    this.user,
    this.errorMessage,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    bool? isLoading,
    UserModel? user,
    String? errorMessage,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      user: user ?? this.user,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final SecureStorageService _secureStorage;

  AuthNotifier(this._secureStorage) : super(const AuthState()) {
    checkAuthStatus();
  }

  Future<void> checkAuthStatus() async {
    state = state.copyWith(isLoading: true);
    final token = await _secureStorage.getAccessToken();
    if (token != null) {
      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        user: const UserModel(
          id: '1',
          email: 'vijay@ruraluniv.ac.in',
          role: 'student',
          firstName: 'Vijay',
          lastName: 'Mahes',
          department: 'Computer Science',
          rollNumber: '21301001',
        ),
      );
    } else {
      state = state.copyWith(isAuthenticated: false, isLoading: false);
    }
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      await Future.delayed(const Duration(seconds: 1)); // Mock API delay
      await _secureStorage.saveAccessToken('mock_access_token_jwt');
      await _secureStorage.saveRefreshToken('mock_refresh_token_jwt');
      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        user: UserModel(
          id: '1',
          email: email,
          role: 'student',
          firstName: 'Vijay',
          lastName: 'Mahes',
          department: 'Computer Science',
          rollNumber: '21301001',
        ),
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: 'Invalid credentials. Please try again.',
      );
    }
  }

  Future<void> logout() async {
    await _secureStorage.clearTokens();
    state = const AuthState(isAuthenticated: false);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final secureStorage = ref.watch(secureStorageProvider);
  return AuthNotifier(secureStorage);
});
