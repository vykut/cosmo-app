import React from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton, Title } from 'react-native-paper'

export default function QuantitySelector({ quantity, onQuantityChange, disabled = false }) {
    const setQuantity = (increment) => () => {
        if (increment && quantity < 20) {
            return onQuantityChange(1)
        }
        if (!increment && quantity > 0) {
            return onQuantityChange(-1)
        }
    }

    return (
        <View style={styles.quantitySelector}>
            <IconButton icon='minus-box-outline' size={28} onPress={setQuantity(false)} disabled={disabled} />
            <Title>{quantity}</Title>
            <IconButton icon='plus-box-outline' size={28} onPress={setQuantity(true)} disabled={disabled} />
        </View>
    )
}

const styles = StyleSheet.create({
    quantitySelector: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 120
    },
})