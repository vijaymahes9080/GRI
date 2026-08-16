/**
 * GRI Card System — Typed, Consistent Card Variants
 *
 * ALIGNMENT FIX (ALIGN-003, ALIGN-009, DUP-003):
 * All cards share the same radius, padding, shadow, and press behavior.
 * Previously each screen defined its own card styling ad-hoc.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, radii, typography, shadows, iconSizes } from './tokens';
import { Badge } from './Badge';

// ─── Base Card ────────────────────────────────────────────────────────────────

interface BaseCardProps {
  onPress?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

export function BaseCard({ onPress, style, children, testID, accessibilityLabel }: BaseCardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={[styles.card, style]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[styles.card, style]} testID={testID}>
      {children}
    </View>
  );
}

// ─── Announcement Card ────────────────────────────────────────────────────────

interface AnnouncementCardProps {
  title: string;
  message: string;
  category?: string;
  priority?: 'URGENT' | 'IMPORTANT' | 'NORMAL' | string;
  timestamp?: string;
  isUnread?: boolean;
  hasAttachment?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function AnnouncementCard({
  title,
  message,
  category,
  priority = 'NORMAL',
  timestamp,
  isUnread = false,
  hasAttachment,
  onPress,
  style,
}: AnnouncementCardProps) {
  const priorityConfig = {
    URGENT: { bg: colors.urgentBg, text: colors.urgentText, label: 'Urgent' },
    IMPORTANT: { bg: colors.importantBg, text: colors.importantText, label: 'Important' },
    NORMAL: { bg: colors.normalBg, text: colors.normalText, label: 'Notice' },
  };
  const pc = priorityConfig[priority as keyof typeof priorityConfig] ?? priorityConfig.NORMAL;

  return (
    <BaseCard onPress={onPress} style={StyleSheet.flatten([styles.announcementCard, isUnread && styles.unreadCard, style])}>
      {isUnread && <View style={styles.unreadDot} />}
      <View style={styles.announcementHeader}>
        <View style={[styles.priorityBadgeContainer, { backgroundColor: pc.bg }]}>
          <Text style={[styles.priorityText, { color: pc.text }]}>{pc.label}</Text>
        </View>
        {timestamp ? (
          <Text style={styles.timestamp}>{timestamp}</Text>
        ) : null}
      </View>
      <Text style={styles.announcementTitle} numberOfLines={2}>{title}</Text>
      <Text style={styles.announcementMessage} numberOfLines={2}>{message}</Text>
      {category ? (
        <Text style={styles.categoryTag}>{category.toUpperCase()}</Text>
      ) : null}
    </BaseCard>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor?: string;
  onPress?: () => void;
  badge?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function ServiceCard({
  title,
  subtitle,
  icon,
  iconColor = colors.primary,
  onPress,
  badge,
  disabled = false,
  style,
}: ServiceCardProps) {
  return (
    <BaseCard
      onPress={disabled ? undefined : onPress}
      style={StyleSheet.flatten([styles.serviceCard, disabled && styles.disabledCard, style])}
      accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}
    >
      <View style={[styles.serviceIconContainer, { backgroundColor: `${iconColor}18` }]}>
        {icon}
      </View>
      <View style={styles.serviceTextContainer}>
        <Text style={[styles.serviceTitle, disabled && styles.disabledText]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.serviceSubtitle, disabled && styles.disabledSubtext]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {badge ? (
        <Badge label={badge} variant="accent" size="sm" />
      ) : null}
    </BaseCard>
  );
}

// ─── Information Card ─────────────────────────────────────────────────────────

interface InformationCardProps {
  title: string;
  description?: string;
  metadata?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export function InformationCard({
  title,
  description,
  metadata,
  icon,
  onPress,
  rightElement,
}: InformationCardProps) {
  return (
    <BaseCard onPress={onPress} style={styles.infoCard}>
      <View style={styles.infoRow}>
        {icon ? <View style={styles.infoIcon}>{icon}</View> : null}
        <View style={styles.infoText}>
          <Text style={styles.infoTitle} numberOfLines={2}>{title}</Text>
          {description ? (
            <Text style={styles.infoDescription} numberOfLines={2}>{description}</Text>
          ) : null}
          {metadata ? (
            <Text style={styles.infoMetadata}>{metadata}</Text>
          ) : null}
        </View>
        {rightElement ? <View style={styles.infoRight}>{rightElement}</View> : null}
      </View>
    </BaseCard>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  onPress?: () => void;
}

export function StatCard({ label, value, icon, color = colors.primary, onPress }: StatCardProps) {
  return (
    <BaseCard onPress={onPress} style={styles.statCard}>
      {icon ? <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>{icon}</View> : null}
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </BaseCard>
  );
}

// ─── Navigation Category Card ─────────────────────────────────────────────────

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  onPress?: () => void;
  itemCount?: number;
}

export function CategoryCard({
  title,
  subtitle,
  icon,
  color,
  onPress,
  itemCount,
}: CategoryCardProps) {
  return (
    <BaseCard onPress={onPress} style={styles.categoryCard}>
      <View style={[styles.categoryIconBg, { backgroundColor: `${color}15` }]}>
        {icon}
      </View>
      <Text style={styles.categoryTitle} numberOfLines={1}>{title}</Text>
      {subtitle ? (
        <Text style={styles.categorySubtitle} numberOfLines={1}>{subtitle}</Text>
      ) : null}
      {itemCount !== undefined ? (
        <Text style={[styles.categoryCount, { color }]}>{itemCount} items</Text>
      ) : null}
    </BaseCard>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Base
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    ...shadows.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.itemGap,
  },

  // Announcement
  announcementCard: {
    position: 'relative',
    overflow: 'hidden',
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.cardPadding - 3,
  },
  unreadDot: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  priorityBadgeContainer: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radii.badge,
  },
  priorityText: {
    ...typography.captionSm,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timestamp: {
    ...typography.captionSm,
    color: colors.textTertiary,
  },
  announcementTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing[1],
  },
  announcementMessage: {
    ...typography.bodySm,
    color: colors.textSecondary,
    marginBottom: spacing[2],
  },
  categoryTag: {
    ...typography.captionSm,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Service
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3.5],
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
    flexShrink: 0,
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  serviceSubtitle: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Information
  infoCard: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: spacing[3],
    flexShrink: 0,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 3,
  },
  infoDescription: {
    ...typography.bodySm,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  infoMetadata: {
    ...typography.captionSm,
    color: colors.textTertiary,
  },
  infoRight: {
    marginLeft: spacing[3],
    flexShrink: 0,
  },

  // Stat
  statCard: {
    alignItems: 'flex-start',
    minWidth: 120,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  statValue: {
    ...typography.heading,
    marginBottom: spacing[0.5],
  },
  statLabel: {
    ...typography.captionSm,
    color: colors.textSecondary,
  },

  // Category
  categoryCard: {
    alignItems: 'center',
    paddingVertical: spacing[4],
    minHeight: 110,
  },
  categoryIconBg: {
    width: 56,
    height: 56,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  categoryTitle: {
    ...typography.labelSm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  categorySubtitle: {
    ...typography.captionSm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  categoryCount: {
    ...typography.captionSm,
    fontWeight: '600',
    marginTop: 4,
  },

  // Shared
  disabledCard: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textDisabled,
  },
  disabledSubtext: {
    color: colors.textDisabled,
  },
});
