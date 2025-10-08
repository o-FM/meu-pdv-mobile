import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProducts } from '@/hooks/useProducts';
import { Link, useRouter } from 'expo-router';

const ProductsScreen = () => {
  const [q, setQ] = useState('');
  const res = useProducts(q);
  const router = useRouter();

  const items = res.data?.pages?.flatMap((p: any) => p.items || []) || [];

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/product-create' })} style={{ marginBottom: 12 }}>
        <Text style={{ color: 'blue' }}>+ Novo produto</Text>
      </TouchableOpacity>
      <TextInput placeholder="Buscar produtos" value={q} onChangeText={setQ} style={{ padding: 8, borderWidth: 1, borderRadius: 6, marginBottom: 12 }} />

      {res.status === 'pending' && <ActivityIndicator />}

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id?.toString() || item.code || Math.random().toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/product-edit', params: { productId: item.id } })} style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {res.hasNextPage && (
        <TouchableOpacity onPress={() => res.fetchNextPage()} style={{ padding: 12, alignItems: 'center' }}>
          <Text>Carregar mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductsScreen;