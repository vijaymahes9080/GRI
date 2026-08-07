import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, ArrowRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-khadi-blue items-center justify-center p-6">
      <View className="bg-white/10 p-6 rounded-full mb-6">
        <GraduationCap size={64} color="#FFFFFF" />
      </View>
      <Text className="text-3xl font-bold text-white text-center mb-2">
        Gandhigram Rural Institute
      </Text>
      <Text className="text-base text-khadi-light text-center mb-10">
        Deemed to be University · Enterprise Mobile Platform
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/(tabs)')}
        className="flex-row items-center bg-saffron px-8 py-4 rounded-xl shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-lg mr-2">Enter Portal</Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
