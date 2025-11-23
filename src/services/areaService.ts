import { AreaAtuacao } from '../types/index';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_AREAS: AreaAtuacao[] = [
  {
    id: '1',
    nome: 'Tecnologia & Desenvolvimento',
    icone: 'code',
    descricao: 'Criação de softwares, apps e sistemas inteligentes.',
    conteudo: 'Material completo sobre linguagens de programação...'
  },
  {
    id: '2',
    nome: 'Saúde & Bem-Estar',
    icone: 'heart',
    descricao: 'Medicina, Enfermagem, Nutrição e terapias.',
    conteudo: 'O que faz um biomédico? As especializações da Enfermagem...'
  },
  {
    id: '3',
    nome: 'Engenharias',
    icone: 'hard-hat',
    descricao: 'Projetos, construção e infraestrutura.',
    conteudo: 'Tipos de engenharia (Civil, Mecânica, Elétrica) e mercado de trabalho.'
  },
  {
    id: '4',
    nome: 'Marketing & Comunicação',
    icone: 'volume-2',
    descricao: 'Estratégias digitais, publicidade e relações públicas.',
    conteudo: 'Tendências de marketing, SEO, e a ascensão do tráfego pago.'
  }
];

export const areaService = {
  getAll: async (): Promise<AreaAtuacao[]> => {
    await delay(1000); 
    return MOCK_AREAS;
  },

  getById: async (id: string): Promise<AreaAtuacao | undefined> => {
    await delay(500);
    return MOCK_AREAS.find(area => area.id === id);
  }
};