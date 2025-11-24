# 🚀 ProQuizz - Orientação Profissional Gamificada

> Uma solução móvel para auxiliar adolescentes e profissionais em transição a descobrirem seu caminho através de trilhas de aprendizado interativas e gamificação.

---

## 🎯 O Problema
A escolha profissional é um dos momentos de maior ansiedade e incerteza na vida de jovens estudantes e adultos insatisfeitos. As ferramentas tradicionais (testes vocacionais estáticos e guias de texto longos) sofrem de:
1.  **Baixo Engajamento:** Metodologias passivas que não retêm a atenção;
2.  **Lacuna de Realidade:** Falta de visão prática sobre o dia a dia das profissões;
3.  **Alta Evasão:** Decisões baseadas em pressão externa levam a altos índices de abandono no ensino superior.

## 🌍 Impacto Social
O **ProQuizz** visa democratizar o acesso à orientação vocacional de qualidade. Ao permitir que o usuário "deguste" carreiras através de módulos práticos e valide seu conhecimento com Quizzes antes de se comprometer com uma faculdade:
* **Reduzimos a Evasão Universitária:** Menos tempo e dinheiro desperdiçados em cursos sem afinidade;
* **Aumentamos a Satisfação Profissional:** Conexão baseada em aptidão real, não apenas em teoria;
* **Fomentamos o Autoconhecimento:** O sistema de *Badges* recompensa a curiosidade e a exploração de novas áreas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma arquitetura robusta e escalável focada na experiência do usuário móvel.

* **Core:** React Native (Expo) & TypeScript;
* **Navegação:** React Navigation (Native Stack + Bottom Tabs);
* **Gerenciamento de Estado:** React Context API (`AuthContext`, `ThemeContext`);
* **Persistência de Dados:** AsyncStorage (Sessão, Onboarding, Preferências e Progresso);
* **Design System:** Estilização customizada com suporte nativo a **Dark/Light Mode**;
* **Ícones:** Expo Vector Icons (Feather).

---

## 📂 Estrutura do Código

```
src/
├── @types/             # Definições de Tipos Globais (Interfaces de Domínio)
├── assets/             # Imagens e recursos estáticos
├── components/         # Componentes de UI reutilizáveis (Cards, Botões)
├── context/            # Gerenciamento de estado global
│   ├── AuthContext.tsx   # Lógica de Autenticação e Persistência de Sessão
│   └── ThemeContext.tsx  # Controle de Tema (Dark/Light/System)
├── hooks/              # Custom Hooks (Lógica de View)
│   ├── useFetchAreas.ts  # Busca e filtra áreas de atuação
│   ├── useQuizLogic.ts   # Regras de negócio do Quiz (Pontuação, Estado)
│   └── useFetchBadges.ts # Cálculo de conquistas desbloqueadas
├── navigation/         # Configuração de Rotas
│   ├── index.tsx         # AppNavigator (Orquestrador de Stacks e Tabs)
│   └── types.ts          # Tipagem forte das rotas e parâmetros
├── screens/            # Telas da Aplicação
│   ├── HomeScreen.tsx    # Dashboard e Onboarding
│   ├── CursoScreen.tsx   # Detalhe do Material (Módulos de Leitura)
│   ├── QuizScreen.tsx    # Avaliação Gamificada
│   └── ...               # (Login, Cadastro, Config, etc.)
├── services/           # Camada de Abstração de Dados (Adapter Pattern)
│   ├── apiService.ts     # Mock de Autenticação
│   ├── areaService.ts    # Mock de Conteúdo
│   └── ...
└── styles/             # Definições de Estilos Globais e Temas
```

## 🚀 Como Rodar o Projeto

### Clone o repositório:

```bash
git clone [https://github.com/seu-usuario/seu-projeto.git](https://github.com/seu-usuario/seu-projeto.git)
```

### Instale as dependências:

```bash
npm install
# ou
yarn install
```

### Execute o projeto:

```bash
npx expo start
```

### Abra o App:
* Pressione 'a' para Android (Emulador ou USB).
* Pressione 'i' para iOS (Simulator).
* Ou leia o QR Code com o app Expo Go no seu celular físico.
