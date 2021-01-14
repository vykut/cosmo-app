import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

export default function OrderNotes() {
    return (
        <View>
            <TextInput
                label='Observații'
                mode='outlined'
                style={{ backgroundColor: 'white' }}
            />
        </View>
    )
}
