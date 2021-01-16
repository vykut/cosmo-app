import React, { useState } from 'react'
import { View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { Controller } from "react-hook-form";


export default function PaymentType({ control }) {
    const [payment, setPayment] = useState('cash');
    return (
        <View>
            <Controller
                control={control}
                render={({ onChange, value }) =>
                    <RadioButton.Group onValueChange={
                        newValue => onChange(newValue)}
                        value={value}
                    >
                        <RadioButton.Item label="Plata cash la livrare" value="cash" />
                        <RadioButton.Item label="Plata cu cardul la livrare" value="card" />
                    </RadioButton.Group>
                }
                name='payment'
                defaultValue='cash'
            />
        </View>
    )
}
