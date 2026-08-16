/**
 * AdminGuard — Route-Level RBAC Guard
 *
 * SEC-006 FIX: Admin screens previously had no frontend route guard.
 * Any authenticated user could navigate to /admin/* and see the UI
 * until the API call failed. This component checks the role from the
 * authStore before rendering any admin content.
 *
 * IMPORTANT: This is a UX guard only. The backend ALWAYS verifies
 * admin role independently via _require_admin(). Frontend guards are
 * never the primary security boundary.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '../core/auth/authStore';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // Check if user is authenticated and has admin role
  const isAdmin =
    isAuthenticated &&
    user !== null &&
    (user.role === 'ADMIN' || user.role === 'SYSTEM_ADMIN' || user.role === 'DEPARTMENT_ADMIN');

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <ShieldAlert size={56} color="#ef4444" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 16, textAlign: 'center' }}>
          Authentication Required
        </Text>
        <Text style={{ fontSize: 14, color: '#94a3b8', marginTop: 8, textAlign: 'center' }}>
          You must be signed in to access this section.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace('/auth/login')}
          style={{ marginTop: 24, backgroundColor: '#518214', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}
          accessibilityLabel="Sign in to continue"
          accessibilityRole="button"
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <ShieldAlert size={56} color="#ef4444" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 16, textAlign: 'center' }}>
          Access Denied
        </Text>
        <Text style={{ fontSize: 14, color: '#94a3b8', marginTop: 8, textAlign: 'center', lineHeight: 22 }}>
          Administrator privileges are required to access this section.{'\n\n'}
          Your current role ({user?.role ?? 'Unknown'}) does not have permission to view admin content.
        </Text>
        <Text style={{ fontSize: 12, color: '#475569', marginTop: 12, textAlign: 'center' }}>
          Contact the GRI system administrator if you believe this is an error.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/profile')}
          style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}
          accessibilityLabel="Go back to profile"
          accessibilityRole="button"
        >
          <ArrowLeft size={16} color="#94a3b8" />
          <Text style={{ color: '#cbd5e1', fontWeight: '600', fontSize: 14, marginLeft: 8 }}>Back to Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
}
