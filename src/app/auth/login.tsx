import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  UserPlus,
} from 'lucide-react-native';
import { useAuthStore, UserRole, User } from '../../core/auth/authStore';
import { apiClient } from '../../core/api';

export default function LoginScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

      setPassword('Admin@GRI2026');
    } else {
      setEmail('faculty@test.edu');
      setPassword('FacultyPass#123');
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter your Email and Password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await apiClient.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      const data = response.data;

      if (data && data.access_token) {
        // SEC-009: Role comes exclusively from the server response.
        // The client never determines or overrides the user's role.
        const roleUpper = (data.role || 'STUDENT').toUpperCase() as UserRole;
        const userObj: User = {
          id: data.user_id,
          username: email.split('@')[0],
          email: data.email || email,
          fullName: data.full_name || 'GRI User',
          role: roleUpper,
          department: data.department,
          rollNumber: data.university_id,
        };

        await setAuth(userObj, data.access_token, data.refresh_token);
        router.replace('/(tabs)/home');
        return;
      }
    } catch (err: any) {
      const backendDetail = err?.response?.data?.detail;
      if (err?.response?.status === 403 && typeof backendDetail === 'string' && backendDetail.includes('pending')) {
        setErrorMsg('Your account is pending administrator approval. Please contact the GRI admin office.');
      } else {
        setErrorMsg(typeof backendDetail === 'string' ? backendDetail : 'Invalid credentials. Please check your email and password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView className="flex-1 bg-[#0D47A1]" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Branding */}
        <View className="pt-14 pb-8 px-6 items-center">
          <View className="bg-white/15 p-4 rounded-full mb-3 border border-white/20">
            <GraduationCap size={44} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-white text-center">
            Gandhigram Rural Institute
          </Text>
          <Text className="text-xs text-blue-100 text-center font-medium mt-1">
            Deemed to be University · Secure Portal
          </Text>
        </View>

        {/* Form Container */}
        <View className="flex-1 bg-gray-50 rounded-t-3xl p-6 shadow-2xl">
          <Text className="text-xl font-bold text-gray-900 mb-1 text-center">
            Sign In
          </Text>
          <Text className="text-xs text-gray-500 mb-6 text-center">
            Enter your institutional email and password
          </Text>

          {/* Error Banner */}
          {errorMsg && (
            <View className="bg-red-50 border border-red-200 p-3.5 rounded-xl mb-4 flex-row items-center">
              <AlertCircle size={18} color="#D32F2F" />
              <Text className="text-xs text-red-700 font-semibold ml-2 flex-1">{errorMsg}</Text>
            </View>
          )}

          {/* Email Input */}
          <Text className="text-xs font-bold text-gray-700 uppercase mb-1.5">
            Email or Register Number
          </Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3.5 py-3 mb-4 shadow-sm">
            <Mail size={18} color="#6B7280" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="user@ruraluniv.ac.in or roll number"
              autoCapitalize="none"
              keyboardType="email-address"
              className="flex-1 ml-2.5 text-sm text-gray-900 font-medium"
              placeholderTextColor="#9CA3AF"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <Text className="text-xs font-bold text-gray-700 uppercase mb-1.5">Password</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3.5 py-3 mb-2 shadow-sm">
            <Lock size={18} color="#6B7280" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••"
              className="flex-1 ml-2.5 text-sm text-gray-900 font-medium"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1" accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={18} color="#6B7280" /> : <Eye size={18} color="#6B7280" />}
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => router.push('/auth/forgot_password' as any)}
            className="self-end mb-6"
          >
            <Text className="text-xs font-semibold text-[#518214]">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Action Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="bg-[#518214] py-4 rounded-xl items-center flex-row justify-center shadow-md mb-4"
            activeOpacity={0.8}
            accessibilityLabel="Sign in to GRI Portal"
            accessibilityRole="button"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Text className="text-white font-bold text-base uppercase mr-2">Sign In</Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center items-center mt-2 mb-4">
            <Text className="text-xs text-gray-600 font-medium">New Student? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register' as any)}>
              <Text className="text-xs font-bold text-[#911C03]">Request Account Access</Text>
            </TouchableOpacity>
          </View>

          {/* Security note */}
          <View className="flex-row items-center justify-center mt-2">
            <ShieldCheck size={14} color="#9CA3AF" />
            <Text className="text-[10px] text-gray-400 ml-1.5">
              Secured with end-to-end encryption · GRI ISMS Policy
            </Text>
          </View>

          <View className="h-6" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
