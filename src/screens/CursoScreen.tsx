import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, useColorScheme, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/curso.styles';
import { AreaAtuacao } from '../types';
import { areaService } from '../services/areaService';
import { CursoProps } from '../navigation/types';

interface ModuleCardProps {
    title: string;
    description: string;
    isCompleted: boolean;
    onPress: () => void;
    currentTheme: typeof theme.light;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, isCompleted, onPress, currentTheme }) => (
    <TouchableOpacity
        style={[styles.moduleCard, 
            { backgroundColor: currentTheme.inputBackground, opacity: isCompleted ? 1 : 0.8 } ]}
        onPress={onPress}
        disabled={isCompleted}
    >
        <View style={styles.cardHeader}>
            <Text style={[styles.moduleTitle, { color: currentTheme.text }]}>{title}</Text>
            {isCompleted && <Feather name="check-circle" size={20} color="green" />}
        </View>
        <Text style={[styles.moduleDescription, { color: currentTheme.inputPlaceholder }]}>
            {description}
        </Text>
        <Text style={[styles.statusText, { color: isCompleted ? 'green' : currentTheme.inputPlaceholder }]}>
            {isCompleted ? 'FEITO' : 'CLIQUE PARA LER'}
        </Text>
    </TouchableOpacity>
);

export function CursoScreen({ navigation, route }: CursoProps) {

  const { areaId } = route.params;
  const insets = useSafeAreaInsets();

  const [areaData, setAreaData] = useState<AreaAtuacao | null>(null);
  const [loading, setLoading] = useState(true);

  const [modules, setModules] = useState([
    { id: 1, title: 'Funções Administrativas', desc: 'Planejamento, Organização, Direção e Controle', isCompleted: false },
    { id: 2, title: 'Áreas de Gestão', desc: 'Financeira, Marketing, Logística, Estratégica, entre outros', isCompleted: false },
    { id: 3, title: 'Habilidades Comportamentais', desc: 'Liderança, Comunicação e Pensamento crítico', isCompleted: false },
    { id: 4, title: 'Habilidades Técnicas', desc: 'Análise de dados e Ferramentas digitais', isCompleted: false },
  ]);
  
  const allModulesCompleted = modules.every(m => m.isCompleted);

  const deviceTheme = useColorScheme();
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const STORAGE_KEY = `@App:progress:${areaId}`;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const data = await areaService.getById(areaId);
        setAreaData(data || null);

        const storedProgress = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedProgress) {
          const completedIds: number[] = JSON.parse(storedProgress);
          setModules(prev => prev.map(m => completedIds.includes(m.id) ? { ...m, isCompleted: true } : m ));
        }

      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar o material');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [areaId]);

  const handleModulePress = (id: number) => {
    Alert.alert( 'Conteúdo Lido', `Simulando a leitura do módulo ${id}.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Concluir', onPress: async () => {
            const newModules = modules.map(m => m.id === id ? { ...m, isCompleted: true } : m);
            setModules(newModules);

            try {
              const completedIds = newModules.filter(m => m.isCompleted).map(m => m.id);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
            } catch (error) {
              console.error('Erro ao salvar o progresso', error);
            }
          }} 
        ]
    );
  };
  
  const handleQuizPress = useCallback(() => {
    if (allModulesCompleted) {
        navigation.navigate('Quiz', { areaId: areaId });
    } else {
        Alert.alert('Quiz Bloqueado', 'Você deve completar todos os módulos antes de iniciar o quiz!');
    }
  }, [allModulesCompleted, navigation, areaId]);

  if (loading || !areaData) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: currentTheme.background }]}>
        <ActivityIndicator size="large" color={currentTheme.buttonBackground} />
        <Text style={{ color: currentTheme.text, marginTop: 10 }}>Carregando {areaId}...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

      <View style={[styles.fixedHeader, {backgroundColor: currentTheme.buttonBackground, borderBottomColor: currentTheme.inputBackground, paddingTop: insets.top, height: 60 + insets.top}]}>
        
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {areaData.nome.toUpperCase()}
        </Text>

        <View style={{ width: 24 }} />
      </View>

        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 80 + insets.top }]} showsVerticalScrollIndicator={false}>

            {modules.map(module => (
                <ModuleCard
                    key={module.id}
                    title={module.title}
                    description={module.desc}
                    isCompleted={module.isCompleted}
                    onPress={() => handleModulePress(module.id)}
                    currentTheme={currentTheme}
                />
            ))}

            <TouchableOpacity style={[ styles.quizButton,
                    { 
                      backgroundColor: allModulesCompleted ? currentTheme.buttonBackground : currentTheme.inputPlaceholder, 
                      opacity: allModulesCompleted ? 1 : 0.7 
                    }
                ]} onPress={handleQuizPress} disabled={!allModulesCompleted}>

                <Text style={[styles.quizButtonText, { color: allModulesCompleted ? currentTheme.buttonText : currentTheme.text }]}>
                    Quiz - Conteúdo Básico
                </Text>
                <Feather name={(allModulesCompleted ? "unlock" : "lock") as any} size={20} color={allModulesCompleted ? currentTheme.buttonText : currentTheme.text}/>
            </TouchableOpacity>

        </ScrollView>
    </View>
  );
}