import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../styles/theme/colors';
import { useFetchAreas } from '../hooks/useFetchAreas';
import { AreaAtuacao } from '../types';
import { AreaSelectionProps } from '../navigation/types';

export function AreaSelectionScreen({ navigation, route }: AreaSelectionProps) {
  const { isOnboarding } = route.params || {};
  
  const insets = useSafeAreaInsets();
  const { areas, loading, error } = useFetchAreas();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const currentTheme = theme.light; 

  useEffect(() => {
    async function loadSavedPreferences() {
      try {
        const saved = await AsyncStorage.getItem('@App:affinityAreas');
        if (saved) {
          setSelectedIds(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Erro ao carregar preferências', e);
      }
    }
    loadSavedPreferences();
  }, []);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleSave = async () => {
    if (selectedIds.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos uma área de interesse.');
      return;
    }

    try {
      setSaving(true);
      await AsyncStorage.setItem('@App:affinityAreas', JSON.stringify(selectedIds));

      if (isOnboarding) {
        await AsyncStorage.setItem('@App:onboardingComplete', 'true');
        navigation.replace('AppTabs', { screen: 'MaterialTab' });
      } else {
        Alert.alert('Sucesso', 'Suas preferências foram atualizadas!');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar suas escolhas.');
    } finally {
      setSaving(false);
    }
  };

  const renderItem = ({ item }: { item: AreaAtuacao }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
        <TouchableOpacity
            style={[
                styles.card,
                { 
                    backgroundColor: isSelected ? currentTheme.inputBackground : currentTheme.background,
                    borderColor: isSelected ? currentTheme.buttonBackground : currentTheme.inputPlaceholder,
                }
            ]}
            onPress={() => toggleSelection(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <Feather name={item.icone as any} size={24} color={currentTheme.text} />
                {isSelected && <Feather name="check-circle" size={24} color="green" />}
            </View>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>{item.nome}</Text>
            <Text style={[styles.cardDesc, { color: currentTheme.inputPlaceholder }]}>
                {item.descricao}
            </Text>
        </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <StatusBar barStyle="dark-content" />
        
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            {!isOnboarding && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={currentTheme.text} />
                </TouchableOpacity>
            )}
            <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
                {isOnboarding ? 'O que te interessa?' : 'Áreas de Afinidade'}
            </Text>
            <Text style={[styles.headerSubtitle, { color: currentTheme.inputPlaceholder }]}>
                Selecione as áreas que você deseja explorar.
            </Text>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color={currentTheme.buttonBackground} style={{ marginTop: 50 }} />
        ) : (
            <FlatList
                data={areas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        )}

        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: currentTheme.buttonBackground }]}
                onPress={handleSave}
                disabled={saving}
            >
                <Text style={[styles.saveButtonText, { color: currentTheme.buttonText }]}>
                    {saving ? 'SALVANDO...' : (isOnboarding ? 'CONTINUAR' : 'SALVAR ALTERAÇÕES')}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 24, marginBottom: 10 },
    backButton: { marginBottom: 10 },
    headerTitle: { fontSize: 28, fontWeight: 'bold' },
    headerSubtitle: { fontSize: 16, marginTop: 8 },
    listContent: { paddingHorizontal: 24, paddingBottom: 120 },
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 12,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    cardDesc: { fontSize: 14 },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: 'rgba(255,255,255,0.9)', 
    },
    saveButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }
});