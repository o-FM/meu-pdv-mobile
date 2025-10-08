import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppDispatch } from '../../store/store';
import { signOut } from '../../store/auth-slice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil</Text>
      <Button title="Logout" onPress={() => dispatch(signOut())} />
    </View>
  );
};

export default ProfileScreen;