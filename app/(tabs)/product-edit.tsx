import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useUpdateProduct, useDeleteProduct } from '@/hooks/useProductMutations';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '@/lib/api';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.number().typeError('Preço inválido').positive('Preço deve ser > 0').required('Preço é obrigatório'),
  category: yup.string().optional(),
  barcode: yup.string().optional(),
});

export default function ProductEdit() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.productId as string;

  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const resp = await api.get(`/products/${id}`);
          const p = resp.data;
          reset({ name: p.name || '', price: (p.price || '').toString(), category: p.category || '', barcode: p.barcode || '' });
          setImage(p.image || null);
        } catch (e) {
          // ignore
        }
      }
    })();
  }, [id]);

  const mutation = useUpdateProduct();
  const del = useDeleteProduct();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permissão de acesso às imagens é necessária.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: false });
    if (!result.cancelled) setImage(result.assets?.[0]?.uri || null);
  };

  const onSubmit = async (data: any) => {
    await mutation.mutateAsync({ id, ...data, price: parseFloat(data.price || '0') });
    if (image) {
      const form = new FormData();
      // @ts-ignore
      form.append('file', { uri: image, name: 'photo.jpg', type: 'image/jpeg' });
      try {
        await fetch(`https://api.meupdv.com/api/v1/products/${id}/image`, { method: 'POST', body: form });
      } catch (e) {
        // ignore
      }
    }
    router.back();
  };

  const handleDelete = () => {
    Alert.alert('Confirmar', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await del.mutateAsync(id); router.back(); } },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Editar produto</Text>

      <Controller control={control} name="name" defaultValue="" render={({ field: { onChange, value } }) => <FormField label="Nome" value={value} onChangeText={onChange} />} />
      <Controller control={control} name="price" defaultValue="" render={({ field: { onChange, value } }) => <FormField label="Preço" value={value} onChangeText={onChange} keyboardType="numeric" />} />
      <Controller control={control} name="category" defaultValue="" render={({ field: { onChange, value } }) => <FormField label="Categoria" value={value} onChangeText={onChange} />} />
      <Controller control={control} name="barcode" defaultValue="" render={({ field: { onChange, value } }) => <FormField label="Código de barras" value={value} onChangeText={onChange} />} />

      <Button label="Escolher imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, marginVertical: 12 }} />}

      <Button label="Salvar" onPress={handleSubmit(onSubmit)} />
      <View style={{ height: 12 }} />
      <Button label="Excluir" onPress={handleDelete} />
    </View>
  );
}
