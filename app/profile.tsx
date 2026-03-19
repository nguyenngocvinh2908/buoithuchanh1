import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  onPress?: () => void;
};

function MenuItem({ icon, label, hasToggle, toggleValue, onToggle, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIconWrap}>
          <Ionicons name={icon} size={20} color="#111827" />
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* ── Vùng gradient vàng chia 2 + avatar ── */}
        <View style={styles.topSection}>
          <LinearGradient
            colors={['#f5f3d4', '#ede29d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientTop}
          />
          <LinearGradient
            colors={['#F5F0C8', '#FDFDF5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBottom}
          />
          <View style={styles.avatarWrapper}>
            <View style={styles.ring1}>
              <View style={styles.ring2}>
                <View style={styles.ring3}>
                  <Image
                    source={require('../assets/avatar/avatar.png')}
                    style={styles.profileAvatar}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={13} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tên + Email — hiển thị user thật từ AuthContext */}
        <View style={styles.nameSection}>
          <Text style={styles.profileName}>{user?.name ?? 'Người dùng'}</Text>
          <Text style={styles.profileEmail}>{user?.email ?? ''}</Text>
        </View>

        {/* ── Menu ── */}
        <View style={styles.menuCard}>
          <MenuItem icon="home-outline" label="Home" onPress={() => {}} />
          <View style={styles.divider} />
          <MenuItem
            icon="card-outline"
            label="My Card"
            onPress={() => Alert.alert('My Cards', 'Coming soon!')}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="moon-outline"
            label="Dark Mood"
            hasToggle
            toggleValue={darkMode}
            onToggle={setDarkMode}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="location-outline"
            label="Truck Your Order"
            onPress={() => Alert.alert('Track Order', 'Coming soon!')}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="settings-outline"
            label="Settings"
            onPress={() => Alert.alert('Settings', 'Coming soon!')}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="help-circle-outline"
            label="Help Center"
            onPress={() => Alert.alert('Help Center', 'How can we help you?')}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Log Out */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Log Out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Log Out',
                style: 'destructive',
                onPress: () => {
                  logout();
                  router.replace('/(auth)/login');
                },
              },
            ])
          }
        >
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 100;
const RING1_SIZE = AVATAR_SIZE + 24;
const RING2_SIZE = AVATAR_SIZE + 14;
const RING3_SIZE = AVATAR_SIZE + 6;
const TOP_HEIGHT = 90;
const BOT_HEIGHT = 80;
const AVATAR_TOP = TOP_HEIGHT - RING1_SIZE / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    zIndex: 10,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  topSection: {
    height: TOP_HEIGHT + BOT_HEIGHT,
    position: 'relative',
    alignItems: 'center',
  },
  gradientTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: TOP_HEIGHT,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  gradientBottom: {
    marginTop: 30,
    position: 'absolute',
    top: TOP_HEIGHT,
    left: 0, right: 0,
    height: BOT_HEIGHT,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  avatarWrapper: {
    position: 'absolute',
    top: AVATAR_TOP,
    width: RING1_SIZE,
    height: RING1_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  ring1: {
    width: RING1_SIZE, height: RING1_SIZE,
    borderRadius: RING1_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  ring2: {
    width: RING2_SIZE, height: RING2_SIZE,
    borderRadius: RING2_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  ring3: {
    width: RING3_SIZE, height: RING3_SIZE,
    borderRadius: RING3_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.25)',
    overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  profileAvatar: {
    width: AVATAR_SIZE, height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    resizeMode: 'cover',
  },
  editBtn: {
    position: 'absolute',
    bottom: 4, right: 4,
    width: 26, height: 26,
    borderRadius: 13,
    backgroundColor: '#4F46E5',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
    zIndex: 10,
  },
  nameSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    gap: 4,
  },
  profileName: { fontSize: 20, fontWeight: '700', color: '#242424' },
  profileEmail: { fontSize: 12, color: '#686868', fontWeight: '500' },
  menuCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { fontSize: 15, fontWeight: '500', color: '#242424' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 20 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 30,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    paddingVertical: 18,
    gap: 10,
  },
  logoutText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
});