import React, { useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    const success = register(name, email, password);
    if (!success) {
      setError('Email đã được sử dụng');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dải vàng + Tiêu đề ── */}
        <LinearGradient
          colors={['#FFFDE7', '#FFF9C4', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerSection}
        >
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#1A1A2E" />
          </TouchableOpacity>

          <Text style={styles.title}>Đăng Ký</Text>
          <Text style={styles.subtitle}>Tạo tài khoản mới ngay hôm nay!</Text>
        </LinearGradient>

        {/* ── Form ── */}
        <View style={styles.form}>

          {/* Họ tên */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Nguyễn Văn A"
                placeholderTextColor="#BDBDBD"
                value={name}
                onChangeText={(t) => { setName(t); setError(''); }}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Mật khẩu */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Tối thiểu 6 ký tự"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons
                  name={showPass ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Xác nhận mật khẩu */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#BDBDBD"
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
                secureTextEntry={!showPass}
              />
            </View>
          </View>

          {/* Error */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {/* Nút Đăng Ký */}
          <TouchableOpacity style={styles.btn} onPress={handleRegister}>
            <Text style={styles.btnText}>Tạo Tài Khoản</Text>
          </TouchableOpacity>

          {/* Link đăng nhập */}
          <View style={styles.linkRow}>
            <Text style={styles.linkLabel}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          {/* Divider hoặc */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <GoogleIcon size={22} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
  },

  // ── Dải vàng ──
  headerSection: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },

  // ── Form ──
  form: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputWrap: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },

  // Error
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500',
    marginBottom: 16,
    marginTop: -8,
  },

  // Nút đăng ký
  btn: {
    backgroundColor: '#4A43EC',
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4A43EC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
    marginTop: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // Link đăng nhập
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 28,
  },
  linkLabel: { color: '#6B7280', fontSize: 14 },
  linkText: {
    color: '#4A43EC',
    fontWeight: '700',
    fontSize: 14,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 13,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EA4335',
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
});