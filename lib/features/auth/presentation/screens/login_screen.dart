import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';
import '../../../../core/constants/app_colors.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(
                  Icons.account_balance,
                  size: 80,
                  color: AppColors.primaryMaroon,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Gandhigram Rural Institute',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primaryMaroon,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Deemed to be University',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Roll Number / Email',
                    prefixIcon: Icon(Icons.person),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    prefixIcon: Icon(Icons.lock),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 24),
                if (authState.errorMessage != null) ...[
                  Text(
                    authState.errorMessage!,
                    style: const TextStyle(color: Colors.red),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                ],
                ElevatedButton(
                  onPressed: authState.isLoading
                      ? null
                      : () {
                          if (_formKey.currentState!.validate()) {
                            ref.read(authProvider.notifier).login(
                                  _emailController.text,
                                  _passwordController.text,
                                );
                          }
                        },
                  child: authState.isLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text('LOGIN'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
