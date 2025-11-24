import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, Alert, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/login.styles';
import { Input } from '../components/InputText';
import { AuthScreenNavigationProp } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/image/ProQuizz_v2.png';

export function LoginScreen() {

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const { signIn } = useAuth();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme: currentTheme } = useTheme();

  async function handleLogin() {

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
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>

        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode='contain' />
        </View>

        <View style={styles.formContainer}>
          <Input
            label="E-mail"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.buttonPrimary, { backgroundColor: currentTheme.buttonBackground }]} onPress={handleLogin} disabled={loading}
          >
              {loading ? (
                <ActivityIndicator color={currentTheme.buttonText} />
              ) : (
                <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
                  ENTRAR
                </Text>
              )}
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