/**
 * GRI Mobile Application — Home Screen
 *
 * Requirements Section 4:
 * University overview and current information.
 * Contains: University identity, announcements, notifications, quick services,
 * search, and personalized student/staff overview.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  BookOpen,
  FileCheck,
  CreditCard,
  Building2,
  Library,
  Briefcase,
  AlertCircle,
  QrCode,
  Search,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  SearchBar,
  AnnouncementCard,
  StatCard,
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
import { navigationResolver } from '../../navigation';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { q: searchQuery.trim() },
      });
    }
  };

  const handleNavigate = (route: string) => {
    navigationResolver.navigate(router, route, user?.role);
  };

  return (
    <Screen variant="scroll" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader
        title="Gandhigram Rural Institute"
        subtitle="Deemed to be University · Ministry of Education"
        variant="primary"
        rightActions={
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/alerts')}
            style={styles.bellButton}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <Bell size={iconSizes.md} color={colors.white} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        }
      />

      <View style={styles.content}>
        {/* Search Bar Container */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search departments, programmes, services..."
            onSubmit={handleSearchSubmit}
            onFocus={() => {
              if (!searchQuery) router.push('/search');
            }}
          />
        </View>

        {/* Personalized Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeLeft}>
            <Text style={styles.welcomeGreeting}>
              {isAuthenticated && user
                ? `Welcome back, ${user.fullName.split(' ')[0]}!`
                : 'Welcome to GRI Mobile'}
            </Text>
            <Text style={styles.welcomeSubtext}>
              {isAuthenticated && user
                ? `${user.role} · ${user.department || 'Gandhigram University'}`
                : 'Deemed to be University · Official Digital Workspace'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/services')}
            style={styles.idCardButton}
            accessibilityLabel="View Digital ID"
          >
            <QrCode size={iconSizes.lg} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Live University Announcement */}
        <AnnouncementCard
          title="Autumn 2026 Examination Roster & Samarth Fee Portal"
          message="End semester exam timetables and fee clearance schedules are published. Verify details on ruraluniv.samarth.ac.in."
          category="EXAM & ADMISSION"
          priority="IMPORTANT"
          timestamp="Today, 09:30 AM"
          onPress={() => handleNavigate('/content/academics/calendar')}
        />

        {/* Academic Overview Stats (Authenticated User View) */}
        {isAuthenticated ? (
          <View style={styles.statsRow}>
            <View style={{ flex: 1, marginRight: spacing[2] }}>
              <StatCard
                label="Attendance Rate"
                value="92.4%"
                color={colors.primary}
                onPress={() => handleNavigate('/services/examinations')}
              />
            </View>
            <View style={{ flex: 1, marginLeft: spacing[2] }}>
              <StatCard
                label="Cumulative CGPA"
                value="8.85"
                color={colors.secondary}
                onPress={() => handleNavigate('/services/examinations')}
              />
            </View>
          </View>
        ) : null}

        {/* Quick Task Services Grid */}
        <SectionHeader
          title="Quick Services"
          action={{
            label: 'View All Services',
            onPress: () => router.push('/(tabs)/services'),
          }}
        />

        <View style={styles.servicesGrid}>
          <ServiceCard
            title="Examination & Results"
            subtitle="Timetables, Grades & Transcripts"
            icon={<FileCheck size={iconSizes.lg} color={colors.secondary} />}
            iconColor={colors.secondary}
            onPress={() => handleNavigate('/services/examinations')}
          />

          <ServiceCard
            title="Samarth Fee Portal"
            subtitle="Semester & Examination Online Fees"
            icon={<CreditCard size={iconSizes.lg} color={colors.primary} />}
            iconColor={colors.primary}
            onPress={() => handleNavigate('/services/fee-payment')}
          />

          <ServiceCard
            title="Hostel Out-Pass & Leave"
            subtitle="Leave Approvals & Warden Requests"
            icon={<Building2 size={iconSizes.lg} color={colors.accent} />}
            iconColor={colors.accent}
            onPress={() => handleNavigate('/services/hostel-leave')}
          />

          <ServiceCard
            title="Library OPAC Catalog"
            subtitle="Book Search, Due Dates & Renewals"
            icon={<Library size={iconSizes.lg} color={colors.examColor} />}
            iconColor={colors.examColor}
            onPress={() => handleNavigate('/services/library-catalog')}
          />
        </View>

        {/* University Institutional Discover Highlight Banner */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/discover')}
          style={styles.discoverBanner}
          activeOpacity={0.85}
        >
          <View style={styles.discoverBannerLeft}>
            <Text style={styles.discoverTag}>INSTITUTIONAL DIRECTORY</Text>
            <Text style={styles.discoverTitle}>Explore Schools & Departments</Text>
            <Text style={styles.discoverSub}>
              Browse 10+ Schools, Governance Bodies, Deans & Campus Facilities
            </Text>
          </View>
          <ArrowRight size={iconSizes.lg} color={colors.white} />
        </TouchableOpacity>

        <View style={{ height: spacing.xl }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.sm,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  searchContainer: {
    marginBottom: spacing.md,
  },
  welcomeBanner: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  welcomeLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  welcomeGreeting: {
    ...typography.titleSm,
    color: colors.textPrimary,
  },
  welcomeSubtext: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  idCardButton: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  servicesGrid: {
    marginBottom: spacing.sm,
  },
  discoverBanner: {
    backgroundColor: colors.secondary,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    ...shadows.md,
  },
  discoverBannerLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  discoverTag: {
    ...typography.captionSm,
    color: colors.warningLight,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  discoverTitle: {
    ...typography.titleSm,
    color: colors.white,
    marginTop: 2,
  },
  discoverSub: {
    ...typography.captionSm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
});
