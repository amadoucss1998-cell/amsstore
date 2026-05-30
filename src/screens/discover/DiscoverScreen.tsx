import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppTabParamList, User } from '../../types';
import { MOCK_PROFILES } from '../../data/mockProfiles';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

const { width: W } = Dimensions.get('window');
const ITEM_SIZE = (W - Spacing['5'] * 2 - 8) / 2;

const FILTER_TABS = ['All', 'Near me', 'Online', 'New'];

type Props = { navigation: NativeStackNavigationProp<AppTabParamList, 'Discover'> };

export const DiscoverScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const filtered = MOCK_PROFILES.filter((p) => {
    const matchSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.occupation.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchFilter =
      activeFilter === 'All' ? true :
      activeFilter === 'Near me' ? p.distance <= 5 :
      activeFilter === 'Online' ? true :
      true;
    return matchSearch && matchFilter;
  });

  const renderProfile = ({ item, index }: { item: User; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        style={[
          styles.profileCard,
          index % 2 === 0 ? styles.cardLeft : styles.cardRight,
          index % 4 < 2 ? styles.cardShort : styles.cardTall,
        ]}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.photos[0] }} style={styles.profileImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{item.name.split(' ')[0]}, {item.age}</Text>
          <Text style={styles.profileDistance}>📍 {item.distance}mi</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapIcon}>🗺️</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or job..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterTab,
              activeFilter === tab && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(tab)}
          >
            {activeFilter === tab ? (
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.filterTabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.filterTabTextActive}>{tab}</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.filterTabText}>{tab}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No profiles found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
    paddingVertical: Spacing['4'],
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.white },
  mapButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center', justifyContent: 'center',
  },
  mapIcon: { fontSize: 18 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing['5'],
    paddingHorizontal: Spacing['4'],
    marginBottom: Spacing['4'],
    borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: Colors.textPrimary },
  clearIcon: { fontSize: 14, color: Colors.textMuted, padding: 4 },
  filterRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: Spacing['5'],
    marginBottom: Spacing['4'],
  },
  filterTab: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1, borderColor: Colors.border,
  },
  filterTabActive: { borderColor: 'transparent' },
  filterTabGradient: { paddingVertical: 8, paddingHorizontal: 16 },
  filterTabText: { fontSize: 13, color: Colors.textMuted, fontWeight: '600', paddingVertical: 8, paddingHorizontal: 16 },
  filterTabTextActive: { fontSize: 13, color: Colors.white, fontWeight: '700' },
  grid: { paddingHorizontal: Spacing['5'], paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 8 },
  profileCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    position: 'relative',
  },
  cardLeft: { width: ITEM_SIZE },
  cardRight: { width: ITEM_SIZE },
  cardShort: { height: ITEM_SIZE * 1.2 },
  cardTall: { height: ITEM_SIZE * 1.5 },
  profileImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  verifiedBadge: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: Colors.accentBlue,
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  verifiedText: { color: Colors.white, fontSize: 11, fontWeight: '800' },
  profileInfo: { position: 'absolute', bottom: 10, left: 10, right: 10 },
  profileName: { fontSize: 14, fontWeight: '700', color: Colors.white, marginBottom: 2 },
  profileDistance: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 18, fontWeight: '600', color: Colors.textSecondary },
});
