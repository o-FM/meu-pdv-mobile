import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProducts } from '@/hooks/useProducts';

const ProductsScreen = () => {
  const [q, setQ] = useState('');
  const res = useProducts(q);

  const items = res.data?.pages?.flatMap((p: any) => p.items || []) || [];

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput placeholder="Buscar produtos" value={q} onChangeText={setQ} style={{ padding: 8, borderWidth: 1, borderRadius: 6, marginBottom: 12 }} />

      {res.status === 'pending' && <ActivityIndicator />}

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id?.toString() || item.code || Math.random().toString()}
        renderItem={({ item }: any) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>{item.price}</Text>
          </View>
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