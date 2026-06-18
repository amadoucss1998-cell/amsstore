import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { COUNTRIES } from '../../data/countries';
import { AuthStackParamList } from '../../types';

export default function PhoneScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { selectedCountry, setCountry, setPhone } = useAuthStore();
  const [number, setNumber] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleContinue = () => {
    if (number.length < 7) return;
    const fullPhone = `${selectedCountry.dialCode}${number}`;
    setPhone(fullPhone);
    navigation.navigate('OTP', { phone: fullPhone, countryCode: selectedCountry.code });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>What's your number?</Text>
        <Text style={styles.subtitle}>We'll send you a verification code. No spam, ever.</Text>

        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.countryBtn} onPress={() => setShowPicker(true)}>
            <Text style={styles.flag}>{selectedCountry.flag}</Text>
            <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            value={number}
            onChangeText={setNumber}
            placeholder="70 000 0001"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            maxLength={12}
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, number.length < 7 && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={number.length < 7}
        >
          <LinearGradient colors={Gradients.primary as any} style={styles.btnGradient}>
            <Text style={styles.continueBtnText}>Send Code</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.note}>🔒 Standard SMS rates may apply</Text>
      </View>

      {/* Country Picker Modal */}
      <Modal visible={showPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(c) => c.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.countryRow, item.code === selectedCountry.code && styles.countryRowActive]}
                  onPress={() => { setCountry(item); setShowPicker(false); }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryDial}>{item.dialCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  back: { padding: Spacing.lg, paddingTop: 60 },
  content: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.sm },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl, lineHeight: 22 },
  inputRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  countryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.card, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 14, borderWidth: 1, borderColor: Colors.border },
  flag: { fontSize: 22 },
  dialCode: { color: Colors.text, fontWeight: FontWeight.semibold, fontSize: FontSize.md },
  phoneInput: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 14, color: Colors.text, fontSize: FontSize.lg, borderWidth: 1, borderColor: Colors.border },
  continueBtn: { borderRadius: Radius.full, overflow: 'hidden' },
  continueBtnDisabled: { opacity: 0.4 },
  btnGradient: { paddingVertical: 18, alignItems: 'center' },
  continueBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  note: { textAlign: 'center', color: Colors.textMuted, fontSize: FontSize.sm, marginTop: Spacing.lg },
  modalOverlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '70%', paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.lg },
  modalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  countryRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, paddingHorizontal: Spacing.lg },
  countryRowActive: { backgroundColor: Colors.primary + '20' },
  countryFlag: { fontSize: 24 },
  countryName: { flex: 1, color: Colors.text, fontSize: FontSize.md },
  countryDial: { color: Colors.textMuted, fontSize: FontSize.sm },
});
