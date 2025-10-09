// Sales screen (TypeScript)
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type CarrinhoItem = Produto & { quantidade: number };

const produtosMock: Produto[] = [
  { id: '1', nome: 'Produto 1', preco: 10.0 },
  { id: '2', nome: 'Produto 2', preco: 20.0 },
  { id: '3', nome: 'Produto 3', preco: 15.0 },
];

export default function SalesScreen() {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [quantidade, setQuantidade] = useState('1');

  const adicionarProduto = (produto: Produto) => {
    const produtoNoCarrinho: CarrinhoItem = { ...produto, quantidade: parseInt(quantidade) || 1 };
    setCarrinho((prev) => [...prev, produtoNoCarrinho]);
  };

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Vendas</Text>

      {/* Lista de Produtos */}
      <FlatList
        data={produtosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Produto }) => (
          <View style={styles.produto}>
            <Text style={styles.nomeProduto}>{item.nome}</Text>
            <Text style={styles.precoProduto}>R$ {item.preco.toFixed(2)}</Text>
            <TextInput
              style={styles.inputQuantidade}
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => adicionarProduto(item)}>
              <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Carrinho */}
      <View style={styles.carrinho}>
        <Text style={styles.tituloCarrinho}>Carrinho</Text>
        {carrinho.map((item, index) => (
          <Text key={index} style={styles.itemCarrinho}>
            {item.nome} x {item.quantidade} = R$ {(item.preco * item.quantidade).toFixed(2)}
          </Text>
        ))}
        <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
        <TouchableOpacity style={styles.botaoFinalizar}>
          <Text style={styles.textoBotao}>Finalizar Venda</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  produto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  nomeProduto: { flex: 2, fontSize: 16 },
  precoProduto: { flex: 1, fontSize: 16 },
  inputQuantidade: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  botaoAdicionar: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  carrinho: { marginTop: 24, borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 16 },
  tituloCarrinho: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  itemCarrinho: { fontSize: 16, marginBottom: 4 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  botaoFinalizar: {
    marginTop: 16,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
});
