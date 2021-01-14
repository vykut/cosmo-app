import React, { useState } from 'react'
import { View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';


export default function PaymentType() {
    const [payment, setPayment] = useState('cash');
    return (
        <View>
            <RadioButton.Group onValueChange={newValue => setPayment(newValue)} value={payment}>
                <RadioButton.Item label="Plata cash la livrare" value="cash" />
                <RadioButton.Item label="Plata cu cardul la livrare" value="card" />
            </RadioButton.Group>
        </View>
    )
}
