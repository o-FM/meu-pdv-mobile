import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useLogin } from '@/hooks/useAuth';
import { setAuthenticated } from '@/store/auth-slice';

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useLogin();

  const handleSignIn = async () => {
    try {
      const res = await mutation.mutateAsync({ email, password });
      // optionally get profile from res; for now mark as authenticated
      dispatch(setAuthenticated({ email }));
    } catch (e: any) {
      // handled by UI below
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={styles.form}>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {mutation.status === 'pending' ? (
        <ActivityIndicator />
      ) : (
        <Button label="Sign In" onPress={handleSignIn} />
      )}

      {mutation.isError && <Text style={{ color: 'red', marginTop: 8 }}>{(mutation.error as any)?.message || 'Erro ao autenticar'}</Text>}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Link href="/(auth)/signup" asChild>
          <Text style={styles.signupLink}> Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: 'gray',
  },
  form: {
    width: '100%',
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  footerText: {
    color: 'gray',
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
