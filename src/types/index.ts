export interface Usuario {
  id: string;
  nome: string;
  apelido: string;
  email: string;
  pontos: number;
  isFirstTimeUser: boolean;
}

export interface AreaAtuacao {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  conteudo: string;
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  criterio: number;
  icone: string;
}

export interface QuestaoQuiz {
  id: string;
  areaId: string; 
  pergunta: string;
  opcoes: string[];
  respostaCorreta: string;
}

export interface RespostaUsuario {
  perguntaId: string;
  respostaSelecionada: string;
  estaCorreta: boolean;
}