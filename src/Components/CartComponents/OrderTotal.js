import React from 'react'
import { View } from 'react-native'
import { useCartContext } from '../contexts/CartContext'
import { Headline, Subheading } from 'react-native-paper'

export default function OrderTotal() {
    const cartContext = useCartContext()

    const totalPrice = cartContext.getCart()?.totalPrice
    const deliveryPrice = cartContext.cosmoMarketStore?.deliveryPrice

    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Subheading>Total produse</Subheading>
                <Subheading>{totalPrice?.toFixed(2)} RON</Subheading>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Subheading>Cost livrare</Subheading>
                <Subheading>{deliveryPrice?.toFixed(2)} RON</Subheading>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Headline>Total comandă</Headline>
                <Headline>{(totalPrice + deliveryPrice || 0)?.toFixed(2)} RON</Headline>
            </View>
        </View>
    )
}
