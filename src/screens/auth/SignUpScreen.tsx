import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { GradientButton } from '../../components/GradientButton';
import { BackButton } from '../../components/BackButton';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';

type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'> };

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { signup, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = 'Enter your name';
    if (!email.includes('@')) errs.email = 'Enter a valid email';
    if (password.length < 6) errs.password = 'At least 6 characters';
    if (!agreed) errs.terms = 'Please agree to continue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleSignUp = async () => {
    if (!validate()) { shake(); return; }
    await signup(email, password, name);
    navigation.navigate('Onboarding');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a0a2e', Colors.background]} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BackButton onPress={() => navigation.goBack()} style={styles.back} />

          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Start your spark journey today</Text>
          </View>

          <Animated.View style={[styles.form, { transform: [{ translateX: shakeAnim }] }]}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                value={name}
                onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: '' })); }}
                placeholder="Alex Morgan"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
                autoComplete="name"
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: '' })); }}
                placeholder="your@email.com"
                placeholderTextColor={Colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput, errors.password ? styles.inputError : null]}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: '' })); }}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
                  <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            {/* Terms */}
            <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed((v) => !v)}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

            <GradientButton
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              size="lg"
              style={styles.signupButton}
            />
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
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
  input: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing['4'],
    paddingVertical: Spacing['4'],
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputError: { borderColor: Colors.error },
  errorText: { fontSize: 12, color: Colors.error, marginTop: 2 },
  passwordContainer: { position: 'relative' },
  passwordInput: { paddingRight: 52 },
  eyeButton: { position: 'absolute', right: 16, top: 14 },
  eyeIcon: { fontSize: 18 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkmark: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  termsText: { flex: 1, fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  termsLink: { color: Colors.primary, fontWeight: '600' },
  signupButton: { marginTop: Spacing['2'] },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing['8'] },
  footerText: { color: Colors.textSecondary, fontSize: 15 },
  footerLink: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
