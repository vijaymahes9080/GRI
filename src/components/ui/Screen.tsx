/**
 * Screen — Universal Screen Container
 *
 * Every screen in the app MUST use this component as its root.
 * It handles:
 *   - SafeAreaView with correct edge insets for all devices
 *   - Status bar color/style management
 *   - Android navigation bar handling (bottom inset)
 *   - Keyboard avoiding behavior
 *   - Background color token
 *   - Scroll variant vs static variant
 *
 * ALIGNMENT FIX (ALIGN-011): Previously NO tab screen used SafeAreaView.
 * This component is the universal fix for that root cause.
 */

import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './tokens';

export type ScreenVariant = 'default' | 'scroll' | 'static' | 'fullbleed';

interface ScreenProps {
  children: React.ReactNode;
  /**
   * 'scroll'     — Content is wrapped in a ScrollView (most tab screens)
   * 'static'     — Content fills remaining space without scroll
   * 'fullbleed'  — No safe area padding, for image-heavy or map screens
   * 'default'    — Same as scroll (backwards compat)
   */
  variant?: ScreenVariant;
  /** Background color override; defaults to colors.surfaceElevated */
  backgroundColor?: string;
  /** Extra style applied to the inner content container */
  contentStyle?: ViewStyle;
  /** Whether to avoid keyboard (default: true on scroll variant) */
  avoidKeyboard?: boolean;
  /** ScrollView ref forwarding */
  scrollRef?: React.RefObject<ScrollView>;
  /** Called on scroll (only applies to scroll variant) */
  onScroll?: (event: any) => void;
  /** Header background color — also sets StatusBar barStyle */
  statusBarStyle?: 'light-content' | 'dark-content';
  /** Horizontal padding for content (default: 0 — individual screens manage) */
  horizontalPadding?: number;
  testID?: string;
}

export function Screen({
  children,
  variant = 'scroll',
  backgroundColor = colors.surfaceElevated,
  contentStyle,
  avoidKeyboard,
  scrollRef,
  onScroll,
  statusBarStyle = 'dark-content',
  horizontalPadding = 0,
  testID,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const shouldAvoidKeyboard = avoidKeyboard ?? (variant === 'scroll' || variant === 'default');

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
  };

  const contentContainerStyle: ViewStyle = {
    flexGrow: 1,
    paddingHorizontal: horizontalPadding,
    // Bottom padding accounts for tab bar + system gesture bar
    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
  };

  const staticContentStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: horizontalPadding,
  };

  if (variant === 'fullbleed') {
    return (
      <View style={[containerStyle, { backgroundColor }]} testID={testID}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor="transparent"
          translucent
        />
        {children}
      </View>
    );
  }

  const content =
    variant === 'scroll' || variant === 'default' ? (
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={[contentContainerStyle, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    ) : (
      <View style={[staticContentStyle, contentStyle]}>{children}</View>
    );

  const wrapped = shouldAvoidKeyboard ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView
      style={[containerStyle]}
      edges={['top', 'left', 'right']}
      testID={testID}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor="transparent"
        translucent
      />
      {wrapped}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
