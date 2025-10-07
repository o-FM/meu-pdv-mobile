import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { signOut } from '@/store/auth-slice';
import { RootState } from '@/store/store';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <View style={styles.buttonContainer}>
        <Button label="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 32,
  },
});

export default HomeScreen;
