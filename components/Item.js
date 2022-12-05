import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

const TodoListItem = ({id, text, check, color, week, work, onRemove, onCheck}) => {
  return (
    <View>
    {color ? 
    (  <View style={styles.container}>
        <TouchableOpacity onPressOut={onCheck(id)}>
            {check ? ( 
            <View style={styles.completeCircle}>
                <Icon name="circledowno" size={30} color="#115131" />
            </View>
            ):(
                <View style={styles.circle}/>
            )

            }
        </TouchableOpacity>
        <Text>
            {'('}{week}{')'}
        </Text>
        <Text style={[
            styles.text,
            check ? styles.strikeText : styles.unstrikeText,]}
        > 
            {text} 
        </Text>
        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={onRemove(id)}>
                <Icon name="delete" size={30} color="#642918" />
            </Text>
        </TouchableOpacity>
    </View>
    ):
    ( <View style={styles.container2}>
        <TouchableOpacity onPressOut={onCheck(id)}>
            {check ? ( 
            <View style={styles.completeCircle}>
                <Icon name="circledowno" size={30} color="#115131" />
            </View>
            ):(
                <View style={styles.circle}/>
            )

            }
        </TouchableOpacity>
        <Text>
            {'('}{week}{')'}
        </Text>
        <Text style={[
            styles.text,
            check ? styles.strikeText : styles.unstrikeText,]}
        > 
            {text} 
        </Text>
        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={onRemove(id)}>
                <Icon name="delete" size={30} color="#642918" />
            </Text>
        </TouchableOpacity>
    </View>    
    )

    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#ab3c49',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container2: {
    flex: 1,
    borderBottomColor: '#539a02',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default TodoListItem;