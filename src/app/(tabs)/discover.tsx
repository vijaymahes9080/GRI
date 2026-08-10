import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  Building,
  FileText,
  MapPin,
  Newspaper,
  Compass,
  Award,
  Shield,
  Sun,
  Key,
} from 'lucide-react-native';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { GRI_INSTITUTIONAL_DATA, GRI_MOBILE_NAV_TAGS } from '../../core/services/institutionalData';

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: 'Admissions 2026-27', count: 'CUET & Prospectus', icon: GraduationCap, color: '#518214' },
    { title: '7 Schools & 30+ Depts', count: `${GRI_INSTITUTIONAL_DATA.schools.length} Schools`, icon: BookOpen, color: '#911C03' },
    { title: '15+ Specialized Facilities', count: `${GRI_INSTITUTIONAL_DATA.facilities.length} Facilities`, icon: MapPin, color: '#F16236' },
    { title: '16+ Institutional Cells', count: `${GRI_INSTITUTIONAL_DATA.cells.length} Cells`, icon: Shield, color: '#0D47A1' },
    { title: 'Operational Manuals', count: `${GRI_INSTITUTIONAL_DATA.manuals.length} Manuals`, icon: FileText, color: '#00838F' },
    { title: 'Unnat Bharat Abhiyan', count: 'UBA & KVK Advisories', icon: Sun, color: '#6A1B9A' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Discover GRI" subtitle={GRI_INSTITUTIONAL_DATA.motto} variant="green" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Global Search Bar */}
        <View className="flex-row items-center bg-white border border-gray-300 rounded-2xl px-3.5 py-2.5 mb-5 shadow-sm">
          <Search size={20} color="#6B7280" />
          <TextInput
            placeholder="Search departments, circulars, regulations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2.5 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Dynamic Category Cards */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold text-gray-900">Institutional Ecosystem</Text>
          <Compass size={20} color="#518214" />
        </View>

        <View className="flex-row flex-wrap justify-between mb-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Card
                key={index}
                onPress={() => router.push('/(tabs)/home')}
                className="w-[48%] mb-3.5 p-4 items-center border-gray-200 bg-white shadow-sm"
              >
                <View className="p-3 rounded-2xl mb-2" style={{ backgroundColor: `${cat.color}15` }}>
                  <Icon size={24} color={cat.color} />
                </View>
                <Text className="text-sm font-bold text-gray-900 text-center">{cat.title}</Text>
                <Text className="text-[11px] font-medium text-gray-500 text-center mt-0.5">{cat.count}</Text>
              </Card>
            );
          })}
        </View>

        {/* 7 Schools & Departments Section */}
        <Text className="text-base font-bold text-gray-900 mb-2">Schools & Departments</Text>
        {GRI_INSTITUTIONAL_DATA.schools.map((school) => (
          <View key={school.id} className="bg-white p-3.5 rounded-xl mb-3 border border-gray-200 shadow-sm">
            <Text className="text-sm font-bold text-emerald-800 mb-1">{school.name}</Text>
            {school.departments.map((dept) => (
              <Text key={dept.code} className="text-xs text-gray-600 font-medium py-0.5">
                • {dept.name} ({dept.head})
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
