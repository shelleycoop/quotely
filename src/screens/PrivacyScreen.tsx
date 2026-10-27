import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { fonts } from '../theme';

export function PrivacyScreen() {
  const { colors } = useApp();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.p, { color: colors.ink }]}>
          Quotely is built to stay on your phone. We do not create accounts, and we do not run ads.
        </Text>
        <Text style={[styles.h, { color: colors.ink }]}>What stays on the device</Text>
        <Text style={[styles.p, { color: colors.muted }]}>
          Favorite quotes, theme preference, and whether the daily reminder is on are saved in
          on-device storage. They are not uploaded.
        </Text>
        <Text style={[styles.h, { color: colors.ink }]}>Notifications</Text>
        <Text style={[styles.p, { color: colors.muted }]}>
          If you enable the daily reminder, the system notification permission is used only to
          schedule one local notification each morning. We do not send remote push messages.
        </Text>
        <Text style={[styles.h, { color: colors.ink }]}>What we do not collect</Text>
        <Text style={[styles.p, { color: colors.muted }]}>
          No analytics SDK, no advertising identifier, no crash-reporting account, no location, and
          no contacts. The quote library is bundled with the app, so browsing works offline.
        </Text>
        <Text style={[styles.h, { color: colors.ink }]}>Sharing</Text>
        <Text style={[styles.p, { color: colors.muted }]}>
          If you share a quote, Android’s share sheet opens. What happens next is controlled by the
          app you choose.
        </Text>
        <Text style={[styles.h, { color: colors.ink }]}>Contact</Text>
        <Text style={[styles.p, { color: colors.muted }]}>
          Questions about this policy: privacy@quotely.app (replace with your publisher email before
          listing the app).
        </Text>
        <Text style={[styles.p, { color: colors.faint }]}>Last updated: 26 October 2026</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 36,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  h: { fontFamily: fonts.sansSemi, fontSize: 17, marginTop: 18, marginBottom: 6 },
  p: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 23 },
});
