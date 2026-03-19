import React, { createContext, useContext, useState, ReactNode } from 'react';
import { users as defaultUsers } from '../data/data';

type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: any;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Bắt đầu với danh sách user từ data.js
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(defaultUsers);

  const login = (email: string, password: string): boolean => {
    // Tìm trong danh sách (bao gồm cả user từ data.js + user đã đăng ký mới)
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
        && u.password === password
    );
    if (!found) return false;
    setUser(found);
    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Kiểm tra email đã tồn tại chưa
    const existed = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existed) return false;

    const newUser: User = {
      id: String(registeredUsers.length + 1),
      name,
      email,
      password,
    };
    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}