import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../context/AuthContext';
import { HomeProps } from '../navigation/types';
import { styles } from '../styles/home.styles';
import { useTheme } from '../context/ThemeContext';

export function HomeScreen({ navigation }: HomeProps) {

    const { user } = useAuth();
    const [loadingState, setLoadingState] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(false); 

    const { theme: currentTheme } = useTheme();
    
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
      navigation.navigate('AreaSelection', { isOnboarding: true });

    } else {
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

        <Text style={[styles.headerText, { color: '#C76422' }]}>
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

        <TouchableOpacity style={[styles.circularButton, { backgroundColor: '#2CA11D' }]} onPress={handleMainButton}>
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            {isFirstTime ? 'VAMOS COMEÇAR!' : 'CONTINUAR JORNADA'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}