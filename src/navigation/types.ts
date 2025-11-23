import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';

export type AppTabParamList = {
  HomeTab: undefined;
  MaterialTab: undefined;
  BadgeTab: undefined;
  ConfigTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  AppTabs: {screen: keyof AppTabParamList; params?: any} | undefined;
  Quiz: { areaId: string};
  Curso: { areaId: string};
  Material: undefined;
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type MaterialProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'MaterialTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type CursoProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'Curso'>;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type QuizProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
};