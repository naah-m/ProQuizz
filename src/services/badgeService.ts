import { Badge } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_ALL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    nome: 'Explorador Júnior',
    descricao: 'Completou seu primeiro material de orientação.',
    criterio: 1, 
    icone: 'book-open',
  },
  {
    id: 'badge-2',
    nome: 'Mestre em T.I.',
    descricao: 'Acertou 3/3 no Quiz de Tecnologia.',
    criterio: 3, 
    icone: 'code',
  },
  {
    id: 'badge-3',
    nome: 'Caminho Certo',
    descricao: 'Completou a primeira trilha de carreira (Quiz e Material).',
    criterio: 1, 
    icone: 'navigation',
  },
  {
    id: 'badge-4',
    nome: 'Visão Global',
    descricao: 'Conquistou dois badges',
    criterio: 2, 
    icone: 'star',
  },
];

const MOCK_USER_BADGES_IDS = ['badge-1', 'badge-3'];

export const badgeService = {
  getBadges: async (): Promise<{ all: Badge[], userIds: string[] }> => {
    await delay(700); 
    return {
      all: MOCK_ALL_BADGES,
      userIds: MOCK_USER_BADGES_IDS,
    };
  },
};