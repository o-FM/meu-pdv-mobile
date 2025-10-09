import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Dashboard: undefined;
  Sales: undefined;
  Products: undefined;
  Stock: undefined;
};

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
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
