import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData) {
    return (<><ExpenseItem {...itemData.item} /></>);
}


export default function ExpensesList({ expenses }) {
    return (
        <View >
            <FlatList data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
