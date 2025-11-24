import { useState, useEffect, useCallback } from 'react';

import { QuestaoQuiz, RespostaUsuario } from '../types';
import { quizService } from '../services/quizService';

export function useQuizLogic(areaId: string) {
  const [questions, setQuestions] = useState<QuestaoQuiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<RespostaUsuario[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const quizQuestions = await quizService.getQuizByAreaId(areaId); 
        setQuestions(quizQuestions);
      } catch (error) {
        console.error("Falha ao carregar quiz:", error);
      } finally {
        setLoading(false);
      }
    }
    if (areaId) {
      loadQuiz();
    }
  }, [areaId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = useCallback((selectedOption: string) => {
    if (quizFinished || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.respostaCorreta;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const newResponse: RespostaUsuario = {
      perguntaId: currentQuestion.id,
      respostaSelecionada: selectedOption,
      estaCorreta: isCorrect,
    };
    setResponses(prev => [...prev, newResponse]);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizFinished(true);
    }
  }, [currentQuestionIndex, questions, currentQuestion, quizFinished]);

  const result = {
    totalQuestions: questions.length,
    finalScore: score,
    percentage: questions.length > 0 ? (score / questions.length) * 100 : 0,
  };

  return {
    loading,
    quizFinished,
    currentQuestion,
    currentQuestionIndex,
    questionsCount: questions.length,
    score,
    handleAnswer,
    result,
  };
}