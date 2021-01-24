import React from 'react'
import { View, Text } from 'react-native'
import { Card, Paragraph, Title, useTheme } from 'react-native-paper';
import { useCartContext } from '../contexts/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ClosedStoreBanner() {
    const cartContext = useCartContext()
    const store = cartContext.cosmoMarketStore
    const theme = useTheme()

    if (store?.isOpen)
        return null

    return (
        <Card elevation={1} style={{ marginHorizontal: 8, marginTop: 8, backgroundColor: theme.colors.error }}>
            <Card.Title
                titleNumberOfLines={3}
                title='Magazinul este în afara programului'
                left={() => <MaterialCommunityIcons name='door-closed-lock' size={36} color='white' />}
                titleStyle={{color: 'white'}}
            />
        </Card>
            
    )
}
