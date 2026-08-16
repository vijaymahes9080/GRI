/**
 * State Components — Loading, Empty, Error
 *
 * ALIGNMENT FIX (ALIGN-013, DUP-003):
 * Every asynchronous screen must support these states.
 * Previously: ActivityIndicator used inline inconsistently,
 * no empty state UI, no offline state.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { WifiOff, AlertTriangle, SearchX, RefreshCw, Inbox } from 'lucide-react-native';
import { colors, spacing, typography, radii, iconSizes } from './tokens';

// ─── Loading State ─────────────────────────────────────────────────────────

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export function LoadingState({
  message = 'Loading...',
  size = 'large',
  color = colors.primary,
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={color} />
      {message ? (
        <Text style={styles.loadingMessage}>{message}</Text>
      ) : null}
    </View>
  );
}

// ─── Skeleton Loader ───────────────────────────────────────────────────────

export function SkeletonLine({ width = '100%', height = 14, style }: {
  width?: string | number;
  height?: number;
  style?: object;
}) {
  return (
    <View
      style={[
        styles.skeleton,
        { width: width as any, height, borderRadius: radii.sm },
        style,
      ]}
    />
  );
}

export function SkeletonCard() {
  return (
    <View style={styles.skeletonCard}>
      <SkeletonLine width="70%" height={14} style={{ marginBottom: spacing[2] }} />
      <SkeletonLine width="100%" height={12} style={{ marginBottom: spacing[1] }} />
      <SkeletonLine width="85%" height={12} />
    </View>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({
  title = 'Nothing here',
  message = 'No items to display at the moment.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <View style={styles.stateContainer}>
      <View style={styles.stateIconContainer}>
        {icon ?? <Inbox size={iconSizes['2xl']} color={colors.textTertiary} />}
      </View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateMessage}>{message}</Text>
      {action ? (
        <TouchableOpacity
          onPress={action.onPress}
          style={styles.stateButton}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text style={styles.stateButtonText}>{action.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─── Error State ───────────────────────────────────────────────────────────

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  onRetry,
  retryLabel = 'Try Again',
}: ErrorStateProps) {
  return (
    <View style={styles.stateContainer}>
      <View style={[styles.stateIconContainer, { backgroundColor: colors.errorLight }]}>
        <AlertTriangle size={iconSizes['2xl']} color={colors.error} />
      </View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateMessage}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.stateButton, styles.retryButton]}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
        >
          <RefreshCw size={iconSizes.sm} color={colors.white} style={{ marginRight: spacing[2] }} />
          <Text style={[styles.stateButtonText, { color: colors.white }]}>{retryLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─── Offline State ─────────────────────────────────────────────────────────

interface OfflineStateProps {
  onRetry?: () => void;
}

export function OfflineState({ onRetry }: OfflineStateProps) {
  return (
    <View style={styles.stateContainer}>
      <View style={[styles.stateIconContainer, { backgroundColor: colors.warningLight }]}>
        <WifiOff size={iconSizes['2xl']} color={colors.warning} />
      </View>
      <Text style={styles.stateTitle}>No Internet Connection</Text>
      <Text style={styles.stateMessage}>
        Check your network and try again.{'\n'}
        Some content may still be available offline.
      </Text>
      {onRetry ? (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.stateButton, { backgroundColor: colors.warning }]}
          accessibilityRole="button"
          accessibilityLabel="Retry connection"
        >
          <RefreshCw size={iconSizes.sm} color={colors.white} style={{ marginRight: spacing[2] }} />
          <Text style={[styles.stateButtonText, { color: colors.white }]}>Retry</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─── No Results State ──────────────────────────────────────────────────────

interface NoResultsStateProps {
  query?: string;
  onClear?: () => void;
}

export function NoResultsState({ query, onClear }: NoResultsStateProps) {
  return (
    <View style={styles.stateContainer}>
      <View style={styles.stateIconContainer}>
        <SearchX size={iconSizes['2xl']} color={colors.textTertiary} />
      </View>
      <Text style={styles.stateTitle}>No results found</Text>
      {query ? (
        <Text style={styles.stateMessage}>
          No matches for "{query}".{'\n'}Try different keywords.
        </Text>
      ) : (
        <Text style={styles.stateMessage}>Try adjusting your search or filters.</Text>
      )}
      {onClear ? (
        <TouchableOpacity
          onPress={onClear}
          style={styles.stateButton}
          accessibilityRole="button"
        >
          <Text style={styles.stateButtonText}>Clear Search</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  fullScreen: {
    flex: 1,
  },
  loadingMessage: {
    ...typography.bodySm,
    color: colors.textSecondary,
    marginTop: spacing[3],
    textAlign: 'center',
  },
  // Skeleton
  skeleton: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  skeletonCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.itemGap,
  },
  // State
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  stateIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  stateTitle: {
    ...typography.titleSm,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  stateMessage: {
    ...typography.bodySm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  stateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySurface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing[3],
    borderRadius: radii.button,
  },
  retryButton: {
    backgroundColor: colors.error,
  },
  stateButtonText: {
    ...typography.button,
    color: colors.primary,
  },
});
