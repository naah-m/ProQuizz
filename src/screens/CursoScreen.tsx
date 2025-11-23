import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, ScrollView, Alert, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    async function fetchArea() {
      try {
        const data = await areaService.getById(areaId);
        setAreaData(data || null);
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar o material');
      } finally {
        setLoading(false);
      }
    }
    fetchArea();
  }, [areaId]);

  const handleModulePress = (id: number) => {
    Alert.alert( 'Conteúdo Lido', `Simulando a leitura do módulo ${id}.`,
        [
            { text: 'Concluir', onPress: () => { setModules(prev => prev.map(m => m.id === id ? { ...m, isCompleted: true } : m) ); }}
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
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

            <View style={[styles.areaHeader, { backgroundColor: currentTheme.buttonBackground }]}>
                <Text style={styles.areaTitle}>
                    {areaData.nome.toUpperCase()}
                </Text>
            </View>

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

            <TouchableOpacity
                style={[
                    styles.quizButton,
                    { 
                        backgroundColor: allModulesCompleted ? currentTheme.buttonBackground : currentTheme.inputPlaceholder,
                        opacity: allModulesCompleted ? 1 : 0.7
                    }
                ]}
                onPress={handleQuizPress}
                disabled={!allModulesCompleted}
            >
                <Text style={[styles.quizButtonText, { color: allModulesCompleted ? currentTheme.buttonText : currentTheme.text }]}>
                    Quiz - Conteúdo Básico
                </Text>
                <Feather 
                    name={(allModulesCompleted ? "lock-open" : "lock") as any} 
                    size={20} 
                    color={allModulesCompleted ? currentTheme.buttonText : currentTheme.text} 
                />
            </TouchableOpacity>

        </ScrollView>
    </SafeAreaView>
  );
}