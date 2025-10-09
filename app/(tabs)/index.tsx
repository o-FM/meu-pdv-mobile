import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Mock data for the dashboard
const summaryData = {
  dailySales: 'R$ 1.250,00',
  topProduct: 'Produto Exemplo A',
  totalClients: 15,
};

const DashboardScreen: React.FC = () => {
  const router = useRouter();

  // Handlers for quick access buttons (will be implemented later)
  const handleNewSale = () => {
    // router.push('/(tabs)/vendas');
  };
  const handleProducts = () => {
    // router.push('/(tabs)/produtos');
  };
  const handleStock = () => {
    // router.push('/(tabs)/estoque');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <SummaryCard title="Vendas do Dia" value={summaryData.dailySales} icon="cash-outline" />
        <SummaryCard
          title="Produto Mais Vendido"
          value={summaryData.topProduct}
          icon="trophy-outline"
        />
        <SummaryCard
          title="Total de Clientes"
          value={summaryData.totalClients.toString()}
          icon="people-outline"
        />
      </View>

      {/* Quick Access Section */}
      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.quickAccessGrid}>
          <QuickAccessButton title="Nova Venda" icon="add-circle-outline" onPress={handleNewSale} />
          <QuickAccessButton title="Produtos" icon="list-outline" onPress={handleProducts} />
          <QuickAccessButton title="Estoque" icon="archive-outline" onPress={handleStock} />
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable component for summary cards
const SummaryCard: React.FC<{ title: string; value: string; icon: any }> = ({ title, value, icon }) => (
  <View style={styles.card}>
  <Ionicons name={icon} size={32} color="#42628C" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

// Reusable component for quick access buttons
const QuickAccessButton: React.FC<{ title: string; icon: any; onPress: () => void }> = (
  { title, icon, onPress },
) => (
  <TouchableOpacity style={styles.quickButton} onPress={onPress}>
    <Ionicons name={icon} size={40} color="#333" />
    <Text style={styles.quickButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#F2F2F2',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust for status bar
    paddingBottom: 20,
  },
  summaryContainer: {
    paddingHorizontal: 15,
  },
  quickAccessContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  cardValue: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '31%', // Adjust for spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  quickButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default DashboardScreen;
