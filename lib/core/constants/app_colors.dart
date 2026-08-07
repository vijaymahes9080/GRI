import 'package:flutter/material.dart';

/// GRI (Gandhigram Rural Institute) Color Palette
/// Derived from official institutional branding & Mahatma Gandhi's Khadi/Rural aesthetic
abstract class AppColors {
  // ── Brand Colors (Original Official Copy) ─────────────────────────────────
  static const Color primaryMaroon = Color(0xFF911C03);   // Official Header Maroon
  static const Color primaryMaroonDark = Color(0xFF6B1402);
  static const Color secondaryGreen = Color(0xFF518214);  // Official Khadi Green
  static const Color secondaryGreenDark = Color(0xFF385B0D);
  static const Color accentAmber = Color(0xFFF26B0F);     // Terracotta Amber
  static const Color accentGold = Color(0xFFD4AF37);      // Jubilee Gold

  // ── Light Theme Tokens ────────────────────────────────────────────────────
  static const Color lightBackground = Color(0xFFF8F9FA);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightSurfaceVariant = Color(0xFFF1F3F5);
  static const Color lightOnBackground = Color(0xFF1C1B1F);
  static const Color lightOnSurface = Color(0xFF191C1E);
  static const Color lightOutline = Color(0xFFDDE1E5);

  // ── Dark Theme Tokens (OLED Friendly) ─────────────────────────────────────
  static const Color darkBackground = Color(0xFF121212);
  static const Color darkSurface = Color(0xFF1E1E1E);
  static const Color darkSurfaceVariant = Color(0xFF2C2C2C);
  static const Color darkOnBackground = Color(0xFFE6E1E5);
  static const Color darkOnSurface = Color(0xFFE2E2E6);
  static const Color darkOutline = Color(0xFF44474A);

  // ── Semantic Status Colors ────────────────────────────────────────────────
  static const Color success = Color(0xFF2E7D32);
  static const Color warning = Color(0xFFED6C02);
  static const Color error = Color(0xFFD32F2F);
  static const Color info = Color(0xFF0288D1);

  // ── Role Accents ──────────────────────────────────────────────────────────
  static const Color studentRole = Color(0xFF1976D2);     // Blue
  static const Color facultyRole = Color(0xFF388E3C);     // Green
  static const Color parentRole = Color(0xFF7B1FA2);      // Purple
  static const Color adminRole = Color(0xFFC2185B);       // Crimson
}
