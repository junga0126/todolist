import React from 'react';
import { useState } from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';
import { addDoc, collection} from 'firebase/firestore';

const makeItem = (props) => {

    //item: {id:number, text:string, check:boolean, color:number, week:string, work:boolean}
    const [text, setText] = useState('');   //text
    const [color, setColor] = useState(false);  //true:중요, false:보통
    const [week, setWeek] = useState('');   //요일    
    const [work, setWork] = useState(true); //work:true, play:false
    
    //newItem 업데이터
    const textInput = (event) => { setText(event); };
    const workInput = () => { setWork(true); };
    const playInput = () => { setWork(false); };

    //DB 및 배열에 item추가
    const addItem = async() => {
        try{
            await addDoc(collection(db, "item"), {
                id: Math.random().toString(),
                text: text,
                check: false,
                color: color,
                week: week,
                work: work
            });
            //값 초기화
            alert("Add item!!")
            setText('');
            setId();
            setCheck(false);
            setColor(1);
            setWeek('');
            setWork(true);
        }catch(error){ console.log(error.message) }
        props.navigation.navigate("Main");
    };

    return (
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item!"
          placeholderTextColor={'#999'}
          onChangeText={textInput}
          value={text}
          autoCorrect={false}
        />
        <Picker 
            style={{height:50, width:200,backgroundColor:'#e1c657'}}
            selectedValue={color}
            onValueChange={(val,idx)=>setColor(val)}
        >
            <Picker.Item label="보통" value={false}></Picker.Item>
            <Picker.Item label="중요" value={true}></Picker.Item>
        </Picker>
        <Picker 
            style={{height:50, width:200,backgroundColor:'#e1c657'}}
            selectedValue={week}
            onValueChange={(val,idx)=>setWeek(val)}
        >
            <Picker.Item label="월" value="월"></Picker.Item>
            <Picker.Item label="화" value="화"></Picker.Item>
            <Picker.Item label="수" value="수"></Picker.Item>
            <Picker.Item label="목" value="목"></Picker.Item>
            <Picker.Item label="금" value="금"></Picker.Item>
            <Picker.Item label="토" value="토"></Picker.Item>
            <Picker.Item label="일" value="일"></Picker.Item>
        </Picker>
        
        <View>  
          <Text>Choice Type: </Text> 
          <Button title={'Work'} onPress={workInput}/> 
          <Button title={'Play'} onPress={playInput}/> 
        </View>
        <Button title={'ADD'} onPress={addItem}/>
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
  
  export default makeItem;