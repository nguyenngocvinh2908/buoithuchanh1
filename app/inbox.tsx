import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const messages = [
  {
    id: '1',
    sender: 'FoodApp Support',
    message: 'Your order #1234 has been confirmed and is being prepared!',
    time: '2m ago',
    unread: true,
    avatar: '🛒',
    color: '#EEF2FF',
  },
  {
    id: '2',
    sender: 'Delivery Partner',
    message: 'Hi! I\'m on my way to deliver your burger. ETA: 15 mins.',
    time: '10m ago',
    unread: true,
    avatar: '🏍️',
    color: '#FEF3C7',
  },
  {
    id: '3',
    sender: 'FoodApp Offers',
    message: 'Special weekend offer! Get 20% off on all pizzas today only.',
    time: '1h ago',
    unread: false,
    avatar: '🎁',
    color: '#D1FAE5',
  },
  {
    id: '4',
    sender: 'Customer Service',
    message: 'How was your last order? Rate your experience now!',
    time: '3h ago',
    unread: false,
    avatar: '⭐',
    color: '#FCE7F3',
  },
  {
    id: '5',
    sender: 'FoodApp',
    message: 'Welcome to FoodApp! Explore 100+ restaurants near you.',
    time: '1d ago',
    unread: false,
    avatar: '🍔',
    color: '#EEF2FF',
  },
];

export default function InboxScreen() {
  const [searchText, setSearchText] = useState('');

  const filtered = messages.filter((m) =>
    m.sender.toLowerCase().includes(searchText.toLowerCase()) ||
    m.message.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.gray} />
        <TextInput
          placeholder="Search messages..."
          placeholderTextColor={Colors.gray}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Unread badge */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterActive}>
          <Text style={styles.filterActiveText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Unread</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {messages.filter((m) => m.unread).length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Promotions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((item) => (
          <TouchableOpacity key={item.id} style={styles.messageCard}>
            <View style={[styles.avatarCircle, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 24 }}>{item.avatar}</Text>
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageRow}>
                <Text style={[styles.senderName, item.unread && styles.senderNameBold]}>
                  {item.sender}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text
                style={[styles.messageText, item.unread && styles.messageTextBold]}
                numberOfLines={1}
              >
                {item.message}
              </Text>
            </View>
            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  filterActive: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  filterActiveText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 14,
    gap: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContent: {
    flex: 1,
    gap: 4,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  senderNameBold: {
    fontWeight: '800',
  },
  timeText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  messageText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  messageTextBold: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
