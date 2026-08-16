import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Users, Bell, CheckCircle, Clock, ShieldAlert, PlusCircle, ListOrdered, ArrowLeft, Send } from 'lucide-react-native';
import { apiClient } from '../../core/api';
import { AdminGuard } from '../../components/AdminGuard';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [stats, setStats] = useState({
    total_users: 12450,
    active_users: 11800,
    total_notifications: 245,
    pending_notifications: 3,
    sent_notifications: 238,
    delivery_rate_pct: '98.7%',
    failed_rate_pct: '1.3%',
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await apiClient.get('/admin/notifications/dashboard/stats');
      if (res.data) {
        setStats(res.data);
      }
    } catch {}
  };

  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');

  const triggerEmergency = () => {
    setEmergencyMessage('');
    setEmergencyModalVisible(true);
  };

  const submitEmergency = async () => {
    if (!emergencyMessage.trim()) return;
    setEmergencyModalVisible(false);
    try {
      await apiClient.post('/notifications/broadcast-emergency', {
        title: 'Campus Safety Notice',
        message: emergencyMessage.trim(),
      });
      Alert.alert('Broadcast Sent', 'Emergency notification dispatched to all channels.');
      fetchStats();
    } catch (err: any) {
      Alert.alert('Broadcast Error', err?.message || 'Failed to dispatch emergency alert.');
    }
  };

  return (
    <AdminGuard>
      <View style={{ flex: 1, backgroundColor: '#020617' }}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Emergency Message Modal */}
        <Modal visible={emergencyModalVisible} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 24 }}>
            <View style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#7f1d1d' }}>
              <Text style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>🚨 Emergency Broadcast</Text>
              <Text style={{ color: '#94a3b8', fontSize: 12, marginBottom: 16 }}>This message will be sent to ALL users across all channels immediately.</Text>
              <TextInput
                value={emergencyMessage}
                onChangeText={setEmergencyMessage}
                placeholder="Enter emergency alert message..."
                placeholderTextColor="#475569"
                multiline
                numberOfLines={4}
                style={{ backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 12, color: '#FFFFFF', fontSize: 14, minHeight: 100 }}
              />
              <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setEmergencyModalVisible(false)}
                  style={{ flex: 1, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}
                >
                  <Text style={{ color: '#94a3b8', fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={submitEmergency}
                  style={{ flex: 1, backgroundColor: '#dc2626', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>BROADCAST</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Header */}
        <View style={{ paddingTop: 48, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, borderRadius: 999, backgroundColor: '#1e293b' }}>
            <ArrowLeft size={20} color="#94a3b8" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>GRI Admin Dashboard</Text>
          <TouchableOpacity onPress={triggerEmergency} style={{ padding: 8, borderRadius: 999, backgroundColor: '#dc2626' }}>
            <ShieldAlert size={18} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, padding: 20 }}>
          {/* KPI Grid */}
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>System Overview</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 }}>
            {[
              { icon: Users, color: '#38bdf8', value: stats.total_users, label: 'Total Registered Users' },
              { icon: Bell, color: '#10b981', value: stats.total_notifications, label: 'Dispatched Alerts' },
              { icon: Clock, color: '#f59e0b', value: stats.pending_notifications, label: 'Pending Approval' },
              { icon: CheckCircle, color: '#a855f7', value: stats.delivery_rate_pct, label: 'Delivery Success Rate' },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <View key={i} style={{ width: '48%', backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                  <Icon size={22} color={kpi.color} />
                  <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginTop: 8 }}>{kpi.value}</Text>
                  <Text style={{ fontSize: 12, color: '#64748b', fontWeight: '500' }}>{kpi.label}</Text>
                </View>
              );
            })}
          </View>

          {/* Quick Actions */}
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Admin Actions</Text>

          <TouchableOpacity
            onPress={() => router.push('/admin/composer')}
            style={{ backgroundColor: '#059669', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PlusCircle size={24} color="white" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>Create Official Notification</Text>
                <Text style={{ fontSize: 12, color: '#a7f3d0' }}>Composer with target engine & channels</Text>
              </View>
            </View>
            <Send size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/admin/approval_queue')}
            style={{ backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ListOrdered size={24} color="#f59e0b" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>Approval Queue</Text>
                <Text style={{ fontSize: 12, color: '#64748b' }}>{stats.pending_notifications} pending admin review</Text>
              </View>
            </View>
            <View style={{ backgroundColor: 'rgba(245,158,11,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fbbf24' }}>Review</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </AdminGuard>
  );
}
