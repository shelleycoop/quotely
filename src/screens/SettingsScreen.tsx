import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { fonts, radius } from '../theme';
import type { ThemePreference } from '../types';
import type { SettingsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;

const THEMES: { id: ThemePreference; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Paper' },
  { id: 'dark', label: 'Ink' },
];

export function SettingsScreen({ navigation }: Props) {
  const { colors, themePreference, setThemePreference, reminderOn, setReminderOn } = useApp();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.ink }]}>Settings</Text>
        <Text style={[styles.section, { color: colors.muted }]}>Appearance</Text>
        <View style={[styles.segment, { backgroundColor: colors.card, borderColor: colors.line }]}>
          {THEMES.map((item) => {
            const active = themePreference === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setThemePreference(item.id)}
                style={[
                  styles.segmentItem,
                  active && { backgroundColor: colors.accent },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    { color: active ? colors.onAccent : colors.ink },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>Reminders</Text>
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.line }]}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={[styles.rowTitle, { color: colors.ink }]}>Daily quote at 8:00</Text>
            <Text style={[styles.rowBody, { color: colors.muted }]}>
              A single morning notification. Nothing else. You can turn it off any time.
            </Text>
          </View>
          <Switch
            value={reminderOn}
            onValueChange={async (value) => {
              const ok = await setReminderOn(value);
              if (value && !ok) {
                Alert.alert(
                  'Notifications blocked',
                  'Allow notifications for Quotely in system settings to receive the daily quote.',
                );
              }
            }}
            trackColor={{ false: colors.line, true: colors.accent }}
            thumbColor={colors.card}
          />
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>About</Text>
        <Pressable
          onPress={() => navigation.navigate('Privacy')}
          style={[styles.row, { backgroundColor: colors.card, borderColor: colors.line }]}
        >
          <Text style={[styles.rowTitle, { color: colors.ink }]}>Privacy policy</Text>
        </Pressable>
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.line }]}>
          <View>
            <Text style={[styles.rowTitle, { color: colors.ink }]}>Quotely {version}</Text>
            <Text style={[styles.rowBody, { color: colors.muted }]}>
              Offline quotes. No account. No ads. Made to be opened once and kept nearby.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  title: { fontFamily: fonts.serifBold, fontSize: 34, marginBottom: 8 },
  section: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 10,
  },
  segment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 4,
    gap: 4,
  },
  segmentItem: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: { fontFamily: fonts.sansMedium, fontSize: 14 },
  row: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowTitle: { fontFamily: fonts.sansSemi, fontSize: 16 },
  rowBody: { fontFamily: fonts.sans, fontSize: 13, marginTop: 4, lineHeight: 19 },
});
