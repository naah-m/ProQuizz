import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, ScrollView, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/config.styles';
import { useAuth } from '../context/AuthContext';
import { MaterialProps } from '../navigation/types';

interface ConfigItemProps {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
    currentTheme: typeof theme.light;
}

const ConfigItem: React.FC<ConfigItemProps> = ({ title, description, icon, onPress, currentTheme }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>

        <View style={styles.itemContent}>
            <Text style={[styles.itemTitle, { color: currentTheme.text }]}>
                {title}
            </Text>

            <Text style={[styles.itemDescription, { color: currentTheme.inputPlaceholder }]}>
                {description}
            </Text>
        </View>

        <Feather name={icon as any} size={20} color={currentTheme.text} />
    </TouchableOpacity>
);


export function ConfigScreen({ navigation }: MaterialProps) {
  
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  
  const deviceTheme = useColorScheme();
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleEditApelido = useCallback(() => {
    Alert.alert('Funcionalidade', 'Implementar tela de edição de perfil.');
  }, []);

  const handleExportBadges = useCallback(() => {
    Alert.alert('Funcionalidade', 'Gerar arquivo PDF/JSON com as conquistas.');
  }, []);

  const handleThemeToggle = useCallback(() => {
    Alert.alert(
        'Alterar Tema', 
        'Aqui você poderia ter um seletor para forçar Light ou Dark, independentemente do sistema.',
        [
            { text: 'OK', style: 'cancel' }
        ]
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

        <View style={[styles.header, { backgroundColor: currentTheme.buttonBackground, paddingTop: insets.top + 20, paddingBottom: 20 }]}>
            <Text style={styles.headerText}>CONFIGURAÇÕES</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                    {user?.apelido || 'Usuário'}
                </Text>
                
                <TouchableOpacity onPress={handleEditApelido}>
                    <Feather name="edit-3" size={20} color={currentTheme.text} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionSubtitle, { color: currentTheme.inputPlaceholder }]}>
                Perfil
            </Text>
            <View style={styles.separator} />

            <ConfigItem
                title="Áreas de Afinidade"
                description="Altere as carreiras escolhidas primeiramente"
                icon="chevron-right"
                onPress={() => navigation.navigate('AreaSelection', { isOnboarding: false })}
                currentTheme={currentTheme}
            />
            
            <ConfigItem
                title="Exportar Badges"
                description="Exportar seus badges conquistados"
                icon="download"
                onPress={handleExportBadges}
                currentTheme={currentTheme}
            />
            
            <ConfigItem
                title="Exportar Certificados"
                description="Exportar certificados de cursos realizados"
                icon="download"
                onPress={() => Alert.alert('Funcionalidade', 'Gerar certificados.')}
                currentTheme={currentTheme}
            />

            <ConfigItem
                title="Alterar Tema"
                description="Atualize o tema do aplicativo"
                icon="sun" 
                onPress={handleThemeToggle}
                currentTheme={currentTheme}
            />
            
            <ConfigItem
                title="Termos e Condições"
                description="Revise nossos termos e condições"
                icon="file-text"
                onPress={() => Alert.alert('Ação', 'Abrir modal/link dos Termos.')}
                currentTheme={currentTheme}
            />

            <View>
                <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
                    <Text style={[styles.logoutText, { color: 'red' }]}>
                        Sair da Conta
                    </Text>
                    <Feather name="log-out" size={20} color='red' style={{ marginLeft: 10, marginTop: 2 }}/>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </View>
  );
}