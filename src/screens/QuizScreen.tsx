import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, ActivityIndicator, Alert } from 'react-native';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/quiz.styles';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { QuizProps } from '../navigation/types';

interface OptionButtonProps {
    option: string;
    onPress: () => void;
    currentTheme: typeof theme.light;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, onPress, currentTheme }) => (
    <TouchableOpacity
        style={[styles.optionButton, { 
            backgroundColor: currentTheme.inputBackground,
            borderColor: currentTheme.inputPlaceholder,
        }]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text style={[styles.optionText, { color: currentTheme.text }]}>
            {option}
        </Text>
    </TouchableOpacity>
);

export function QuizScreen({ navigation, route }: QuizProps) {

  const { areaId } = route.params; 

  const {
    loading,
    quizFinished,
    currentQuestion,
    currentQuestionIndex,
    questionsCount,
    score,
    handleAnswer,
    result,
  } = useQuizLogic(areaId); 

  const deviceTheme = useColorScheme();
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleQuizFinish = useCallback(() => {
      Alert.alert(
          'Quiz Concluído!',
          `Você acertou ${result.finalScore} de ${result.totalQuestions} questões!`,
          [
              { 
                  text: 'Ver Badges', 
                  onPress: () => navigation.navigate('AppTabs', { screen: 'BadgeTab' }) 
              },
              { 
                  text: 'Voltar para o Início', 
                  onPress: () => navigation.navigate('AppTabs', { screen: 'HomeTab' }) 
              },
          ]
      );
  }, [navigation, result]);
  
  useEffect(() => {
      if (quizFinished) {
          handleQuizFinish();
      }
  }, [quizFinished, handleQuizFinish]);

  if (loading) {
    return (
      <View style={[styles.feedbackContainer, { backgroundColor: currentTheme.background }]}>
        <ActivityIndicator size="large" color={currentTheme.buttonBackground} />
        <Text style={{ color: currentTheme.text, marginTop: 10 }}>Carregando Quiz...</Text>
      </View>
    );
  }

  if (quizFinished) {
      return (
        <View style={[styles.feedbackContainer, { backgroundColor: currentTheme.background }]}>
            <Text style={[styles.quizFinishedText, { color: currentTheme.text }]}>
                Quiz finalizado! 
            </Text>
            <Text style={{ color: currentTheme.text, fontSize: 16 }}>
                Pontuação: {result.finalScore}/{result.totalQuestions}
            </Text>
        </View>
      );
  }

  if (!currentQuestion) {
      return (
        <View style={[styles.feedbackContainer, { backgroundColor: currentTheme.background }]}>
            <Text style={[styles.errorText, { color: 'red' }]}>
                Nenhuma questão encontrada para esta área.
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Voltar</Text>
            </TouchableOpacity>
        </View>
      );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        
        <View style={styles.progressContainer}>
            <Text style={[styles.progressText, { color: currentTheme.text }]}>
                Pergunta {currentQuestionIndex + 1} de {questionsCount}
            </Text>
            <Text style={[styles.scoreText, { color: currentTheme.text }]}>
                Pontos: {score}
            </Text>
        </View>

        <View style={styles.content}>
            
            <View style={styles.questionContainer}>
                <Text style={[styles.questionText, { color: currentTheme.text }]}>
                    {currentQuestion.pergunta}
                </Text>
            </View>

            <View style={styles.optionsList}>
                {currentQuestion.opcoes.map((option, index) => (
                    <OptionButton
                        key={index}
                        option={option}
                        onPress={() => handleAnswer(option)}
                        currentTheme={currentTheme}
                    />
                ))}
            </View>
        </View>
    </SafeAreaView>
  );
}