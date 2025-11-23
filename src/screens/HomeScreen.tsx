import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, Alert, ActivityIndicator } from 'react-native';

import { theme } from '../styles/theme/colors';
import { useAuth } from '../context/AuthContext';
import { HomeProps } from '../navigation/types';
import { useFetchAreas } from '../hooks/useFetchAreas';
import { styles } from '../styles/home.styles';

export function HomeScreen({ navigation }: HomeProps) {

    const { user, signOut } = useAuth();

    const [isFirstTime, setIsFirstTime] = useState(true); 

    const { areas, loading: loadingAreas, error: areasError, reload: reloadAreas } = useFetchAreas();

    const deviceTheme = useColorScheme();
    const isDarkMode = deviceTheme === 'dark';
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const handleMainButton = useCallback(() => {
    if (isFirstTime) {
      // 🎯 Se for a primeira vez, o botão leva para a tela de seleção/material
      Alert.alert('Funcionalidade', 'Navegar para a Seleção de Áreas de Atuação!');
      //navigation.navigate('MaterialTab'); // Exemplo: Navega para a aba de Materiais
    } else {
      // 🎯 Se não for a primeira vez, leva ao último material
      Alert.alert('Funcionalidade', 'Navegar para o Último Material Aberto!');
      // Ex: navigation.navigate('Quiz', { areaId: user.lastAreaId });
    }
  }, [navigation, isFirstTime]);

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={styles.content}>

        <Text style={[styles.headerText, { color: currentTheme.text }]}>
          Bem Vindo{' '}
          <Text style={styles.nicknameText}>
            {user?.apelido || 'Usuário'}! 
          </Text>
        </Text>

        <View 
          style={[
            styles.instructionCard, 
            { backgroundColor: currentTheme.inputBackground }
          ]}
        >
          <Text style={[styles.instructionText, { color: currentTheme.text }]}>
            Explicando um pouco do aplicativo e como começar a usar
          </Text>
        </View>

        <View style={styles.dataFeedback}>
            {loadingAreas && (
                <ActivityIndicator 
                    size="large" 
                    color={currentTheme.buttonBackground} 
                />
            )}

            {areasError && (
                <View style={styles.errorContainer}>
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        {areasError}
                    </Text>
                    <TouchableOpacity onPress={reloadAreas}>
                        <Text style={styles.reloadText}>
                            Tentar Recarregar
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {!loadingAreas && !areasError && (
                <Text style={{ color: currentTheme.inputPlaceholder }}>
                    {areas.length} Áreas de Atuação Prontas!
                </Text>
            )}
        </View>

        <TouchableOpacity
          style={[styles.circularButton, { 
              backgroundColor: currentTheme.buttonBackground,
              opacity: loadingAreas ? 0.5 : 1 // Diminui a opacidade se estiver carregando
          }]}
          onPress={handleMainButton}
          disabled={loadingAreas} // Desabilita se estiver carregando
        >
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            {isFirstTime ? 'VAMOS COMEÇAR!' : 'VER ÚLTIMO MATERIAL'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut} style={{ marginTop: 20 }}>
            <Text style={{ color: currentTheme.text }}>
                (Logout para Teste)
            </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}