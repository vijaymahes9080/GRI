import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Bell, Calendar, FileSpreadsheet, Briefcase, ExternalLink, ShieldAlert, Award } from 'lucide-react-native';
import { Header } from '../../components/Header';
import { GRI_INSTITUTIONAL_DATA } from '../../core/services/institutionalData';

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'ALL' | 'CIRCULARS' | 'EVENTS' | 'TENDERS' | 'CAREERS'>('ALL');

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="University Alerts" subtitle="Circulars · Events · Tenders · Careers" variant="green" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {[
            { id: 'ALL', label: 'All Alerts', icon: Bell },
            { id: 'CIRCULARS', label: 'Circulars', icon: ShieldAlert },
            { id: 'EVENTS', label: 'Events', icon: Calendar },
            { id: 'TENDERS', label: 'Tenders', icon: FileSpreadsheet },
            { id: 'CAREERS', label: 'Careers', icon: Briefcase },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = filter === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setFilter(item.id as any)}
                className={`flex-row items-center px-3.5 py-2 rounded-xl mr-2.5 border ${
                  isActive ? 'bg-[#911C03] border-[#911C03]' : 'bg-white border-gray-200'
                }`}
              >
                <Icon size={15} color={isActive ? '#FFFFFF' : '#4B5563'} />
                <Text className={`text-xs font-bold ml-1.5 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* CIRCULARS SECTION */}
        {(filter === 'ALL' || filter === 'CIRCULARS') && (
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-2.5">
              <Text className="text-base font-bold text-gray-900">📢 Official Circulars</Text>
              <Text className="text-xs text-[#911C03] font-semibold">Latest Sync</Text>
            </View>
            {GRI_INSTITUTIONAL_DATA.circulars.map((circ) => (
              <View key={circ.id} className="bg-white p-4 rounded-xl mb-3 border border-gray-200 shadow-sm">
                <View className="flex-row items-center justify-between mb-1.5">
                  <Text className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded-md">
                    {circ.category}
                  </Text>
                  <Text className="text-[11px] text-gray-400">{circ.publishDate}</Text>
                </View>
                <Text className="text-sm font-bold text-gray-900 mb-2">{circ.title}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(circ.pdfUrl)}
                  className="flex-row items-center"
                >
                  <ExternalLink size={14} color="#518214" />
                  <Text className="text-xs font-bold text-[#518214] ml-1">Download Circular PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* EVENTS SECTION */}
        {(filter === 'ALL' || filter === 'EVENTS') && (
          <View className="mb-5">
            <Text className="text-base font-bold text-gray-900 mb-2.5">📅 Upcoming Events & Seminars</Text>
            {GRI_INSTITUTIONAL_DATA.events.map((evt) => (
              <View key={evt.id} className="bg-white p-4 rounded-xl mb-3 border border-gray-200 shadow-sm">
                <View className="flex-row items-center justify-between mb-1.5">
                  <Text className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {evt.category}
                  </Text>
                  <Text className="text-xs font-bold text-indigo-600">{evt.eventDate}</Text>
                </View>
                <Text className="text-sm font-bold text-gray-900 mb-1">{evt.title}</Text>
                <Text className="text-xs text-gray-600 mb-1">Organizer: {evt.organizer}</Text>
                <Text className="text-xs text-gray-500 mb-2.5">📍 {evt.venue}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(evt.link)}
                  className="bg-[#518214] py-2 rounded-lg items-center"
                >
                  <Text className="text-xs font-bold text-white">Event Registration & Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* TENDERS SECTION */}
        {(filter === 'ALL' || filter === 'TENDERS') && (
          <View className="mb-5">
            <Text className="text-base font-bold text-gray-900 mb-2.5">📑 Tenders & Public Procurement</Text>
            {GRI_INSTITUTIONAL_DATA.tenders.map((tend) => (
              <View key={tend.tenderNo} className="bg-white p-4 rounded-xl mb-3 border border-gray-200 shadow-sm">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-xs font-mono font-bold text-gray-500">{tend.tenderNo}</Text>
                  <Text className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {tend.status}
                  </Text>
                </View>
                <Text className="text-sm font-bold text-gray-900 mb-1.5">{tend.title}</Text>
                <Text className="text-xs text-red-600 font-semibold mb-2">⏰ Deadline: {tend.closingDate}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(tend.documentUrl)}
                  className="flex-row items-center"
                >
                  <ExternalLink size={14} color="#0D47A1" />
                  <Text className="text-xs font-bold text-[#0D47A1] ml-1">Download Tender Document PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* CAREERS SECTION */}
        {(filter === 'ALL' || filter === 'CAREERS') && (
          <View className="mb-5">
            <Text className="text-base font-bold text-gray-900 mb-2.5">💼 Career & Recruitment Vacancies</Text>
            {GRI_INSTITUTIONAL_DATA.careers.map((car) => (
              <View key={car.advtNo} className="bg-white p-4 rounded-xl mb-3 border border-gray-200 shadow-sm">
                <Text className="text-xs font-mono font-bold text-emerald-700 mb-0.5">{car.advtNo}</Text>
                <Text className="text-sm font-bold text-gray-900 mb-1">{car.postName}</Text>
                <Text className="text-xs text-gray-600 mb-1">Dept: {car.department} · Scale: {car.salary}</Text>
                <Text className="text-xs text-gray-500 mb-2">Qual: {car.qualification}</Text>
                <View className="flex-row items-center justify-between border-t border-gray-100 pt-2.5">
                  <Text className="text-xs font-bold text-red-600">Last Date: {car.lastDate}</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(car.pdfUrl)}
                    className="bg-[#518214] px-3 py-1.5 rounded-lg"
                  >
                    <Text className="text-xs font-bold text-white">View Prospectus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
