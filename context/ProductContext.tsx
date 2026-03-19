import React, { createContext, useContext, useState, ReactNode } from 'react';
import { popularItems, bannerItems } from '../data/data';

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: string;
  discount: string;
  image: any;
  category: string;
};

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  rating: string;
  image: any;
};

type ProductContextType = {
  searchText: string;
  setSearchText: (text: string) => void;
  filteredProducts: Product[];
  banners: Banner[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState('');

  // Tìm kiếm realtime bằng JS filter từ data/data.js
  const filteredProducts: Product[] = popularItems.filter((item: Product) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ProductContext.Provider
      value={{
        searchText,
        setSearchText,
        filteredProducts,
        banners: bannerItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be inside ProductProvider');
  return ctx;
}