/**
 * Badge — Status/Category Indicator
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, typography } from './tokens';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const BADGE_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: colors.primarySurface, text: colors.primaryDark },
  secondary: { bg: colors.secondarySurface, text: colors.secondaryDark },
  accent: { bg: colors.accentSurface, text: colors.accentDark },
  success: { bg: colors.successLight, text: colors.success },
  warning: { bg: colors.warningLight, text: colors.warning },
  error: { bg: colors.errorLight, text: colors.error },
  neutral: { bg: colors.surfaceSubtle, text: colors.textSecondary },
};

export function Badge({ label, variant = 'neutral', size = 'md', dot = false }: BadgeProps) {
  const theme = BADGE_COLORS[variant];
  const isSmall = size === 'sm';

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.bg },
      isSmall && styles.containerSm,
    ]}>
      {dot && (
        <View style={[styles.dot, { backgroundColor: theme.text }]} />
      )}
      <Text style={[
        styles.label,
        { color: theme.text },
        isSmall && styles.labelSm,
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.badge,
    alignSelf: 'flex-start',
  },
  containerSm: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  label: {
    ...typography.captionSm,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  labelSm: {
    fontSize: 9,
    letterSpacing: 0.3,
  },
});
