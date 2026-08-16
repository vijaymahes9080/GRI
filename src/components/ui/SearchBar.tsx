/**
 * SearchBar — Global Search Input Component
 *
 * DUP-001 FIX: Previously three separate unconnected search implementations.
 * This single component is used everywhere search is needed.
 */

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors, spacing, radii, typography, iconSizes } from './tokens';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  onFocus?: () => void;
  autoFocus?: boolean;
  style?: ViewStyle;
  testID?: string;
  /** 'default' — outlined card style; 'flat' — minimal underline style */
  variant?: 'default' | 'flat';
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search GRI...',
  onSubmit,
  onClear,
  onFocus,
  autoFocus = false,
  style,
  testID,
  variant = 'default',
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    onChangeText('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <View
      style={[
        styles.container,
        variant === 'flat' && styles.containerFlat,
        style,
      ]}
      testID={testID}
    >
      <Search size={iconSizes.md} color={colors.textTertiary} style={styles.searchIcon} />
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        accessibilityLabel="Search input"
        accessibilityRole="search"
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <View style={styles.clearButton}>
            <X size={iconSizes.xs} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing[3],
    height: 44,
  },
  containerFlat: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: 'transparent',
  },
  searchIcon: {
    marginRight: spacing[2],
    flexShrink: 0,
  },
  input: {
    flex: 1,
    ...typography.bodySm,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing[2],
  },
});
