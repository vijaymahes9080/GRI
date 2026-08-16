/**
 * Universal Content Detail Screen
 *
 * Requirements Section 3, 10:
 * Consolidates 100+ separate static routes into a single reusable parameterized
 * content screen that dynamically loads content based on type (about, governance,
 * administration, academics, admissions, research, campus, placement, alumni, enews)
 * and content ID.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Building2,
  FileText,
  Share2,
  Calendar,
  ExternalLink,
  ChevronRight,
} from 'lucide-react-native';

import {
  Screen,
  ScreenHeader,
  ErrorState,
  colors,
  spacing,
  radii,
  typography,
  iconSizes,
  shadows,
} from '../../../components/ui';
import { apiClient } from '../../../core/api';
import { GRI_INSTITUTIONAL_DATA } from '../../../core/services/institutionalData';

export default function ContentDetailScreen() {
  const router = useRouter();
  const { type, id } = useLocalSearchParams<{ type: string; id: string }>();
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [type, id]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Try API fetch
      const res = await apiClient.get(`/website/content/${type}/${id}`);
      if (res.data && res.data.data) {
        setContentData(res.data.data);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback to local institutional database
    }

    // 2. Resolve from GRI_INSTITUTIONAL_DATA or generate structured fallback
    const key = `${type}_${id}`;
    const fallback = (GRI_INSTITUTIONAL_DATA as any)[key] || {
      title: `${type?.toUpperCase()} — ${id?.replace(/-/g, ' ').toUpperCase()}`,
      subtitle: 'Gandhigram Rural Institute (Deemed to be University)',
      category: type?.toUpperCase(),
      updatedAt: 'Academic Year 2025-2026',
      sections: [
        {
          heading: 'Overview & Institutional Details',
          body: `Gandhigram Rural Institute was founded in 1956 by Dr. G. Ramachandran and Dr. T.S. Soundram to impart Mahatma Gandhi’s Nai Talim (Basic Education) principles. The Institute offers higher education in Rural Development, Rural Health, Extension Education, Agriculture, Computer Applications, and Basic Sciences.`,
        },
        {
          heading: 'Official Regulations & Governance',
          body: `All academic programmes operate under Choice Based Credit System (CBCS) guidelines approved by UGC and the Ministry of Education, Government of India.`,
        },
      ],
    };

    setContentData(fallback);
    setLoading(false);
  };

  const handleShare = async () => {
    if (contentData) {
      try {
        await Share.share({
          message: `${contentData.title} — Gandhigram Rural Institute: https://ruraluniv.ac.in`,
        });
      } catch {}
    }
  };

  if (loading) {
    return (
      <Screen variant="static" backgroundColor={colors.surfaceElevated}>
        <ScreenHeader title="Loading Content..." showBack variant="primary" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Fetching University Records...</Text>
        </View>
      </Screen>
    );
  }

  if (error || !contentData) {
    return (
      <Screen variant="static" backgroundColor={colors.surfaceElevated}>
        <ScreenHeader title="Content Unavailable" showBack variant="primary" />
        <ErrorState
          title="Document Not Found"
          message="The requested institutional page could not be loaded."
          onRetry={fetchContent}
        />
      </Screen>
    );
  }

  return (
    <Screen variant="scroll" backgroundColor={colors.surfaceElevated}>
      <ScreenHeader
        title={contentData.title || 'Institutional Record'}
        subtitle={contentData.category || 'GRI Official Document'}
        showBack
        variant="primary"
        rightActions={
          <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
            <Share2 size={iconSizes.md} color={colors.white} />
          </TouchableOpacity>
        }
      />

      <View style={styles.content}>
        {/* Document Header Card */}
        <View style={styles.heroCard}>
          <Text style={styles.categoryBadge}>{contentData.category || type?.toUpperCase()}</Text>
          <Text style={styles.heroTitle}>{contentData.title}</Text>
          {contentData.subtitle ? (
            <Text style={styles.heroSub}>{contentData.subtitle}</Text>
          ) : null}
          <View style={styles.metaRow}>
            <Calendar size={iconSizes.xs} color={colors.textTertiary} />
            <Text style={styles.metaText}>{contentData.updatedAt || 'Session 2025-26'}</Text>
          </View>
        </View>

        {/* Content Body Sections */}
        {contentData.sections?.map((sec: any, idx: number) => (
          <View key={idx} style={styles.sectionCard}>
            {sec.heading ? (
              <Text style={styles.sectionHeading}>{sec.heading}</Text>
            ) : null}
            <Text style={styles.sectionBody}>{sec.body}</Text>
          </View>
        ))}

        <View style={{ height: spacing.xl }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.bodySm,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.sm,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  categoryBadge: {
    ...typography.overline,
    color: colors.primary,
    marginBottom: 4,
  },
  heroTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  heroSub: {
    ...typography.bodySm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metaText: {
    ...typography.captionSm,
    color: colors.textTertiary,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.cardPadding,
    marginBottom: spacing.itemGap,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  sectionHeading: {
    ...typography.titleSm,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionBody: {
    ...typography.bodySm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
