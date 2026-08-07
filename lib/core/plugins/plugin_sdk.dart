import 'package:flutter/material.dart';

/// GRI Plugin SDK Core Abstract Interface
/// Allows third-party developers & partner universities to register custom modules
abstract class GriPlugin {
  /// Unique identifier of the plugin (e.g. 'ai_proctoring', 'blockchain_certs')
  String get pluginId;

  /// Display title of the module
  String get name;

  /// Semantic version
  String get version;

  /// Icon for the navigation drawer / marketplace
  IconData get icon;

  /// Initialize plugin dependencies & secure storage
  Future<void> initialize();

  /// Build dynamic entry widget for the Flutter app
  Widget buildModuleWidget(BuildContext context);
}

/// Dynamic Plugin Registry & Lifecycle Manager
class PluginManager {
  static final PluginManager _instance = PluginManager._internal();
  factory PluginManager() => _instance;
  PluginManager._internal();

  final Map<String, GriPlugin> _registeredPlugins = {};

  void registerPlugin(GriPlugin plugin) {
    _registeredPlugins[plugin.pluginId] = plugin;
  }

  List<GriPlugin> get activePlugins => _registeredPlugins.values.toList();

  Future<void> initializeAll() async {
    for (final plugin in _registeredPlugins.values) {
      await plugin.initialize();
    }
  }
}
