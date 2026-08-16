/**
 * GRI Centralized Navigation Resolver
 *
 * Requirements Section 8, 9, 30:
 * Centralizes all navigation execution, deep-link handling, and safe route resolving.
 * Eliminates hard-coded navigation strings scattered across UI screens.
 */

import { Router } from 'expo-router';
import { DISCOVER_TREE, SERVICE_ITEMS, TOP_LEVEL_TABS } from './navigation.config';
import { NavigationItem } from './navigation.types';
import { isRouteAllowed } from './navigation.permissions';

class NavigationResolver {
  private allNodes: Map<string, NavigationItem> = new Map();

  constructor() {
    this.indexNodes(TOP_LEVEL_TABS);
    this.indexNodes(DISCOVER_TREE);
    this.indexNodes(SERVICE_ITEMS);
  }

  private indexNodes(items: NavigationItem[]) {
    for (const item of items) {
      this.allNodes.set(item.id, item);
      if (item.children && item.children.length > 0) {
        this.indexNodes(item.children);
      }
    }
  }

  public getNodeById(id: string): NavigationItem | undefined {
    return this.allNodes.get(id);
  }

  /**
   * Safely navigates to a destination given a node ID or direct route string.
   */
  public navigate(
    router: Router,
    destination: string,
    userRole?: string | null,
    params?: Record<string, any>
  ): boolean {
    // 1. Check if destination is a registered node ID
    const node = this.allNodes.get(destination);

    if (node) {
      // Permission check
      if (!isRouteAllowed(node, userRole)) {
        console.warn(`[NavigationResolver] Permission denied for node '${destination}' with role '${userRole}'`);
        router.push('/(tabs)/profile' as any);
        return false;
      }

      if (node.destinationType === 'WEB_EXTERNAL' && node.externalUrl) {
        // Open web link
        return true;
      }

      router.push({
        pathname: node.route as any,
        params,
      });
      return true;
    }

    // 2. Direct route string fallback
    try {
      router.push({
        pathname: destination as any,
        params,
      });
      return true;
    } catch (err) {
      console.error(`[NavigationResolver] Failed to resolve destination '${destination}'`, err);
      router.push('/(tabs)/home' as any);
      return false;
    }
  }

  /**
   * Safe Deep Link Resolution (Section 30)
   */
  public resolveDeepLink(router: Router, deepLinkUrl: string, userRole?: string | null): boolean {
    if (!deepLinkUrl) return false;

    // Parse path
    const cleanPath = deepLinkUrl.replace(/^gri:\/\//, '').replace(/^\//, '');
    const parts = cleanPath.split('/');
    const contentType = parts[0];
    const contentId = parts[1] || 'overview';

    if (contentType) {
      return this.navigate(router, `/content/${contentType}/${contentId}`, userRole);
    }

    return false;
  }
}

export const navigationResolver = new NavigationResolver();
