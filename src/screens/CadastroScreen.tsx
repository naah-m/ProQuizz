import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../styles/theme/colors';
import { styles } from '../styles/cadastro.styles';
import { Input } from '../components/InputText';
import { AuthScreenNavigationProp } from '../navigation/types';

export function CadastroScreen() {

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const deviceTheme = useColorScheme();
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [apelido, setApelido] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleCadastro = () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !apelido.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (apelido.trim().length < 3) {
      Alert.alert('Atenção', 'O apelido deve ter no mínimo 3 caracteres.');
      return;
    }

    if (!aceitouTermos) {
      Alert.alert('Atenção', 'Você precisa aceitar os Termos e Condições.');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado!', [{text: 'Ok', onPress: () => navigation.goBack()}]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={currentTheme.background} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          <Text style={[styles.headerText, { color: currentTheme.text }]}>
            Basta preencher seus dados e tudo estará pronto para começar!
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="Nome Completo" value={nome} onChangeText={setNome}
            />

            <Input
              label="E-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}
            />

            <Input
              label="Senha" secureTextEntry value={senha} onChangeText={setSenha}
            />

            <Input
              label="Apelido" autoCapitalize="none" value={apelido} onChangeText={setApelido}
            />
          </View>

          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setAceitouTermos(!aceitouTermos)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkboxBase, aceitouTermos && styles.checkboxChecked]}>
                {aceitouTermos && <View style={styles.checkboxInner} />}
            </View>
            
            <Text style={[styles.checkboxLabel, { color: currentTheme.text }]}>
              Aceito concordar com os <Text style={{fontWeight: 'bold'}}>Termos e Condições</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.buttonPrimary, { backgroundColor: currentTheme.secondaryButton }]}
            onPress={handleCadastro}
          >
            <Text style={[styles.buttonText, { color: currentTheme.background }]}>
              CADASTRE-SE
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}