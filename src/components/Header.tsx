import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  variant?: 'blue' | 'green' | 'maroon';
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showBack = false, rightAction, variant = 'green' }) => {
  const router = useRouter();

  const bgClass =
    variant === 'green'
      ? 'bg-[#518214]'
      : variant === 'maroon'
      ? 'bg-[#911C03]'
      : 'bg-[#0D47A1]';

  return (
    <View className={`flex-row items-center justify-between px-4 py-3.5 ${bgClass} border-b border-white/10 shadow-sm`}>
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1" activeOpacity={0.7}>
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-xl font-bold text-white tracking-wide" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-xs text-emerald-100 font-medium" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View className="ml-3">{rightAction}</View>}
    </View>
  );
};
