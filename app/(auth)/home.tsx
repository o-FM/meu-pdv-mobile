import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área Logada</Text>
      <Text>Usuário: {user?.email || 'desconhecido'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
