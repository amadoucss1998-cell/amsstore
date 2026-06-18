import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { Gender } from '../../types';

const INTERESTS = ['Football', 'Music', 'Travel', 'Food', 'Fashion', 'Church', 'Dancing', 'Reading', 'Tech', 'Business', 'Movies', 'Family', 'Fitness', 'Photography', 'Cooking'];
const CITIES = ['Monrovia', 'Buchanan', 'Gbarnga', 'Kakata', 'Voinjama', 'Zwedru', 'Harper'];

export default function ProfileSetupScreen() {
  const { updateProfile, skipAuth } = useAuthStore();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('man');
  const [city, setCity] = useState('Monrovia');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest].slice(0, 6)
    );
  };

  const handleDone = () => {
    updateProfile({ name, age: parseInt(age) || 25, gender, city, bio, interests: selectedInterests });
    skipAuth();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Set up your profile</Text>
      <Text style={styles.subtitle}>Help people get to know you 😊</Text>

      <Text style={styles.label}>Your name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" placeholderTextColor={Colors.textMuted} />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Your age" placeholderTextColor={Colors.textMuted} keyboardType="number-pad" maxLength={2} />

      <Text style={styles.label}>I am a...</Text>
      <View style={styles.genderRow}>
        {(['man', 'woman', 'non-binary'] as Gender[]).map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
            onPress={() => setGender(g)}
          >
            <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>City</Text>
      <View style={styles.cityRow}>
        {CITIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, city === c && styles.chipActive]}
            onPress={() => setCity(c)}
          >
            <Text style={[styles.chipText, city === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Bio <Text style={styles.optional}>(optional)</Text></Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Tell people a bit about yourself..."
        placeholderTextColor={Colors.textMuted}
        multiline
        maxLength={200}
      />

      <Text style={styles.label}>Interests <Text style={styles.optional}>(pick up to 6)</Text></Text>
      <View style={styles.interestGrid}>
        {INTERESTS.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[styles.interestChip, selectedInterests.includes(interest) && styles.interestChipActive]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={[styles.interestText, selectedInterests.includes(interest) && styles.interestTextActive]}>
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
        <LinearGradient colors={Gradients.primary as any} style={styles.doneBtnGradient}>
          <Text style={styles.doneBtnText}>Let's Go! 🚀</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={skipAuth} style={{ paddingVertical: Spacing.lg, alignItems: 'center' }}>
        <Text style={{ color: Colors.textMuted }}>Skip for now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl },
  label: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.md },
  optional: { color: Colors.textMuted, fontWeight: FontWeight.regular },
  input: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, color: Colors.text, fontSize: FontSize.md, borderWidth: 1, borderColor: Colors.border },
  bioInput: { height: 100, textAlignVertical: 'top' },
  genderRow: { flexDirection: 'row', gap: Spacing.sm },
  genderBtn: { flex: 1, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  genderBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '20' },
  genderText: { color: Colors.textSecondary, fontWeight: FontWeight.medium },
  genderTextActive: { color: Colors.primary },
  cityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '20' },
  chipText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  chipTextActive: { color: Colors.primary },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  interestChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border },
  interestChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '20' },
  interestText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  interestTextActive: { color: Colors.primary, fontWeight: FontWeight.semibold },
  doneBtn: { borderRadius: Radius.full, overflow: 'hidden', marginTop: Spacing.xl },
  doneBtnGradient: { paddingVertical: 18, alignItems: 'center' },
  doneBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
});
