/**
 * GRI Centralized Global Search Screen
 *
 * Requirements Section 8:
 * Search across university info, departments, programmes, faculty, notices,
 * examinations, admissions, research, facilities, services, and documents.
 * Categorized results: All, People, Departments, Academics, Notices, Services, Documents.
 * Uses navigationResolver for safe routing.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Search,
  BookOpen,
  User,
  Building2,
  FileText,
  Layers,
  ChevronRight,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  SearchBar,
  ListItem,
  NoResultsState,
  colors,
  spacing,
  radii,
  typography,
  iconSizes,
  shadows,
} from '../../components/ui';
import { navigationResolver, DISCOVER_TREE, SERVICE_ITEMS } from '../../navigation';
import { useAuthStore } from '../../core/auth/authStore';

type SearchCategory = 'ALL' | 'DEPARTMENTS' | 'ACADEMICS' | 'NOTICES' | 'SERVICES';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  route: string;
  icon: any;
}

export default function GlobalSearchScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { q } = useLocalSearchParams<{ q: string }>();

  const [query, setQuery] = useState(q || '');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('ALL');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    performSearch();
  }, [query, selectedCategory]);

  const performSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTerm = query.toLowerCase();
    const searchResults: SearchResultItem[] = [];

    // Search DISCOVER_TREE
    for (const cat of DISCOVER_TREE) {
      if (cat.title.toLowerCase().includes(searchTerm) || cat.subtitle?.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: cat.id,
          title: cat.title,
          subtitle: cat.subtitle || 'Institutional Category',
          category: 'DEPARTMENTS',
          route: cat.route,
          icon: Building2,
        });
      }
      if (cat.children) {
        for (const child of cat.children) {
          if (child.title.toLowerCase().includes(searchTerm) || child.subtitle?.toLowerCase().includes(searchTerm)) {
            searchResults.push({
              id: child.id,
              title: child.title,
              subtitle: `${cat.title} · ${child.subtitle || 'Sub-section'}`,
              category: 'ACADEMICS',
              route: child.route,
              icon: BookOpen,
            });
          }
        }
      }
    }

    // Search SERVICES
    for (const svc of SERVICE_ITEMS) {
      if (svc.title.toLowerCase().includes(searchTerm) || svc.subtitle?.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: svc.id,
          title: svc.title,
          subtitle: svc.subtitle || 'University Portal Action',
          category: 'SERVICES',
          route: svc.route,
          icon: Layers,
        });
      }
    }

    // Filter by active category tab
    const filtered =
      selectedCategory === 'ALL'
        ? searchResults
        : searchResults.filter((r) => r.category === selectedCategory);

    setResults(filtered);
    setLoading(false);
  };

  const handleSelectResult = (item: SearchResultItem) => {
    navigationResolver.navigate(router, item.route, user?.role);
  };

  const categories: { key: SearchCategory; label: string }[] = [
    { key: 'ALL', label: 'All Results' },
    { key: 'DEPARTMENTS', label: 'Departments' },
    { key: 'ACADEMICS', label: 'Academics' },
    { key: 'SERVICES', label: 'Services' },
  ];

  return (
    <Screen variant="static" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader title="Global Search" showBack variant="primary" />

      <View style={styles.container}>
        {/* Search Input */}
        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search departments, programmes, services..."
            autoFocus
          />
        </View>

        {/* Category Tabs */}
        <View style={styles.tabsRow}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                style={[styles.tabChip, isSelected && styles.activeTabChip]}
              >
                <Text style={[styles.tabLabel, isSelected && styles.activeTabLabel]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Results List */}
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const IconComponent = item.icon;
              return (
                <ListItem
                  title={item.title}
                  subtitle={item.subtitle}
                  leftIcon={<IconComponent size={iconSizes.md} color={colors.primary} />}
                  onPress={() => handleSelectResult(item)}
                  showSeparator
                />
              );
            }}
          />
        ) : (
          <NoResultsState query={query} onClear={() => setQuery('')} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPaddingH,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  tabChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing[1.5],
    borderRadius: radii.chip,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTabChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabLabel: {
    ...typography.captionSm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeTabLabel: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingVertical: spacing.sm,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
