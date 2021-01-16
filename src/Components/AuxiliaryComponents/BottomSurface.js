import React from 'react'
import { View, Text } from 'react-native'
import { Headline, Surface, Button, useTheme } from 'react-native-paper'
import { useCartContext } from '../contexts/CartContext'

export default function BottomSurface({ children }) {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Surface style={{ elevation: 4, borderTopStartRadius: 36, borderTopRightRadius: 36 }}>
                <View style={{ padding: 16 }}>
                    {children}
                </View>
            </Surface>
        </View>
    )
}
