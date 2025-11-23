import { QuestaoQuiz } from '../types';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_QUIZ: QuestaoQuiz[] = [
  {
    id: 'q1',
    areaId: '1',
    pergunta: 'Qual linguagem é a base fundamental para o desenvolvimento web front-end?',
    opcoes: ['Python', 'Java', 'JavaScript', 'C#'],
    respostaCorreta: 'JavaScript',
  },
  {
    id: 'q2',
    areaId: '1',
    pergunta: 'O que significa a sigla CRUD em bancos de dados?',
    opcoes: ['Create, Read, Update, Delete', 'Control, Return, Update, Delete', 'Connect, Retrieve, Upload, Drop', 'Cache, Run, Upload, Deploy'],
    respostaCorreta: 'Create, Read, Update, Delete',
  },
  {
    id: 'q3',
    areaId: '1',
    pergunta: 'Qual framework React Native utiliza para criação de apps multi-plataforma?',
    opcoes: ['Angular', 'Vue.js', 'Expo', 'Next.js'],
    respostaCorreta: 'Expo',
  },
];

export const quizService = {
  getQuizByAreaId: async (areaId: string): Promise<QuestaoQuiz[]> => {
    await delay(800);

    if (areaId) {
      return MOCK_QUIZ;
    }
    return [];
  },
};