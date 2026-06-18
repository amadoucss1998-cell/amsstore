import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { Profile } from '../../types';

const { width: W } = Dimensions.get('window');

export default function ViewProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { profile } = route.params as { profile: Profile };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Photos */}
        <ScrollView horizontal pagingEnabled style={{ height: W * 1.2 }} showsHorizontalScrollIndicator={false}>
          {profile.photos.map((photo, i) => (
            <Image key={i} source={{ uri: photo }} style={{ width: W, height: W * 1.2 }} resizeMode="cover" />
          ))}
        </ScrollView>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.verifiedText}>{profile.verified === 'id' ? 'ID Verified' : 'Verified'}</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.location}>{profile.city} · {profile.distance}km away</Text>
          </View>
          <Text style={styles.bio}>{profile.bio}</Text>
          <View style={styles.interests}>
            {profile.interests.map((i) => (
              <View key={i} style={styles.chip}><Text style={styles.chipText}>{i}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  info: { padding: Spacing.xl },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, flex: 1 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.success + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.full },
  verifiedText: { fontSize: FontSize.xs, color: Colors.success, fontWeight: FontWeight.semibold },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.md },
  location: { fontSize: FontSize.md, color: Colors.textSecondary },
  bio: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.lg },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: { backgroundColor: Colors.card, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: Colors.border },
  chipText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  backBtn: { position: 'absolute', top: 50, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
});
