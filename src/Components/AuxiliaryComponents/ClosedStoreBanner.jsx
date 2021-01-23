import React from 'react'
import { View, Text } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper';
import { useCartContext } from '../contexts/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ClosedStoreBanner() {
    const cartContext = useCartContext()
    const store = cartContext.cosmoMarketStore

    return (
    <>
        {
            !store?.isOpen && <Card elevation={1} style={{ marginHorizontal: 8, marginTop: 8 }}>
                <Card.Title title="Magazinul este în afara programului" left={(size) => <MaterialCommunityIcons name='door-closed-lock' size={36} />} />
            </Card>
            }
    </>
    )
}
