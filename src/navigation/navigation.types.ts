/**
 * GRI Centralized Navigation System — Types
 *
 * Requirements Section 9 & 33: Every navigation destination must have a single definition
 * with permissions, feature flags, parent hierarchy, and deep-link identifiers.
 */

export type NavigationCategory =
  | 'ACADEMICS'
  | 'ADMISSIONS'
  | 'EXAMINATIONS'
  | 'RESEARCH'
  | 'CAMPUS'
  | 'SERVICES'
  | 'GOVERNANCE'
  | 'ADMINISTRATION'
  | 'ABOUT'
  | 'ALUMNI'
  | 'ENEWS'
  | 'STUDENT'
  | 'FACULTY'
  | 'SYSTEM';

export type DestinationType =
  | 'TAB'
  | 'CONTENT'
  | 'SERVICE'
  | 'WEB_EXTERNAL'
  | 'ADMIN'
  | 'AUTH'
  | 'ACTION';

export interface NavigationItem {
  /** Unique navigation node identifier (e.g., 'about_history') */
  id: string;
  /** Human-readable title */
  title: string;
  /** Short description / subtitle for cards and list items */
  subtitle?: string;
  /** Lucide icon string key or React icon component name */
  icon: string;
  /** Destination classification */
  destinationType: DestinationType;
  /** Expo router path or parameter key */
  route: string;
  /** Category grouping */
  category: NavigationCategory;
  /** Parent node ID for breadcrumbs and hierarchical discovery */
  parentId?: string | null;
  /** Order index for rendering */
  order: number;
  /** Feature flag key required to display/access this item */
  featureFlagKey?: string;
  /** Backend RBAC roles allowed to access (empty/null = public) */
  allowedRoles?: string[];
  /** Deep link path alias (e.g., 'gri://about/history') */
  deepLinkPath?: string;
  /** External web URL if destinationType is WEB_EXTERNAL */
  externalUrl?: string;
  /** Child nodes for nested directory navigation */
  children?: NavigationItem[];
  /** Enabled status */
  enabled?: boolean;
}

export interface NavigationState {
  currentRoute: string;
  previousRoute?: string;
  deepLinkParams?: Record<string, string>;
}
