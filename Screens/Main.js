import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
import List from '../components/List';

const Main = (props) => {
  const [items, setItems] = useState([]);
  const [changeId, setChangeId] = useState();
  const [workCheck, setWorkCheck] = useState();

  //목록에서 item 삭제
  const removeItem = (id, work) => e => {
    setChangeId(id);
    removeItemDB(id, work);
  };
  //user삭제 -id입력하여 저장된 정보 사용
  const removeItemDB = async (id, work)=>{
    try{
      const q = await query( collection(db, "item"), where('id',"==", id)) 
      const changeItem = await getDocs(q); //id일치 item
      let docID;
      changeItem.docs.map((row, idx) =>{
        docID = row.id
      })
      console.log("id", id);
      const docRef = doc(db, "item",docID );
      await deleteDoc(docRef); //삭제 코드
      if(work == true) workDB();
      else playDB();
      //readItemDB();
    }catch(error){ console.log(error.message)}
  }


  //check 활성화 상태
  const onCheck = (id, work) => e => {
    setChangeId(id);
    updateCheck(id, work);
  };
  const updateCheck = async (id, work)=>{
    try{
      const q = await query( collection(db, "item"), where('id',"==", id)) 
      const changeItem = await getDocs(q); //id일치 item
      let checkState;
      let docID;
      changeItem.docs.map((row, idx) =>{
        checkState = row.data().check
        docID = row.id
      })
      console.log("id", id);
      console.log("checkState", checkState);
      const docRef = doc(db, "item",docID ); //해당 id가진 user업데이트
      await updateDoc(docRef, { 
        check: !checkState
      });
      if(work == true) workDB();
      else playDB();
      //readItemDB();
    }catch(error){console.log(error.message)}
  }


  //item목록 읽어오기
  const readItemDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "item" )) //item컬렉션 전체 가져오기
      setItems(data.docs.map(doc => ({ 
        ...doc.data(),

      }))); //map=for문, ahems 데이터복사와 고유의 id를 배열에 저장(users)
    }catch(error){ console.log(error.message)}
  }

   //work 읽어오기
   const workDB = async ()=>{
    try{
      const q = await query( collection(db, "item"), where('work',"==", true)) 
      const work =await getDocs(q); 
      setItems(work.docs.map(doc => ({ 
        ...doc.data(),

      }))); //map=for문, ahems 데이터복사와 고유의 id를 배열에 저장(users)
    }catch(error){ console.log(error.message)}
  }

    //work 읽어오기
    const playDB = async ()=>{
      try{
        const q = await query( collection(db, "item"), where('work',"==", false)) 
        const play =await getDocs(q); 
        setItems(play.docs.map(doc => ({ 
          ...doc.data(),
  
        }))); //map=for문, ahems 데이터복사와 고유의 id를 배열에 저장(users)
      }catch(error){ console.log(error.message)}
    }
  
  useEffect(()=>{
    workDB()
  },[])
  
 //readItemDB();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Today List</Text>
      <Button
          title = 'new item'
          onPress={()=>{
            props.navigation.navigate("Make")
          }}
      ></Button>
      <TouchableOpacity
        onPress={()=>{ workDB();}}>
        <Text>WORK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>{ playDB();}}>
        <Text>PLAY</Text>
      </TouchableOpacity> 

      <View style={styles.card}>
        <List items={items} onRemove={removeItem} onCheck={onCheck}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //전체 View
  container: {
    flex: 1,
    backgroundColor: "#DAA520",
  },
  //Title
  title: {
    color: "#04341C",
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#DAA520',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  
});

export default Main;