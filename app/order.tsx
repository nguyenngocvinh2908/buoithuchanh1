import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const initialCart = [
  {
    id: '1',
    name: 'BURGER',
    price: 28,
    quantity: 2,
    rating: 4.9,
    reviews: '3k+',
    discount: '10%',
    imageBig: require('../assets/images/burger-item-01.png'),
    imageThumb: [
      require('../assets/images/burger-item-01.png'),
      require('../assets/images/burger-item-01.png'),
      require('../assets/images/burger-item-01.png'),
    ],
    deliveryAddress: 'Dhaka, Bangladesh',
  },
];

export default function OrderScreen() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const deliveryFee = 6.2;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <TouchableOpacity onPress={() => setCartItems([])}>
          <Ionicons name="trash-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id}>

            {/* ── Ảnh lớn + 3 thumbnail chèn lên ── */}
            <View style={styles.imageWrapper}>
              <Image source={item.imageBig} style={styles.mainImage} />

              {/* Badge giảm giá */}
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
                <Text style={styles.discountOff}>OFF</Text>
              </View>

              {/* 3 thumbnail position absolute chèn lên ảnh lớn */}
              <View style={styles.thumbRow}>
                {item.imageThumb.map((thumb, i) => (
                  <Image key={i} source={thumb} style={styles.thumbImg} />
                ))}
              </View>
            </View>

            {/* ── Box chứa tất cả thông tin (trừ ảnh) ── */}
            <View style={styles.infoBox}>

              {/* Tên + Giá */}
              <View style={styles.nameRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>

              {/* Rating + Quantity */}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FCD34D" />
                <Text style={styles.ratingText}>
                  {item.rating} ({item.reviews} Rating)
                </Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                    <Ionicons name="add-circle-outline" size={26} color="#4F46E5" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>
                    {String(item.quantity).padStart(2, '0')}
                  </Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                    <Ionicons name="remove-circle-outline" size={26} color="#4F46E5" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ── Delivery Address + Edit button (tách nhau, cùng height 67px) ── */}
              <View style={styles.deliveryRow}>
                {/* Box địa chỉ — bg xanh #C0EADB */}
                <View style={styles.deliveryBox}>
                  <View style={styles.locationIconWrap}>
                    <Ionicons name="location-outline" size={16} color="#4F46E5" />
                  </View>
                  <View>
                    <Text style={styles.deliveryLabel}>Delivery Address</Text>
                    <Text style={styles.deliveryAddr}>{item.deliveryAddress}</Text>
                  </View>
                </View>

                {/* Button edit — tách riêng, cùng height */}
                <TouchableOpacity style={styles.editBtn}>
                  <Ionicons name="pencil" size={18} color="#4F46E5" />
                </TouchableOpacity>
              </View>

              {/* ── Payment Method ── */}
              <View style={styles.paymentRow}>
                <View style={styles.paymentLeft}>
                  <View style={styles.cardIconWrap}>
                    <Image source={require('../assets/icons/payment.png')}/>
                  </View>
                  <Text style={styles.paymentText}>Payment Method</Text>
                </View>
                <TouchableOpacity style={styles.changeBtn}>
                  <Text style={styles.changeBtnText}>Change</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* ── Checkout Summary ── */}
              <Text style={styles.summaryTitle}>Checkout Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({cartItems.length})</Text>
                <Text style={styles.summaryValue}>${subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Payable Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(1)}</Text>
              </View>

            </View>
            {/* ── End infoBox ── */}

          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => Alert.alert('🎉 Order Confirmed!', `Total: $${total.toFixed(1)}`)}
        >
          <Text style={styles.confirmBtnText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F0',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  // ── Ảnh lớn + thumbnails ──
  imageWrapper: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    height: 260,          // chiều cao vùng ảnh
    marginBottom: 0,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  discountOff: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // 3 thumbnail chèn lên ảnh lớn — position absolute
  thumbRow: {
    position: 'absolute',
    bottom: 15,
    left: 50,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  thumbImg: {
    width: 94,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    resizeMode: 'cover',
  },

  // ── Box thông tin ──
  infoBox: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    marginTop: -20,           // kéo lên đè lên ảnh 20px
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    gap: 15,
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 1,
  },
  itemPrice: {
    fontSize: 21,
    fontWeight: '500',
    color: '#7D78F1',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 24,
    textAlign: 'center',
  },

  // ── Delivery row: box xanh + button edit tách rời ──
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 67,             // cùng chiều cao 67px
  },
  deliveryBox: {
    flex: 1,
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C0EADB',   // màu xanh mint
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  locationIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  deliveryAddr: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  editBtn: {
    width: 67,
    height: 67,             // cùng height 67px
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#4F46E5',
  },

  // Payment
  paymentRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconWrap: {
    width: 44,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  changeBtn: {
    borderWidth: 1.5,
    borderColor: '#4F46E5',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  changeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },

  // Summary
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4F46E5',
  },

  // Footer
  confirmBtn: {
    marginBottom: 10,
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});