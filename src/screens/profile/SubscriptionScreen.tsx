import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { SubscriptionPlan } from '../../types';

const PLANS = [
  {
    id: 'free' as SubscriptionPlan,
    name: 'Free',
    price: '$0',
    period: 'forever',
    emoji: '🔥',
    color: Colors.textMuted,
    perks: ['10 likes/day', 'Basic filters', 'Match & chat'],
  },
  {
    id: 'gold' as SubscriptionPlan,
    name: 'Spark Gold',
    price: '$2.99',
    period: '/month',
    emoji: '⭐',
    color: Colors.gold,
    popular: true,
    perks: ['Unlimited likes', 'See who liked you', 'Rewind last swipe', '5 AI icebreakers/day', 'No ads'],
  },
  {
    id: 'platinum' as SubscriptionPlan,
    name: 'Spark Platinum',
    price: '$6.99',
    period: '/month',
    emoji: '💎',
    color: Colors.verified,
    perks: ['Everything in Gold', 'AI conversation coach', 'Priority matching', 'Passport mode (West Africa)', 'Unlimited AI icebreakers'],
  },
];

const PAYMENT_METHODS = [
  { name: 'MTN Mobile Money', emoji: '🟡', color: '#FFD700' },
  { name: 'Orange Money', emoji: '🟠', color: '#FF6600' },
  { name: 'Paystack (Card)', emoji: '💳', color: '#00C3F7' },
];

export default function SubscriptionScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { profile, upgradePlan } = useAuthStore();
  const [selected, setSelected] = React.useState<SubscriptionPlan>('gold');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 100 }}>
        <Text style={styles.title}>Choose your plan</Text>
        <Text style={styles.subtitle}>Pay with Mobile Money — no credit card needed</Text>

        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planCard, selected === plan.id && styles.planCardActive, selected === plan.id && { borderColor: plan.color }]}
            onPress={() => setSelected(plan.id)}
            activeOpacity={0.8}
          >
            {plan.popular && (
              <View style={[styles.popularBadge, { backgroundColor: plan.color }]}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planEmoji}>{plan.emoji}</Text>
              <View style={styles.planMeta}>
                <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>
              {selected === plan.id && (
                <Ionicons name="checkmark-circle" size={24} color={plan.color} />
              )}
            </View>
            <View style={styles.perksList}>
              {plan.perks.map((perk) => (
                <View key={perk} style={styles.perk}>
                  <Ionicons name="checkmark" size={14} color={Colors.success} />
                  <Text style={styles.perkText}>{perk}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Payment methods */}
        <Text style={styles.paymentTitle}>💳 Pay with</Text>
        <View style={styles.paymentMethods}>
          {PAYMENT_METHODS.map((pm) => (
            <TouchableOpacity key={pm.name} style={styles.paymentMethod}>
              <Text style={styles.paymentEmoji}>{pm.emoji}</Text>
              <Text style={styles.paymentName}>{pm.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.momoNote}>🔒 Payments secured via Mobile Money PIN. Cancel anytime.</Text>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => { upgradePlan(selected); navigation.goBack(); }}
        >
          <LinearGradient
            colors={selected === 'free' ? [Colors.card, Colors.card] : Gradients.primary as any}
            style={styles.ctaBtnGradient}
          >
            <Text style={styles.ctaBtnText}>
              {selected === 'free' ? 'Continue with Free' : `Get ${PLANS.find((p) => p.id === selected)?.name}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl },
  planCard: { backgroundColor: Colors.card, borderRadius: Radius.xl, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 2, borderColor: Colors.border, position: 'relative', overflow: 'hidden' },
  planCardActive: { backgroundColor: Colors.surface },
  popularBadge: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 12, paddingVertical: 4, borderBottomLeftRadius: Radius.md },
  popularText: { color: '#000', fontSize: FontSize.xs, fontWeight: FontWeight.black },
  planHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  planEmoji: { fontSize: 32 },
  planMeta: { flex: 1 },
  planName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, marginBottom: 2 },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  planPrice: { fontSize: FontSize.xl, fontWeight: FontWeight.black, color: Colors.text },
  planPeriod: { fontSize: FontSize.sm, color: Colors.textMuted },
  perksList: { gap: Spacing.xs },
  perk: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  perkText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  paymentTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.md },
  paymentMethods: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  paymentMethod: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Colors.border },
  paymentEmoji: { fontSize: 24 },
  paymentName: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center' },
  momoNote: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center' },
  cta: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.border },
  ctaBtn: { borderRadius: Radius.full, overflow: 'hidden' },
  ctaBtnGradient: { paddingVertical: 18, alignItems: 'center' },
  ctaBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
});
