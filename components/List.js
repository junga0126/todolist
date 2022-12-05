import React, { useState } from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Item from './Item';
const List = ({items, onRemove, onCheck}) => {

    //map: for문 -> items배열에서 item하나씩 item컴포넌트로 전달
    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {items.map(item => ( 
                <Item key={item.id} {...item} 
                onRemove={onRemove}
                onCheck = {onCheck} /> 
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default List;