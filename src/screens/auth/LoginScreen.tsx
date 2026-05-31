import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { GradientButton } from '../../components/GradientButton';
import { BackButton } from '../../components/BackButton';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';

type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'> };

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.includes('@')) errs.email = 'Enter a valid email';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const shake = () => Animated.sequence([
    Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
  ]).start();

  const handleLogin = async () => { if (!validate()) { shake(); return; } await login(email, password); };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a0a2e', Colors.background]} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BackButton onPress={() => navigation.goBack()} style={styles.back} />
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue sparking</Text>
          </View>
          <Animated.View style={[styles.form, { transform: [{ translateX: shakeAnim }] }]}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput style={[styles.input, errors.email ? styles.inputError : null]} value={email} onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: undefined })); }} placeholder="your@email.com" placeholderTextColor={Colors.textMuted} keyboardType="email-address" autoCapitalize="none" />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput style={[styles.input, styles.passwordInput, errors.password ? styles.inputError : null]} value={password} onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: undefined })); }} placeholder="Enter password" placeholderTextColor={Colors.textMuted} secureTextEntry={!showPassword} />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
                  <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <TouchableOpacity style={styles.forgotButton}><Text style={styles.forgotText}>Forgot password?</Text></TouchableOpacity>
            <GradientButton title="Sign In" onPress={handleLogin} loading={isLoading} size="lg" style={styles.loginButton} />
          </Animated.View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.footerLink}>Sign Up</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, padding: Spacing['6'] },
  back: { marginBottom: Spacing['8'] },
  header: { marginBottom: Spacing['8'] },
  title: { fontSize: 34, fontWeight: '800', color: Colors.white, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary },
  form: { gap: Spacing['5'] },
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  input: { backgroundColor: Colors.cardBackground, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing['4'], paddingVertical: Spacing['4'], fontSize: 16, color: Colors.textPrimary },
  inputError: { borderColor: Colors.error },
  errorText: { fontSize: 12, color: Colors.error, marginTop: 2 },
  passwordContainer: { position: 'relative' },
  passwordInput: { paddingRight: 52 },
  eyeButton: { position: 'absolute', right: 16, top: 14 },
  eyeIcon: { fontSize: 18 },
  forgotButton: { alignSelf: 'flex-end', marginTop: -4 },
  forgotText: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  loginButton: { marginTop: Spacing['2'] },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing['8'] },
  footerText: { color: Colors.textSecondary, fontSize: 15 },
  footerLink: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
