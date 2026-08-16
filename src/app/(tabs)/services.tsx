/**
 * GRI Mobile Application — Services Screen (Task-Based Actions)
 *
 * Requirements Section 5:
 * Distinction:
 *   Discover = "I want information."
 *   Services = "I want to perform an action."
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  QrCode,
  CreditCard,
  Building2,
  Library,
  AlertCircle,
  Download,
  Bus,
  ShieldCheck,
  X,
  User,
  GraduationCap,
  FileCheck,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  ServiceCard,
  SectionHeader,
  colors,
  spacing,
  radii,
  typography,
  iconSizes,
  shadows,
} from '../../components/ui';
import { useAuthStore } from '../../core/auth/authStore';
import { navigationResolver, SERVICE_ITEMS } from '../../navigation';

export default function ServicesScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [showDigitalId, setShowDigitalId] = useState(false);

  const handleAction = (item: (typeof SERVICE_ITEMS)[0]) => {
    if (item.id === 'svc_digital_id') {
      setShowDigitalId(true);
    } else {
      navigationResolver.navigate(router, item.route, user?.role);
    }
  };

  return (
    <Screen variant="scroll" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader
        title="GRI Services"
        subtitle="Task-Based University Services & Portals"
        variant="primary"
      />

      <View style={styles.content}>
        {/* Digital ID Hero Card */}
        <TouchableOpacity
          onPress={() => setShowDigitalId(true)}
          activeOpacity={0.85}
          style={styles.digitalIdBanner}
          accessibilityLabel="View Official Digital Student ID Card"
          accessibilityRole="button"
        >
          <View style={styles.digitalIdLeft}>
            <View style={styles.badgeRow}>
              <QrCode size={iconSizes.sm} color={colors.primarySurface} />
              <Text style={styles.digitalIdBadgeText}>OFFICIAL DIGITAL IDENTITY</Text>
            </View>
            <Text style={styles.digitalIdTitle}>GRI Digital Student ID Card</Text>
            <Text style={styles.digitalIdSub}>
              Tap to display your QR-verified student credential card
            </Text>
          </View>
          <View style={styles.digitalIdIconBg}>
            <QrCode size={iconSizes['2xl']} color={colors.white} />
          </View>
        </TouchableOpacity>

        {/* Task Services Section */}
        <SectionHeader title="Online Portals & Actions" />

        <View style={styles.servicesContainer}>
          <ServiceCard
            title="Digital Student ID Card"
            subtitle="View & Scan Official QR Verification Credential"
            icon={<QrCode size={iconSizes.lg} color={colors.primary} />}
            iconColor={colors.primary}
            onPress={() => setShowDigitalId(true)}
          />

          <ServiceCard
            title="Samarth Fee Payment Portal"
            subtitle="Pay Semester, Hostel & Examination Fees Online"
            icon={<CreditCard size={iconSizes.lg} color={colors.secondary} />}
            iconColor={colors.secondary}
            onPress={() => navigationResolver.navigate(router, '/services/fee-payment', user?.role)}
          />

          <ServiceCard
            title="Examination & Results"
            subtitle="View Timetables, Revaluation & Semester Marksheets"
            icon={<FileCheck size={iconSizes.lg} color={colors.info} />}
            iconColor={colors.info}
            onPress={() => navigationResolver.navigate(router, '/services/examinations', user?.role)}
          />

          <ServiceCard
            title="Hostel Out-Pass & Leave"
            subtitle="Submit Warden Leave Requests & Track Out-Pass Status"
            icon={<Building2 size={iconSizes.lg} color={colors.accent} />}
            iconColor={colors.accent}
            onPress={() => navigationResolver.navigate(router, '/services/hostel-leave', user?.role)}
          />

          <ServiceCard
            title="Library OPAC Catalog"
            subtitle="Search Books, Check Due Dates & Online Renewals"
            icon={<Library size={iconSizes.lg} color={colors.examColor} />}
            iconColor={colors.examColor}
            onPress={() => navigationResolver.navigate(router, '/services/library-catalog', user?.role)}
          />

          <ServiceCard
            title="Grievance Portal (CRAMS)"
            subtitle="File Complaints & Track Resolution Status"
            icon={<AlertCircle size={iconSizes.lg} color={colors.error} />}
            iconColor={colors.error}
            onPress={() => navigationResolver.navigate(router, '/services/grievance-portal', user?.role)}
          />

          <ServiceCard
            title="Document Vault & Downloads"
            subtitle="Download Hall Tickets, Prospectus & Certificates"
            icon={<Download size={iconSizes.lg} color={colors.academicColor} />}
            iconColor={colors.academicColor}
            onPress={() => navigationResolver.navigate(router, '/services/document-vault', user?.role)}
          />

          <ServiceCard
            title="Transport & Bus Pass"
            subtitle="Bus Schedules, Routes & Pass Applications"
            icon={<Bus size={iconSizes.lg} color={colors.warning} />}
            iconColor={colors.warning}
            onPress={() => navigationResolver.navigate(router, '/services/transport-bus', user?.role)}
          />
        </View>

        <View style={{ height: spacing.xl }} />
      </View>

      {/* Digital ID Modal (Fixed: No nested ScrollView, ALIGN-008) */}
      <Modal visible={showDigitalId} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowDigitalId(false)}
                style={styles.modalCloseButton}
                accessibilityLabel="Close Digital ID"
              >
                <X size={iconSizes.md} color={colors.white} />
              </TouchableOpacity>
              <GraduationCap size={iconSizes['3xl']} color={colors.white} />
              <Text style={styles.modalUniversityTitle}>Gandhigram Rural Institute</Text>
              <Text style={styles.modalUniversitySub}>Deemed to be University · Official ID</Text>
            </View>

            {/* Modal Body */}
            <View style={styles.modalBody}>
              <View style={styles.avatarBorder}>
                <User size={iconSizes['3xl']} color={colors.primary} />
              </View>
              <Text style={styles.studentName}>
                {user?.fullName || 'Vijay Mahes'}
              </Text>
              <Text style={styles.studentRoll}>
                {user?.rollNumber || 'GRI-2026-8841'}
              </Text>
              <Text style={styles.studentDepartment}>
                {user?.department || 'Computer Science & Applications'}
              </Text>

              {/* QR Verification Container */}
              <View style={styles.qrContainer}>
                <QrCode size={110} color={colors.textPrimary} />
                <Text style={styles.qrTokenText}>
                  VERIFIED TOKEN: GRI-{user?.id ? user.id.slice(0, 8) : '88419921'}
                </Text>
              </View>

              <View style={styles.validityContainer}>
                <ShieldCheck size={iconSizes.sm} color={colors.primary} />
                <Text style={styles.validityText}>Valid Academic Session 2025-2026</Text>
              </View>
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
  digitalIdBanner: {
    backgroundColor: colors.primary,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  digitalIdLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  digitalIdBadgeText: {
    ...typography.captionSm,
    color: colors.primarySurface,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginLeft: spacing[1],
  },
  digitalIdTitle: {
    ...typography.titleSm,
    color: colors.white,
  },
  digitalIdSub: {
    ...typography.captionSm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  digitalIdIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  servicesContainer: {
    marginBottom: spacing.sm,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    maxWidth: 340,
    borderRadius: radii.modal,
    overflow: 'hidden',
    ...shadows.lg,
  },
  modalHeader: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalUniversityTitle: {
    ...typography.titleSm,
    color: colors.white,
    marginTop: spacing[2],
    textAlign: 'center',
  },
  modalUniversitySub: {
    ...typography.captionSm,
    color: colors.primarySurface,
    marginTop: 2,
  },
  modalBody: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  avatarBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySurface,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  studentName: {
    ...typography.titleSm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  studentRoll: {
    ...typography.label,
    color: colors.secondary,
    marginTop: 2,
  },
  studentDepartment: {
    ...typography.captionSm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  qrContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  qrTokenText: {
    ...typography.captionSm,
    fontFamily: 'monospace',
    color: colors.textTertiary,
    marginTop: spacing[2],
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  validityText: {
    ...typography.captionSm,
    fontWeight: '600',
    color: colors.primaryDark,
    marginLeft: spacing[1],
  },
});
