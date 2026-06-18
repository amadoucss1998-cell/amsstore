import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthStackParamList } from '../../types';

const DEMO_OTP = '123456';

export default function OTPScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<any>();
  const { phone } = route.params;
  const login = useAuthStore((s) => s.login);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = () => {
    if (otp === DEMO_OTP || otp.length === 6) {
      login(phone);
    } else {
      setError('Wrong code. Try 123456 for demo.');
      shake();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter the code</Text>
        <Text style={styles.subtitle}>Sent to {phone}</Text>

        <Animated.View style={[styles.otpWrap, { transform: [{ translateX: shakeAnim }] }]}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={(v) => { setOtp(v); setError(''); }}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            textAlign="center"
            letterSpacing={12}
            placeholder="• • • • • •"
            placeholderTextColor={Colors.textMuted}
          />
        </Animated.View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.demo}>💬 Demo: use code 123456</Text>

        <TouchableOpacity
          style={[styles.verifyBtn, otp.length < 6 && styles.disabled]}
          onPress={handleVerify}
          disabled={otp.length < 6}
        >
          <LinearGradient colors={Gradients.primary as any} style={styles.btnGradient}>
            <Text style={styles.verifyBtnText}>Verify →</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={resendTimer > 0}
          onPress={() => setResendTimer(30)}
          style={styles.resendBtn}
        >
          <Text style={[styles.resendText, resendTimer > 0 && styles.resendDisabled]}>
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  back: { padding: Spacing.lg, paddingTop: 60 },
  content: { flex: 1, paddingHorizontal: Spacing.xl, alignItems: 'center' },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.sm, alignSelf: 'flex-start' },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl, alignSelf: 'flex-start' },
  otpWrap: { width: '100%', marginBottom: Spacing.md },
  otpInput: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.lg, color: Colors.text, fontSize: 32, fontWeight: FontWeight.bold, borderWidth: 2, borderColor: Colors.primary, width: '100%' },
  error: { color: Colors.danger, fontSize: FontSize.sm, marginBottom: Spacing.md },
  demo: { color: Colors.textMuted, fontSize: FontSize.sm, marginBottom: Spacing.xl },
  verifyBtn: { borderRadius: Radius.full, overflow: 'hidden', width: '100%' },
  disabled: { opacity: 0.4 },
  btnGradient: { paddingVertical: 18, alignItems: 'center' },
  verifyBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  resendBtn: { marginTop: Spacing.lg },
  resendText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  resendDisabled: { color: Colors.textMuted },
});
