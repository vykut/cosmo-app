import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Controller } from "react-hook-form";

export default function OrderNotes({ control }) {
    return (
        <View>
            <Controller
                control={control}
                render={({ onChange, value }) =>
                    <TextInput
                        label='Observații'
                        mode='outlined'
                        style={{ backgroundColor: 'white' }}
                        onChangeText={text => onChange(text)}
                        value={value}
                    />
                }
                defaultValue=''
                name='notes'
            />
        </View>
    )
}
