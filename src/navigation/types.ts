import type { NavigatorScreenParams } from '@react-navigation/native';
import type { CategoryId } from '../types';

export type ExploreStackParamList = {
  ExploreHome: undefined;
  Category: { categoryId: CategoryId };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  Privacy: undefined;
};

export type RootTabParamList = {
  Today: undefined;
  Explore: NavigatorScreenParams<ExploreStackParamList>;
  Favorites: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};
