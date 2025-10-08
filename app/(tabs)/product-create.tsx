import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useCreateProduct } from '@/hooks/useProductMutations';
import { useRouter } from 'expo-router';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.number().typeError('Preço inválido').positive('Preço deve ser > 0').required('Preço é obrigatório'),
  category: yup.string().optional(),
  barcode: yup.string().optional(),
});

export default function ProductCreate() {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [image, setImage] = useState<string | null>(null);
  const mutation = useCreateProduct();
  const router = useRouter();

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
    // create product JSON first
    const payload = { ...data };
    const created = await mutation.mutateAsync(payload);
    // if image present, try to upload (assumes endpoint /products/:id/image)
    if (image && created?.id) {
      const form = new FormData();
      // @ts-ignore
      form.append('file', { uri: image, name: 'photo.jpg', type: 'image/jpeg' });
      try {
        await fetch(`https://api.meupdv.com/api/v1/products/${created.id}/image`, { method: 'POST', body: form });
      } catch (e) {
        // ignore upload failures for now
      }
    }
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Novo produto</Text>

      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, value } }) => <FormField label="Nome" value={value} onChangeText={onChange} />}
      />

      <Controller
        control={control}
        name="price"
        defaultValue=""
        render={({ field: { onChange, value } }) => <FormField label="Preço" value={value} onChangeText={onChange} keyboardType="numeric" />}
      />

      <Controller
        control={control}
        name="category"
        defaultValue=""
        render={({ field: { onChange, value } }) => <FormField label="Categoria" value={value} onChangeText={onChange} />}
      />

      <Controller
        control={control}
        name="barcode"
        defaultValue=""
        render={({ field: { onChange, value } }) => <FormField label="Código de barras" value={value} onChangeText={onChange} />}
      />

      <Button label="Escolher imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, marginVertical: 12 }} />}

      <Button label="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
