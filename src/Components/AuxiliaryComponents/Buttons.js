import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { useFirebase } from 'react-redux-firebase'

export function GoogleLoginButton() {
    const firebase = useFirebase()
    const theme = useTheme()

    const login = () => {
        firebase.login({ provider: 'google', type: 'redirect' })
    }

    return (
        <View>
            <Button
                contentStyle={{ padding: 8, }}
                labelStyle={{ textTransform: 'none', color: theme.colors.text }}
                mode='contained'
                color={theme.colors.lightText}
                style={{ borderRadius: 24 }}
                onPress={login}
            >
                <Image source={require('../../../assets/google.png')} style={{ width: 16, height: 16 }} />
                <View style={{ width: 16, height: 1 }} />
                Conectare cu Google
            </Button>
        </View>
    )
}

export function EmailLoginButton() {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export function CreateAccountButton() {
    return (
        <View>
            <Text></Text>
        </View>
    )
}
