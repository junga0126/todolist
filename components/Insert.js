import React from 'react';
import { useState } from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, where, query } from 'firebase/firestore';




const Insert = ({onAdd}) => {
    const [newItem, setNewItem] = useState(''); //user 입력 text저장

    //실시간으로 user입력 text가 (newItem)업데이트
    const itemInput = (newItem) => {
        setNewItem(newItem);
    };

    const addItem = () => {
        onAdd(newItem); //app.js에서 받은 item add 함수에 새 아이템 전달
        setNewItem(''); //newItem 초기화
    };

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item!"
          placeholderTextColor={'#999'}
          onChangeText={itemInput}
          value={newItem}
          autoCorrect={false}
        />
        <View style={styles.button}>
          <Button title={'ADD'} onPress={addItem}/>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: 20,
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
      fontSize: 24,
      marginLeft: 20,
    },
    button: {
      marginRight: 10,
    },
  });
  
  export default Insert;