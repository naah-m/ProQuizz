import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/login.styles';
import { Input } from '../components/InputText';
import { AuthScreenNavigationProp } from '../navigation/types';
import { useAuth } from '../context/AuthContext';

export function LoginScreen() {

  const { signIn } = useAuth();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const deviceTheme = useColorScheme(); 
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleLogin = async () => {

    if(!login.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha com o login e senha');
      return;
    }

    try {
      setLoading(true);
      await signIn(login, senha);
    } catch (error) {
      Alert.alert("Erro", "Dados inválidos. Tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={currentTheme.background} 
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: currentTheme.text }]}>
            Logo {/*substituir pela imagem*/}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Login"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.buttonPrimary, { backgroundColor: currentTheme.buttonBackground }]} onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
              {loading ? 'Entrando...' : 'ENTRAR'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: currentTheme.text }]}>
            Não tem cadastro?
          </Text>
          <TouchableOpacity 
            style={[styles.buttonSecondary, { backgroundColor: currentTheme.secondaryButton }]} onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={[styles.buttonSecondaryText, { color: currentTheme.background }]}>
              CADASTRE-SE
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}