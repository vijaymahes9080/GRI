import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  BookOpen,
  FileCheck,
  CreditCard,
  Library,
  Building2,
  Briefcase,
  Bot,
  MapPin,
  Bus,
  AlertCircle,
  Bell,
  CheckCircle2,
} from 'lucide-react-native';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { useAuthStore } from '../../core/auth/authStore';

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const modules = [
    { title: 'Academics & Attendance', icon: BookOpen, color: '#0D47A1', route: '/(tabs)/academics' },
    { title: 'Exams & Results', icon: FileCheck, color: '#E65100', route: '/(tabs)/examinations' },
    { title: 'Fee Payments', icon: CreditCard, color: '#2E7D32', route: '/(tabs)/academics' },
    { title: 'Library OPAC', icon: Library, color: '#6A1B9A', route: '/(tabs)/academics' },
    { title: 'Hostel & Outpass', icon: Building2, color: '#D84315', route: '/(tabs)/hostel' },
    { title: 'Placements', icon: Briefcase, color: '#00838F', route: '/(tabs)/profile' },
    { title: 'AI Knowledge Bot', icon: Bot, color: '#C2185B', route: '/(tabs)/ai_chat' },
    { title: 'Village Outreach', icon: MapPin, color: '#558B2F', route: '/(tabs)/home' },
    { title: 'Transport & Bus', icon: Bus, color: '#F57F17', route: '/(tabs)/home' },
    { title: 'Grievance Portal', icon: AlertCircle, color: '#C62828', route: '/(tabs)/profile' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="GRI Mobile"
        subtitle={user ? `Welcome, ${user.fullName}` : 'Gandhigram Rural Institute'}
        rightAction={
          <TouchableOpacity className="p-1.5 bg-white/10 rounded-full">
            <Bell size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Banner Notice */}
        <View className="bg-blue-900 p-4 rounded-2xl mb-5 shadow-sm">
          <View className="flex-row items-center mb-1">
            <CheckCircle2 size={18} color="#82B1FF" />
            <Text className="text-xs font-semibold text-khadi-light ml-1.5">ANNOUNCEMENT</Text>
          </View>
          <Text className="text-white font-bold text-base mb-1">End Semester Exam Timetable Released</Text>
          <Text className="text-xs text-blue-100">
            Download your hall ticket from the Examination tab before May 15.
          </Text>
        </View>

        {/* Quick Stats Grid */}
        <View className="flex-row mb-5 space-x-3">
          <View className="flex-1 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
            <Text className="text-xs text-gray-500 font-medium">Overall Attendance</Text>
            <Text className="text-2xl font-bold text-khadi-blue mt-1">92.4%</Text>
          </View>

          <View className="flex-1 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
            <Text className="text-xs text-gray-500 font-medium">Current CGPA</Text>
            <Text className="text-2xl font-bold text-saffron mt-1">8.85</Text>
          </View>
        </View>

        {/* Domain Modules Grid */}
        <Text className="text-lg font-bold text-gray-900 mb-3">University Services</Text>
        <View className="flex-row flex-wrap justify-between">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <Card
                key={index}
                onPress={() => router.push(mod.route as any)}
                className="w-[48%] mb-3 p-4 items-center justify-center border-gray-100"
              >
                <View className="p-3 rounded-2xl mb-2" style={{ backgroundColor: `${mod.color}15` }}>
                  <Icon size={26} color={mod.color} />
                </View>
                <Text className="text-sm font-semibold text-gray-800 text-center">{mod.title}</Text>
              </Card>
            );
          })}
        </View>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
