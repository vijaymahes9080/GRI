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
} from 'lucide-react-native';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: 'Admissions 2025-26', count: '14 Programmes', icon: GraduationCap, color: '#518214' },
    { title: 'Academic Departments', count: '28 Departments', icon: BookOpen, color: '#911C03' },
    { title: 'Research & Ph.D.', count: 'Ph.D. Evaluation', icon: FileText, color: '#0D47A1' },
    { title: 'Campus Infrastructure', count: 'Facilities & Map', icon: MapPin, color: '#F16236' },
    { title: 'Placements & Career', count: 'Campus Drives', icon: Briefcase, color: '#00838F' },
    { title: 'Alumni Network', count: 'GRI Alumni Assn', icon: Users, color: '#6A1B9A' },
    { title: 'Tenders & Vacancies', count: 'Official Notices', icon: Building, color: '#D84315' },
    { title: 'E-News & Press', count: 'University News', icon: Newspaper, color: '#33691E' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Discover GRI" subtitle="Departments, Admissions & Campus" variant="green" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Global Search Bar */}
        <View className="flex-row items-center bg-white border border-gray-300 rounded-2xl px-3.5 py-2.5 mb-5 shadow-sm">
          <Search size={20} color="#6B7280" />
          <TextInput
            placeholder="Search departments, courses, circulars..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2.5 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Discovery Categories */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold text-gray-900">Explore Ecosystem</Text>
          <Compass size={20} color="#518214" />
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Card
                key={index}
                onPress={() => router.push('/(tabs)/home')}
                className="w-[48%] mb-3.5 p-4 items-center border-gray-200 bg-white shadow-sm"
              >
                <View className="p-3 rounded-2xl mb-2" style={{ backgroundColor: `${cat.color}15` }}>
                  <Icon size={26} color={cat.color} />
                </View>
                <Text className="text-sm font-bold text-gray-900 text-center">{cat.title}</Text>
                <Text className="text-[11px] font-medium text-gray-500 text-center mt-0.5">{cat.count}</Text>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
