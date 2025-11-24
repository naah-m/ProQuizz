import React from 'react';
import { useColorScheme, Platform, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';

import { LoginScreen } from '../screens/LoginScreen';
import { CadastroScreen } from '../screens/CadastroScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MaterialScreen } from '../screens/MaterialScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { CursoScreen } from '../screens/CursoScreen';
import { ConfigScreen } from '../screens/ConfigScreen';
import { BadgeScreen } from '../screens/BadgeScreen';
import { AreaSelectionScreen } from '../screens/AreaSelectionScreen';

import { RootStackParamList, AppTabParamList } from './types';
import { useAuth } from '../context/AuthContext';
import { theme } from '../styles/theme/colors';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Cadastro' component={CadastroScreen} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: currentTheme.buttonBackground,
        tabBarInactiveTintColor: currentTheme.inputPlaceholder,
        tabBarStyle: {
            backgroundColor: currentTheme.background, 
            borderTopColor: currentTheme.inputBackground, 
            height: Platform.OS === 'ios' ? 90 : 60,
        },
        tabBarIcon: ({ color, size }) => {
            let iconName: string;
            
            switch (route.name) {
                case 'HomeTab':
                    iconName = 'home';
                    break;
                case 'MaterialTab':
                    iconName = 'bookmark';
                    break;
                case 'BadgeTab':
                    iconName = 'award';
                    break;
                case 'ConfigTab':
                    iconName = 'settings';
                    break;
                default:
                    iconName = 'alert-circle';
            }
            return <Feather name={iconName as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Início' }}
      />
      <Tab.Screen 
        name="MaterialTab" 
        component={MaterialScreen} 
        options={{ tabBarLabel: 'Materiais' }}
      />
      <Tab.Screen 
        name="BadgeTab" 
        component={BadgeScreen as any} 
        options={{ tabBarLabel: 'Badges' }}
      />
      <Tab.Screen 
        name="ConfigTab" 
        component={ConfigScreen as any} 
        options={{ tabBarLabel: 'Config' }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name='AppTabs' component={AppTabs} />
      <Stack.Screen name='Quiz' component={QuizScreen} />
      <Stack.Screen name='Curso' component={CursoScreen} />
      <Stack.Screen name='AreaSelection' component={AreaSelectionScreen} />
    </Stack.Navigator>
  )
}

export function Routes() {
  const { user, loading } = useAuth();

  const { theme: currentTheme, isDarkMode } = useTheme();
  const navTheme = isDarkMode ? DarkTheme : DefaultTheme;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme.background }}>
        <ActivityIndicator size="large" color={currentTheme.text} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      { user ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}