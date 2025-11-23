import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Usuario } from '../types/index'; 
import { apiService } from '../api/apiService';

interface AuthContextData {
  user: Usuario | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem('@App:user');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if(parsedUser && typeof parsedUser === 'object' && parsedUser.id){
            setUser(parsedUser);
          } else {
             console.warn('Dado corrompido encontrado. Limpando sessão.');
             await AsyncStorage.removeItem('@App:user');
          }
        }
      } catch (error) {
        console.log('Erro ao carregar dados do storage. Resetando ', error);
        await AsyncStorage.multiRemove(['@App:user', '@App:onboardingComplete']);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, pass: string) {
    try {
      const response = await apiService.login(email, pass); 
      
      setUser(response);

      await AsyncStorage.setItem('@App:user', JSON.stringify(response));
      
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await AsyncStorage.removeItem('@App:user');
    } catch (error) {
      console.log('Erro ao sair: ', error);
    }
    
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}