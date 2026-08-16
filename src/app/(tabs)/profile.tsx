/**
 * GRI Mobile Application — Profile Workspace Screen
 *
 * Requirements Section 7:
 * Personalized secure workspace with clear separation:
 * - Anonymous: Login, Register, Help
 * - Authenticated: My Profile, My Role, Academic Info, My Services, Settings, Security, Admin Panel (if admin), Logout.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Shield,
  BookOpen,
  FileText,
  Bell,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Building,
  Key,
  X,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  ListItem,
  SectionHeader,
  Badge,
  colors,
  spacing,
  radii,
  typography,
  iconSizes,
  shadows,
} from '../../components/ui';
import { useAuthStore } from '../../core/auth/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out of your GRI account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const isAdmin =
    user?.role === 'ADMIN' ||
    user?.role === 'SYSTEM_ADMIN' ||
    user?.role === 'DEPARTMENT_ADMIN';

  return (
    <Screen variant="scroll" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader
        title="Personal Workspace"
        subtitle={isAuthenticated ? user?.fullName : 'Guest Visitor'}
        variant="primary"
      />

      <View style={styles.content}>
        {/* User Identity Card */}
        {isAuthenticated && user ? (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <User size={iconSizes.xl} color={colors.primary} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.fullName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.roleBadgeRow}>
                <Badge label={user.role} variant="primary" size="sm" />
                {user.department ? (
                  <Text style={styles.userDept} numberOfLines={1}>
                    {user.department}
                  </Text>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setShowRoleModal(true)}
              style={styles.infoIconButton}
              accessibilityLabel="View Role Permissions"
            >
              <ShieldCheck size={iconSizes.md} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          /* Anonymous Banner */
          <View style={styles.anonCard}>
            <Text style={styles.anonTitle}>Guest Experience</Text>
            <Text style={styles.anonSub}>
              Sign in to access your personalized student timetable, grade sheets, hostel passes, and official notifications.
            </Text>
            <View style={styles.anonActionRow}>
              <TouchableOpacity
                onPress={() => router.push('/auth/login')}
                style={styles.loginBtn}
              >
                <LogIn size={iconSizes.sm} color={colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.loginBtnText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/auth/register')}
                style={styles.registerBtn}
              >
                <UserPlus size={iconSizes.sm} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.registerBtnText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Authenticated Workspace Menu */}
        {isAuthenticated ? (
          <>
            <SectionHeader title="Academic & Personal Services" />
            <View style={styles.menuGroup}>
              <ListItem
                title="My Academic Profile"
                subtitle="Enrolment, Department & Programme Details"
                leftIcon={<BookOpen size={iconSizes.md} color={colors.primary} />}
                onPress={() => router.push('/content/academics/overview')}
                showSeparator
              />
              <ListItem
                title="My Documents & Vault"
                subtitle="Hall Tickets, Transcripts & Certificates"
                leftIcon={<FileText size={iconSizes.md} color={colors.info} />}
                onPress={() => router.push('/services/document-vault' as any)}
                showSeparator
              />
              <ListItem
                title="My Notification History"
                subtitle="Archived Official Notices & Circulars"
                leftIcon={<Bell size={iconSizes.md} color={colors.accent} />}
                onPress={() => router.push('/(tabs)/alerts')}
              />
            </View>

            {/* Admin Panel Entry Point (Only exposed if role is Admin, Requirement 7) */}
            {isAdmin ? (
              <>
                <SectionHeader title="Administrative Operations" />
                <View style={styles.menuGroup}>
                  <ListItem
                    title="GRI Administration Dashboard"
                    subtitle="Notification Composer, Approval Queue & User Management"
                    leftIcon={<Shield size={iconSizes.md} color={colors.secondary} />}
                    onPress={() => router.push('/admin/dashboard')}
                    rightElement={
                      <Badge label="ADMIN" variant="secondary" size="sm" />
                    }
                  />
                </View>
              </>
            ) : null}

            <SectionHeader title="Security & Settings" />
            <View style={styles.menuGroup}>
              <ListItem
                title="Account Security & MFA"
                subtitle="Hardware Keystore, Biometric & Session Management"
                leftIcon={<Key size={iconSizes.md} color={colors.success} />}
                onPress={() => Alert.alert('Security', 'Your session is encrypted with hardware keystore security.')}
                showSeparator
              />
              <ListItem
                title="Help & Support"
                subtitle="University Helpdesk & Contact Directory"
                leftIcon={<HelpCircle size={iconSizes.md} color={colors.warning} />}
                onPress={() => router.push('/content/contact' as any)}
              />
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
              activeOpacity={0.8}
            >
              <LogOut size={iconSizes.md} color={colors.error} style={{ marginRight: spacing[2] }} />
              <Text style={styles.logoutText}>Sign Out of Workspace</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* Anonymous Help Section */
          <>
            <SectionHeader title="Help & Information" />
            <View style={styles.menuGroup}>
              <ListItem
                title="About GRI Mobile Portal"
                subtitle="Deemed to be University Overview"
                leftIcon={<Building size={iconSizes.md} color={colors.primary} />}
                onPress={() => router.push('/content/about/overview')}
                showSeparator
              />
              <ListItem
                title="Contact University Helpdesk"
                subtitle="Registrar & Administrative Enquiries"
                leftIcon={<HelpCircle size={iconSizes.md} color={colors.info} />}
                onPress={() => router.push('/content/contact' as any)}
              />
            </View>
          </>
        )}

        <View style={{ height: spacing.xl }} />
      </View>

      {/* Role & Permissions Modal (Fixed ALIGN-009: uses RN Modal instead of absolute inset) */}
      <Modal visible={showRoleModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Role Capabilities</Text>
              <TouchableOpacity onPress={() => setShowRoleModal(false)}>
                <X size={iconSizes.md} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalRoleName}>Assigned Role: {user?.role}</Text>
            <Text style={styles.modalRoleSub}>
              Permissions are securely validated on the server for all requests.
            </Text>

            <View style={styles.permList}>
              {['Academic Profile Access', 'Exam Hall Ticket Download', 'Hostel Leave Submission', 'Grievance Filing'].map((perm, i) => (
                <View key={i} style={styles.permRow}>
                  <ShieldCheck size={iconSizes.sm} color={colors.primary} />
                  <Text style={styles.permText}>{perm}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.sm,
  },
  userCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.titleSm,
    color: colors.textPrimary,
  },
  userEmail: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 1,
  },
  roleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  userDept: {
    ...typography.captionSm,
    color: colors.textTertiary,
    flex: 1,
  },
  infoIconButton: {
    padding: spacing[2],
  },

  // Anonymous card
  anonCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  anonTitle: {
    ...typography.titleSm,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  anonSub: {
    ...typography.bodySm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  anonActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  loginBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    borderRadius: radii.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    ...typography.button,
    color: colors.white,
  },
  registerBtn: {
    flex: 1,
    backgroundColor: colors.primarySurface,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingVertical: spacing[3],
    borderRadius: radii.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnText: {
    ...typography.button,
    color: colors.primary,
  },

  // Menu group
  menuGroup: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    paddingVertical: spacing[3.5],
    borderRadius: radii.button,
    marginTop: spacing.md,
  },
  logoutText: {
    ...typography.button,
    color: colors.error,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.white,
    width: '100%',
    maxWidth: 320,
    borderRadius: radii.modal,
    padding: spacing.lg,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  modalTitle: {
    ...typography.titleSm,
    color: colors.textPrimary,
  },
  modalRoleName: {
    ...typography.label,
    color: colors.primaryDark,
    marginTop: spacing[1],
  },
  modalRoleSub: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  permList: {
    gap: spacing[2],
  },
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  permText: {
    ...typography.bodySm,
    color: colors.textPrimary,
    marginLeft: spacing[2],
  },
});
