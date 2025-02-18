import React, { useState }from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';

export function Form() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const { getItem, setItem } = useAsyncStorage("@savePass:passwords");

  async function handleNew() {
    try {
      const id = uuid.v4();
      const newData = {
        id,
        name,
        user,
        password
      }
      //const response = await AsyncStorage.getItem("@savePass:passwords");
      const response = await getItem();

      const previusData = response ? JSON.parse(response) : [];

      const data = [...previusData, newData]

      //await AsyncStorage.setItem("@savePass:passwords", JSON.stringify(data));
      await setItem(JSON.stringify(data));
      console.log(newData);
      Toast.show({type: 'success', text1: 'Cadastrado com sucesso'})
    } catch(error) {
      console.log(error);
      Toast.show({type: 'error', text1: 'Nao foi possivel cadastrar.'})
    } 
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome do serviço"
              onChangeText={setName}
              value={name}
            />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
              value={user}
            />
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleNew}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}