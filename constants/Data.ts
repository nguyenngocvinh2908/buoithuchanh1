export const categories = [
  { id: '1', name: 'PIZZA', icon: 'pizza-slice', active: false },
  { id: '2', name: 'BURGER', icon: 'hamburger', active: true },
  { id: '3', name: 'DRINK', icon: 'wine-glass', active: false },
  { id: '4', name: 'RICE', icon: 'bowl-rice', active: false },
];

export const popularItems = [
  {
    id: '1',
    name: 'BURGER',
    price: 28,
    rating: 4.9,
    reviews: '3k+',
    discount: '10%',
    image: require('../assets/images/burger-item-01.png'),
    category: 'burger',
  },
  {
    id: '2',
    name: 'PIZZA',
    price: 22,
    rating: 4.8,
    reviews: '2k+',
    discount: '15%',
    image: require('../assets/images/burger-item-02.png'),
    category: 'pizza',
  },
  {
    id: '3',
    name: 'PASTA',
    price: 18,
    rating: 4.7,
    reviews: '1.5k+',
    discount: '5%',
    image: require('../assets/images/burger-item-01.png'),
    category: 'pasta',
  },
  {
    id: '4',
    name: 'SUSHI',
    price: 35,
    rating: 4.9,
    reviews: '2.5k+',
    discount: '8%',
    image: require('../assets/images/burger-item-02.png'),
    category: 'sushi',
  },
];

export const bannerItems = [
  {
    id: '1',
    title: 'BURGER',
    subtitle: "Today's Hot offer",
    discount: '10% OFF',
    rating: '4.9 (3k+ Rating)',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    id: '2',
    title: 'PIZZA',
    subtitle: "Weekend Special",
    discount: '15% OFF',
    rating: '4.8 (2k+ Rating)',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  },
];

export const cartItems = [
  {
    id: '1',
    name: 'BURGER',
    price: 28,
    quantity: 2,
    rating: 4.9,
    reviews: '3k+',
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    deliveryAddress: 'Dhaka, Bangladesh',
  },
];

export const userProfile = {
  name: 'Rakibul Hasan',
  email: 'rakibhbrand@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
};
