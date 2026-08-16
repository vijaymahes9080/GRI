/**
 * ScreenHeader — Consistent App Header
 *
 * ALIGNMENT FIX (ALIGN-001, ALIGN-003):
 * - Replaces the old Header.tsx which didn't account for SafeAreaInsets
 * - Consistent height across all screens
 * - Never overlaps Android status bar
 * - Consistent typography, icon sizes, and action placement
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Menu } from 'lucide-react-native';
import { colors, spacing, typography, iconSizes, shadows } from './tokens';

export type HeaderVariant = 'primary' | 'secondary' | 'white' | 'transparent' | 'dark';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Show back button instead of menu */
  showBack?: boolean;
  /** Show hamburger/menu button */
  showMenu?: boolean;
  /** Called when menu icon pressed; defaults to router.back() for showBack */
  onMenuPress?: () => void;
  /** Element(s) rendered on the right side */
  rightActions?: React.ReactNode;
  /** Visual style of the header */
  variant?: HeaderVariant;
  /** Override background color (ignores variant) */
  backgroundColor?: string;
  /** Additional styles for the header container */
  style?: ViewStyle;
  testID?: string;
}

const VARIANT_COLORS: Record<HeaderVariant, { bg: string; text: string; subtext: string; icon: string; iconBg: string }> = {
  primary: {
    bg: colors.primary,
    text: colors.white,
    subtext: 'rgba(255,255,255,0.80)',
    icon: colors.white,
    iconBg: 'rgba(255,255,255,0.15)',
  },
  secondary: {
    bg: colors.secondary,
    text: colors.white,
    subtext: 'rgba(255,255,255,0.75)',
    icon: colors.white,
    iconBg: 'rgba(255,255,255,0.15)',
  },
  white: {
    bg: colors.white,
    text: colors.textPrimary,
    subtext: colors.textSecondary,
    icon: colors.textSecondary,
    iconBg: colors.surfaceSubtle,
  },
  transparent: {
    bg: 'transparent',
    text: colors.textPrimary,
    subtext: colors.textSecondary,
    icon: colors.textSecondary,
    iconBg: colors.surfaceSubtle,
  },
  dark: {
    bg: colors.darkSurface,
    text: colors.darkText,
    subtext: colors.darkTextMuted,
    icon: colors.darkTextMuted,
    iconBg: colors.darkCard,
  },
};

export function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  showMenu = true,
  onMenuPress,
  rightActions,
  variant = 'primary',
  backgroundColor,
  style,
  testID,
}: ScreenHeaderProps) {
  const router = useRouter();
  const theme = VARIANT_COLORS[variant];
  const bgColor = backgroundColor ?? theme.bg;

  const handleLeftPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else if (showBack) {
      router.back();
    }
  };

  const showLeftButton = showBack || showMenu;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor },
        variant !== 'transparent' && shadows.sm,
        style,
      ]}
      testID={testID}
    >
      {/* Left: Back or Menu */}
      <View style={styles.side}>
        {showLeftButton && (
          <TouchableOpacity
            onPress={handleLeftPress}
            style={[styles.iconButton, { backgroundColor: theme.iconBg }]}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
            accessibilityRole="button"
          >
            {showBack ? (
              <ArrowLeft size={iconSizes.md} color={theme.icon} />
            ) : (
              <Menu size={iconSizes.md} color={theme.icon} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Center: Title */}
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={1}
          accessibilityRole="header"
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: theme.subtext }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Right: Actions */}
      <View style={styles.side}>
        {rightActions ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing[3],
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  title: {
    ...typography.titleSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.captionSm,
    textAlign: 'center',
    marginTop: 1,
  },
});
