import { Usuario } from '../types';

const MOCK_USER: Usuario = {
  id: 'user-123',
  nome: 'João Silva',
  apelido: 'JoãoDev',
  email: 'teste@app.com',
  pontos: 150,
  isFirstTimeUser: false
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  login: async (email: string, password: string): Promise<Usuario> => {
    await delay(1500); 

    if (email === 'teste@app.com' && password === '12345') {
      return MOCK_USER;
    } else {
      throw new Error('Dados inválidos. Verifique o login e senha.');
    }
  }
};