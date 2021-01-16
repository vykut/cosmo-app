import React from 'react'
import { View, Text } from 'react-native'
import { Title, Surface } from 'react-native-paper'

export default function TitleSurface({ title, children }) {
    return (
        <View style={{ marginVertical: 8 }}>
            <Title style={{ marginLeft: 8 }}>{title}</Title>
            <Surface style={{ padding: 8, elevation: 1, borderRadius: 8 }}>
                {children}
            </Surface>
        </View>
    )
}
