import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, ArrowRight, LogIn, Compass } from 'lucide-react-native';
import { useAuthStore } from '../core/auth/authStore';
import { colors, spacing, radii, typography, iconSizes, shadows } from '../components/ui/tokens';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const handleEnter = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <GraduationCap size={64} color={colors.white} />
      </View>
      <Text style={styles.title}>
        Gandhigram Rural Institute
      </Text>
      <Text style={styles.subtitle}>
        Deemed to be University · Ministry of Education
      </Text>

      <TouchableOpacity
        onPress={handleEnter}
        style={styles.primaryButton}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Enter GRI Portal"
      >
        <Text style={styles.primaryButtonText}>
          {isAuthenticated && user
            ? `Continue as ${user.fullName.split(' ')[0]}`
            : 'Explore University Portal'}
        </Text>
        <ArrowRight size={20} color={colors.white} />
      </TouchableOpacity>

      {!isAuthenticated && (
        <TouchableOpacity
          onPress={() => router.replace('/auth/login')}
          style={styles.secondaryButton}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Sign in to your account"
        >
          <LogIn size={18} color={colors.white} style={{ marginRight: spacing[2] }} />
          <Text style={styles.secondaryButtonText}>Sign In to Account</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.white20,
  },
  title: {
    ...typography.display,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.primarySurface,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    opacity: 0.9,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.button,
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  primaryButtonText: {
    ...typography.buttonLg,
    color: colors.white,
    marginRight: spacing[2],
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white15,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing[3],
    borderRadius: radii.button,
    borderWidth: 1,
    borderColor: colors.white20,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

