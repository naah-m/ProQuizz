import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../styles/theme/colors';
import { useAuth } from '../context/AuthContext';
import { HomeProps } from '../navigation/types';
import { styles } from '../styles/home.styles';

export function HomeScreen({ navigation }: HomeProps) {

    const { user, signOut } = useAuth();
    const [loadingState, setLoadingState] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(false); 

    const deviceTheme = useColorScheme();
    const isDarkMode = deviceTheme === 'dark';
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    useEffect(() => {
      checkOnboardingStatus();
    }, []);

    const checkOnboardingStatus =  async () => {
      try {
        setLoadingState(true);
        const value = await AsyncStorage.getItem('@App:onboardingComplete');
        if (value === null) {
          setIsFirstTime(true);
        } else {
          setIsFirstTime(false);
        }
      } catch (e) {
        console.log('Erro ao verificar ', e);
      } finally {
        setLoadingState(false);
      }
    };

    const handleMainButton = useCallback(async () => {
    if (isFirstTime) {
      try {
        await AsyncStorage.setItem('@App.onboardingComplete', 'true');
        setIsFirstTime(false);
        Alert.alert('Bem-vindo!', 'Vamos começar escolhendo sua trilha');
        navigation.navigate('AppTabs', { screen: 'MaterialTab'});

      } catch (e) {
        Alert.alert('Não foi possível salvar seu progresso');
      } 
      
    } else {
        Alert.alert('Bem-vindo de volta!', 'Te levando para seu último conteúdo');
        navigation.navigate('AppTabs', { screen: 'MaterialTab'});
      }
    }, [navigation, isFirstTime]);

    if (loadingState) {
      return (
        <View style={[styles.container, { backgroundColor: currentTheme.background, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={currentTheme.buttonBackground}/>
        </View>
      );
    }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.content}>

        <Text style={[styles.headerText, { color: currentTheme.text }]}>
          Bem Vindo{' '}
          <Text style={styles.nicknameText}>
            {user?.apelido || 'Usuário'}! 
          </Text>
        </Text>

        <View style={[ styles.instructionCard, { backgroundColor: currentTheme.inputBackground } ]}>
          <Text style={[styles.instructionText, { color: currentTheme.text }]}>
            {isFirstTime 
              ? "Como é sua primeira vez, vamos mapear suas áreas de interesse para sugerir o melhor caminho!"
              : "Continue sua jornada de aprendizado e conquiste novas badges hoje mesmo."
            }
          </Text>
        </View>

        <TouchableOpacity style={[styles.circularButton, { backgroundColor: currentTheme.buttonBackground }]} onPress={handleMainButton}>
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            {isFirstTime ? 'VAMOS COMEÇAR!' : 'CONTINUAR JORNADA'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ async () => {
          await AsyncStorage.removeItem('@App:onboardingComplete');
          setIsFirstTime(true);
          Alert.alert('Dev Mode', 'Onboarding resetado! O app acha que é sua primeira vez.');
        }} style={{ marginTop: 40 }}>
            <Text style={{ color: currentTheme.text, fontSize: 12 }}>
                (Resetar Primeira Vez - DEV ONLY)
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut} style={{ marginTop: 20 }}>
            <Text style={{ color: currentTheme.text }}>
                Sair (Logout)
            </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}