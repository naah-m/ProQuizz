import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, FlatList, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/badge.styles';
import { useFetchBadges } from '../hooks/useFetchBadges'; 
import { MaterialProps } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

const NUM_COLUMNS = 2;

interface BadgeCardProps {
    badge: any;
    currentTheme: typeof theme.light;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, currentTheme }) => {
    const iconColor = badge.unlocked ? '#FFD700' : currentTheme.inputPlaceholder; 
    const iconName = badge.unlocked ? badge.icone : 'lock';
    
    return (
        <View 
            style={[ styles.badgeCard, { backgroundColor: currentTheme.inputBackground, opacity: badge.unlocked ? 1 : 0.4 } ]}
        >
            <Feather 
                name={iconName as any} 
                size={48} 
                color={iconColor} 
                style={{ marginBottom: 10 }}
            />
            <Text style={[styles.badgeTitle, { color: currentTheme.text }]}>
                {badge.nome}
            </Text>
            <Text style={[styles.badgeDescription, { color: currentTheme.inputPlaceholder, textAlign: 'center' }]}>
                {badge.unlocked ? badge.descricao : 'Conquiste para desbloquear.'}
            </Text>
            {badge.unlocked && (
                <Text style={styles.unlockedText}>
                    DESBLOQUEADA!
                </Text>
            )}
        </View>
    );
};

export function BadgeScreen({ }: MaterialProps) {
  
  const { badges, loading, error } = useFetchBadges(); 
  
  const { theme: currentTheme } = useTheme();

  if (loading) {
    return (
      <View style={[styles.feedbackContainer, { backgroundColor: currentTheme.background }]}>
        <ActivityIndicator size="large" color={currentTheme.buttonBackground} />
        <Text style={{ color: currentTheme.text, marginTop: 10 }}>Carregando Badges...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
            🏆 Suas Conquistas
        </Text>
        
        {error && (
            <Text style={[styles.errorText, { color: 'red' }]}>
                {error}
            </Text>
        )}

        <FlatList
            data={badges}
            keyExtractor={(item) => item.id}
            numColumns={NUM_COLUMNS} 
            renderItem={({ item }) => (
                <BadgeCard badge={item} currentTheme={currentTheme} />
            )}
            contentContainerStyle={styles.listContent}
        />

    </SafeAreaView>
  );
}