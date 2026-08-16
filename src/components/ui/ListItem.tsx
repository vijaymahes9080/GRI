/**
 * ListItem — Consistent Row Component for Directory Lists
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, spacing, radii, typography, iconSizes } from './tokens';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  /** Highlight the item (e.g. currently selected) */
  isActive?: boolean;
  /** Show a separator below this item */
  showSeparator?: boolean;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightElement,
  showChevron = true,
  onPress,
  style,
  testID,
  accessibilityLabel,
  isActive = false,
  showSeparator = false,
}: ListItemProps) {
  const content = (
    <View style={StyleSheet.flatten([styles.container, isActive && styles.activeContainer, style])} testID={testID}>
      {leftIcon ? (
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
          {leftIcon}
        </View>
      ) : null}

      <View style={styles.textContainer}>
        <Text
          style={[styles.title, isActive && styles.activeTitle]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightElement ? (
        <View style={styles.rightContainer}>{rightElement}</View>
      ) : showChevron && onPress ? (
        <ChevronRight size={iconSizes.sm} color={isActive ? colors.primary : colors.textTertiary} />
      ) : null}
    </View>
  );

  return (
    <>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          accessibilityLabel={accessibilityLabel ?? title}
          accessibilityRole="button"
        >
          {content}
        </TouchableOpacity>
      ) : (
        content
      )}
      {showSeparator && <View style={styles.separator} />}
    </>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  action?: { label: string; onPress: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title.toUpperCase()}</Text>
      {action ? (
        <TouchableOpacity onPress={action.onPress} accessibilityRole="button">
          <Text style={sectionStyles.actionText}>{action.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing[3],
    minHeight: 52,
    backgroundColor: colors.white,
  },
  activeContainer: {
    backgroundColor: colors.primarySurface,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
    flexShrink: 0,
  },
  activeIconContainer: {
    backgroundColor: colors.primaryBorder,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.label,
    color: colors.textPrimary,
  },
  activeTitle: {
    color: colors.primaryDark,
  },
  subtitle: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: spacing[2],
    flexShrink: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
});

const sectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  title: {
    ...typography.overline,
    color: colors.textTertiary,
  },
  actionText: {
    ...typography.labelSm,
    color: colors.primary,
  },
});
