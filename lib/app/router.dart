import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../features/auth/presentation/providers/auth_provider.dart';
import '../features/auth/presentation/screens/login_screen.dart';
import '../features/home/presentation/screens/dashboard_screen.dart';
import '../features/ai_assistant/presentation/screens/ai_chat_screen.dart';
import '../features/attendance/presentation/screens/attendance_screen.dart';

/// Router Provider using Riverpod and GoRouter
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/dashboard',
    redirect: (context, state) {
      final isLoggingIn = state.matchedLocation == '/login';

      if (!authState.isAuthenticated) {
        return isLoggingIn ? null : '/login';
      }

      if (isLoggingIn) {
        return '/dashboard';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        name: 'dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/ai-chat',
        name: 'ai-chat',
        builder: (context, state) => const AIChatScreen(),
      ),
      GoRoute(
        path: '/attendance',
        name: 'attendance',
        builder: (context, state) => const AttendanceScreen(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Page not found: ${state.error}'),
      ),
    ),
  );
});
