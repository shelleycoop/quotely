import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TodayScreen } from '../screens/TodayScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { useApp } from '../context/AppContext';
import { fonts } from '../theme';
import type {
  ExploreStackParamList,
  RootTabParamList,
  SettingsStackParamList,
} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function ExploreNavigator() {
  const { colors } = useApp();
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.ink,
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { fontFamily: fonts.sansSemi, fontSize: 16 },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <ExploreStack.Screen
        name="ExploreHome"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <ExploreStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: '' }}
      />
    </ExploreStack.Navigator>
  );
}

function SettingsNavigator() {
  const { colors } = useApp();
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.ink,
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { fontFamily: fonts.sansSemi, fontSize: 16 },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <SettingsStack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: 'Privacy' }}
      />
    </SettingsStack.Navigator>
  );
}

export function RootNavigator() {
  const { colors, isDark } = useApp();
  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.tabBar,
      text: colors.ink,
      border: colors.line,
      primary: colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.faint,
          tabBarLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 11 },
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.line,
            height: 62,
            paddingTop: 6,
          },
          tabBarIcon: ({ color, size, focused }) => {
            const map: Record<string, keyof typeof Ionicons.glyphMap> = {
              Today: focused ? 'book' : 'book-outline',
              Explore: focused ? 'compass' : 'compass-outline',
              Favorites: focused ? 'heart' : 'heart-outline',
              Settings: focused ? 'settings' : 'settings-outline',
            };
            return <Ionicons name={map[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Explore" component={ExploreNavigator} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
