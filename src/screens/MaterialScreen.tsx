import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/material.styles';
import { useFetchAreas } from '../hooks/useFetchAreas';
import { AreaAtuacao } from '../types/index';
import { MaterialProps } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

interface AreaCardProps {
    area: AreaAtuacao;
    onPress: (area: AreaAtuacao) => void;
    currentTheme: typeof theme.light;
}

const AreaCard: React.FC<AreaCardProps> = ({ area, onPress, currentTheme }) => (
    <TouchableOpacity
        style={[styles.cardContainer, { 
            backgroundColor: currentTheme.inputBackground,
            borderColor: currentTheme.inputPlaceholder 
        }]}
        onPress={() => onPress(area)}
    >
        <Feather name={area.icone as any} size={24} color={currentTheme.text} style={styles.cardIcon} />
        <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
                {area.nome}
            </Text>
            <Text style={[styles.cardDescription, { color: currentTheme.inputPlaceholder }]}>
                {area.descricao}
            </Text>
        </View>
        <Feather name="chevron-right" size={24} color={currentTheme.inputPlaceholder} />
    </TouchableOpacity>
);


export function MaterialScreen({ navigation }: MaterialProps) {

  const { areas, loading, error, reload } = useFetchAreas(true); 
  
  const { theme: currentTheme } = useTheme();
  
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const handleAreaPress = useCallback((area: AreaAtuacao) => {
    navigation.navigate('Curso', { areaId: area.id });
  }, [navigation]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="large" color={currentTheme.buttonBackground} />
          <Text style={{ color: currentTheme.text, marginTop: 10 }}>Carregando...</Text>
        </View>
      );
    }

    if(areas.length === 0) {
      return (
        <View style={styles.feedbackContainer}>
          <Feather name="inbox" size={48} color={currentTheme.inputPlaceholder} />
          <Text style={[styles.errorText, { color: currentTheme.text, marginTop: 10 }]}>
            Nenhuma área selecionada.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AreaSelection', { isOnboarding: false })}>
            <Text style={styles.reloadButton}>Ir para Configurações</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.errorText, { color: 'red' }]}>
            Erro: {error}
          </Text>
          <TouchableOpacity onPress={reload}>
            <Text style={styles.reloadButton}>Tentar Recarregar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={areas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AreaCard area={item} onPress={handleAreaPress} currentTheme={currentTheme} />
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
            Suas Áreas de Atuação
        </Text>
      {renderContent()}
    </SafeAreaView>
  );
}