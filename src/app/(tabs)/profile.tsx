import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { User, ShieldCheck, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { useAuthStore } from '../../core/auth/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of GRI Portal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/index');
        },
      },
    ]);
  };

  const menuItems = [
    { title: 'Security & Biometrics', icon: ShieldCheck, route: 'biometrics' },
    { title: 'Notification Preferences', icon: Bell, route: 'notifications' },
    { title: 'Change Password', icon: Lock, route: 'password' },
    { title: 'Help & Grievance Portal', icon: HelpCircle, route: 'support' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="My Profile" subtitle="Account Settings" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <Card className="p-5 mb-5 border-gray-100 flex-row items-center">
          <View className="bg-khadi-blue p-4 rounded-full mr-4">
            <User size={32} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">{user?.fullName || 'Vijay Maheswari'}</Text>
            <Text className="text-xs text-gray-500 font-medium">{user?.department || 'Computer Science'}</Text>
            <Text className="text-xs font-semibold text-khadi-blue mt-1">Roll: {user?.rollNumber || 'GRI-2024-8841'}</Text>
          </View>
        </Card>

        {/* Menu Items */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Settings & Options</Text>

        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => Alert.alert(item.title, 'Navigating to ' + item.title)}
              className="bg-white p-4 rounded-2xl border border-gray-100 mb-3 flex-row items-center justify-between"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-2.5 rounded-xl mr-3">
                  <Icon size={20} color="#0D47A1" />
                </View>
                <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
          );
        })}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 border border-red-200 p-4 rounded-2xl mt-4 flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#D32F2F" />
          <Text className="text-base font-bold text-red-600 ml-2">Sign Out of GRI Portal</Text>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
