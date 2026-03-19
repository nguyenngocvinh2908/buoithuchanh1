import { useEffect, useState } from 'react';
import { Tabs, useRouter, useSegments } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  label: string;
};

function TabIcon({ name, focused, label }: TabIconProps) {
  const GREEN = '#4A43EC';
  return (
    <View style={styles.tabItem}>
      <Ionicons name={name} size={22} color={focused ? GREEN : Colors.gray} />
      <Text style={[styles.tabLabel, { color: focused ? GREEN : Colors.gray }]}>
        {label}
      </Text>
    </View>
  );
}

function RootGuard() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/');
    }
  }, [isLoggedIn, segments, isMounted]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="HOME" />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'bag' : 'bag-outline'} focused={focused} label="ORDER" />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              focused={focused}
              label="INBOX"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} label="PROFILE" />
          ),
        }}
      />

      {/* ── Ẩn tab + ẩn tabBar hoàn toàn ở login/register ── */}
      <Tabs.Screen
        name="(auth)/login"
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },  // ← ẩn toàn bộ tab bar
        }}
      />
      <Tabs.Screen
        name="(auth)/register"
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },  // ← ẩn toàn bộ tab bar
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProductProvider>
        <RootGuard />
      </ProductProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});