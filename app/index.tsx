import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import { bannerItems } from '../data/data'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../context/AuthContext'
import { useProduct } from '../context/ProductContext'

const { width } = Dimensions.get('window');
const GREEN = '#22C55E';

const categories = [
  { id: '1', name: 'PIZZA', icon: 'pizza-slice' },
  { id: '2', name: 'BURGER', icon: 'hamburger' },
  { id: '3', name: 'DRINK', icon: 'wine-glass-alt' },
  { id: '4', name: 'RICE', icon: 'utensils' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { filteredProducts, searchText, setSearchText } = useProduct();
  const [activeCategory, setActiveCategory] = useState('1');
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Yellow Header Section ── */}
        <LinearGradient
          colors={['#F5F0C8', '#FFFDF0', '#FFFFFF']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.yellowSection}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../assets/avatar/avatar.png')}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.locationLabel}>Your Location</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={20} color="#4F46E5" />
                  <Text style={styles.locationText}>Savar, Dhaka</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Search Bar — realtime filter */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={22} color={Colors.white} />
            <TextInput
              placeholder="Search your food"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ── Categories ── */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(item.id)}
              style={[
                styles.categoryItem,
                activeCategory === item.id && styles.categoryItemActive,
              ]}
            >
              <FontAwesome5
                name={item.icon}
                size={28}
                color={activeCategory === item.id ? '#FFFFFF' : '#111827'}
              />
              <Text
                style={[
                  styles.categoryName,
                  activeCategory === item.id && styles.categoryNameActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* ── Banner ── */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
            setActiveBanner(idx);
          }}
          scrollEventThrottle={16}
          style={styles.bannerScroll}
        >
          {bannerItems.map((item) => (
            <View key={item.id} style={styles.bannerCard}>
              <Image source={require('../assets/images/burger.png')} style={styles.bannerImage} />
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <View style={styles.bannerRating}>
                  <View style={styles.avatarStack}>
                    <Image source={require('../assets/avatar/review-01.png')} style={[styles.miniAvatar, { left: 0 }]} />
                    <Image source={require('../assets/avatar/review-02.png')} style={[styles.miniAvatar, { left: 14 }]} />
                    <Image source={require('../assets/avatar/review-03.png')} style={[styles.miniAvatar, { left: 28 }]} />
                  </View>
                  <Ionicons name="star" size={12} color="#FCD34D" />
                  <Text style={styles.bannerRatingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Banner dots */}
        <View style={styles.dotsRow}>
          {bannerItems.map((_, i) => (
            <View key={i} style={[styles.dot, activeBanner === i && styles.dotActive]} />
          ))}
        </View>

        {/* ── Popular Items từ ProductContext ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularContainer}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
                Không tìm thấy món ăn nào 🍽️
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <Text style={styles.popularName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F0',
  },
  yellowSection: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 24,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 95,
  },
  avatar: {
    width: 49,
    height: 49,
    borderRadius: 23,
  },
  locationLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#242424',
  },
  notifBtn: {
    width: 46,
    height: 46,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#524CE0',
  },
  searchBar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A43EC',
    borderRadius: 50,
    marginHorizontal: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
    minWidth: 86,
    minHeight: 96,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  categoryItemActive: {
    backgroundColor: GREEN,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#242424',
    letterSpacing: 0.5,
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  bannerScroll: {
    paddingLeft: 20,
  },
  bannerCard: {
    width: width - 40,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 20,
    backgroundColor: '#000',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  bannerContent: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FCD34D',
    letterSpacing: 1,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 6,
  },
  bannerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avatarStack: {
    width: 50,
    height: 20,
    position: 'relative',
  },
  miniAvatar: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  bannerRatingText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 14,
    right: 14,
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    width: 52,
    height: 52,
  },
  discountText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  discountOff: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    backgroundColor: '#4F46E5',
    width: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  popularContainer: {
    paddingHorizontal: 20,
    gap: 14,
  },
  popularCard: {
    width: 150,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  popularImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  popularName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});