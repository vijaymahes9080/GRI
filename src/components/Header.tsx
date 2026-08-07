import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showBack = false, rightAction }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3.5 bg-khadi-blue">
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1" activeOpacity={0.7}>
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-xl font-bold text-white" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-xs text-khadi-light" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View className="ml-3">{rightAction}</View>}
    </View>
  );
};
