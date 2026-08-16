/**
 * GRI Mobile Application — Discover Screen (Institutional Directory)
 *
 * Requirements Section 4:
 * The complete institutional directory following official GRI information architecture:
 * Discover = "I want information."
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Building,
  Landmark,
  UserCheck,
  BookOpen,
  UserPlus,
  Microscope,
  MapPin,
  Briefcase,
  UserCheck as AlumniIcon,
  Newspaper,
  ChevronRight,
  ChevronDown,
  Building2,
  FileText,
  Search,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  SearchBar,
  ListItem,
  SectionHeader,
  colors,
  spacing,
  radii,
  typography,
  iconSizes,
  shadows,
} from '../../components/ui';
import { DISCOVER_TREE, NavigationItem, navigationResolver } from '../../navigation';
import { useAuthStore } from '../../core/auth/authStore';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  disc_about: <Building size={iconSizes.lg} color={colors.primary} />,
  disc_governance: <Landmark size={iconSizes.lg} color={colors.secondary} />,
  disc_admin: <UserCheck size={iconSizes.lg} color={colors.info} />,
  disc_academics: <BookOpen size={iconSizes.lg} color={colors.academicColor} />,
  disc_admissions: <UserPlus size={iconSizes.lg} color={colors.admissionColor} />,
  disc_research: <Microscope size={iconSizes.lg} color={colors.examColor} />,
  disc_campus: <MapPin size={iconSizes.lg} color={colors.warning} />,
  disc_placement: <Briefcase size={iconSizes.lg} color={colors.accent} />,
  disc_alumni: <AlumniIcon size={iconSizes.lg} color={colors.primaryDark} />,
  disc_enews: <Newspaper size={iconSizes.lg} color={colors.careerColor} />,
};

export default function DiscoverScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>('disc_about');

  const toggleExpand = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const handleNavigate = (item: NavigationItem) => {
    navigationResolver.navigate(router, item.route, user?.role);
  };

  const filteredTree = DISCOVER_TREE.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesParent =
      item.title.toLowerCase().includes(q) || item.subtitle?.toLowerCase().includes(q);
    const matchesChild = item.children?.some(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle?.toLowerCase().includes(q)
    );
    return matchesParent || matchesChild;
  });

  const renderCategoryItem = ({ item }: { item: NavigationItem }) => {
    const isExpanded = expandedCategoryId === item.id || searchQuery.length > 0;
    const icon = CATEGORY_ICONS[item.id] || <Building2 size={iconSizes.lg} color={colors.primary} />;

    return (
      <View style={styles.categoryCardContainer}>
        {/* Parent Category Header */}
        <TouchableOpacity
          onPress={() => (item.children?.length ? toggleExpand(item.id) : handleNavigate(item))}
          style={styles.categoryHeader}
          activeOpacity={0.7}
        >
          <View style={styles.iconBg}>{icon}</View>
          <View style={styles.categoryTitleContainer}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            {item.subtitle ? (
              <Text style={styles.categorySubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            ) : null}
          </View>
          {item.children?.length ? (
            isExpanded ? (
              <ChevronDown size={iconSizes.md} color={colors.textSecondary} />
            ) : (
              <ChevronRight size={iconSizes.md} color={colors.textTertiary} />
            )
          ) : (
            <ChevronRight size={iconSizes.md} color={colors.primary} />
          )}
        </TouchableOpacity>

        {/* Children Sub-Items */}
        {isExpanded && item.children?.length ? (
          <View style={styles.childrenContainer}>
            {item.children.map((child, idx) => (
              <ListItem
                key={child.id}
                title={child.title}
                subtitle={child.subtitle}
                leftIcon={<FileText size={iconSizes.sm} color={colors.primary} />}
                onPress={() => handleNavigate(child)}
                showSeparator={idx < item.children!.length - 1}
              />
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <Screen variant="static" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader
        title="Institutional Directory"
        subtitle="Discover GRI Schools, Governance & Facilities"
        variant="primary"
      />

      <View style={styles.container}>
        {/* Search Header */}
        <View style={styles.searchPadding}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search directory (e.g. Computer Science, BoM)..."
            onSubmit={() => {
              if (searchQuery.trim()) {
                router.push({ pathname: '/search', params: { q: searchQuery.trim() } });
              }
            }}
          />
        </View>

        {/* Directory List */}
        <FlatList
          data={filteredTree}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <SectionHeader
              title="Official University Hierarchy"
              action={{
                label: 'Search All',
                onPress: () => router.push('/search'),
              }}
            />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchPadding: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: spacing.xl,
  },
  categoryCardContainer: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.itemGap,
    overflow: 'hidden',
    ...shadows.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.cardPadding,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  categorySubtitle: {
    ...typography.captionSm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  childrenContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surfaceSubtle,
  },
});
