import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { setAuthenticated } from '@/store/auth-slice';

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('qa@teste.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Mock simples para QA
      await new Promise(resolve => setTimeout(resolve, 800)); // simula chamada
      if (email === 'qa@teste.com' && password === '123456') {
        dispatch(setAuthenticated({ email }));
        router.replace("/(auth)/signin"); // redireciona para app principal
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch {
      Alert.alert('Erro', 'Falha ao autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Entre com sua conta de teste</Text>

      <View style={styles.form}>
        <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <FormField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button label="Entrar" onPress={handleSignIn} />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem conta?</Text>
        <Link href="/(auth)/signup" asChild>
          <Text style={styles.signupLink}> Cadastre-se</Text>
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
  signupLink: { color: 'blue', fontWeight: 'bold' },
});
