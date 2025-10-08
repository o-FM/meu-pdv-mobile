
import React from 'react';
import { View, Text, Button } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Nova Venda" onPress={() => navigation.navigate('Sales')} />
      <Button title="Produtos" onPress={() => navigation.navigate('Products')} />
      <Button title="Estoque" onPress={() => navigation.navigate('Stock')} />
    </View>
  );
};

export default DashboardScreen;
