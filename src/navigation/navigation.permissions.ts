/**
 * GRI Navigation Permissions Engine
 *
 * Requirements Section 9, 24:
 * Evaluates navigation node accessibility based on user role and feature flags.
 * Used by UI components to show/hide navigation nodes cleanly.
 */

import { NavigationItem } from './navigation.types';

export function isRouteAllowed(
  item: NavigationItem,
  userRole?: string | null,
  featureFlags?: Record<string, boolean>
): boolean {
  // 1. Check enabled flag
  if (item.enabled === false) {
    return false;
  }

  // 2. Check feature flag if specified
  if (item.featureFlagKey && featureFlags) {
    const isEnabled = featureFlags[item.featureFlagKey];
    if (isEnabled === false) {
      return false;
    }
  }

  // 3. Check allowed roles
  if (item.allowedRoles && item.allowedRoles.length > 0) {
    if (!userRole) {
      return false;
    }
    const normalizedUserRole = userRole.toLowerCase();
    const isRoleAllowed = item.allowedRoles.some(
      (role) => role.toLowerCase() === normalizedUserRole || role.toLowerCase() === 'admin'
    );
    if (!isRoleAllowed) {
      return false;
    }
  }

  return true;
}

export function filterNavigationTree(
  items: NavigationItem[],
  userRole?: string | null,
  featureFlags?: Record<string, boolean>
): NavigationItem[] {
  return items
    .filter((item) => isRouteAllowed(item, userRole, featureFlags))
    .map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: filterNavigationTree(item.children, userRole, featureFlags),
        };
      }
      return item;
    });
}
