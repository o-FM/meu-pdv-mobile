import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { setAuthenticated } from '@/store/auth-slice';

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState('QA Tester');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Mock simples para QA
    dispatch(setAuthenticated({ name, email }));
    Alert.alert('Sucesso', 'Conta criada com sucesso!');
    router.replace('/(auth)/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Use dados fictícios para testes</Text>

      <View style={styles.form}>
        <FormField label="Nome" value={name} onChangeText={setName} />
        <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <Button label="Cadastrar" onPress={handleSignUp} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já possui conta?</Text>
        <Link href="/(auth)/signin" asChild>
          <Text style={styles.signinLink}> Entrar</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 32, color: 'gray' },
  form: { width: '100%', marginBottom: 32 },
  footer: { flexDirection: 'row', marginTop: 32 },
  footerText: { color: 'gray' },
  signinLink: { color: 'blue', fontWeight: 'bold' },
});
