import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useWindowDimensions } from 'react-native'
import { CreateAccountButton, GoogleLoginButton, EmailLoginButton } from '../AuxiliaryComponents/Buttons'

export default function LoginOnboarding() {
    const windowDimensions = useWindowDimensions()

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <ScrollView style={{ flex: 1, padding: 8 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/logo-cosmo-market.png')} style={{ resizeMode: 'contain', width: windowDimensions.width * 0.7, height: 200 }} />
                <Image source={require('../../../assets/logo-rider.png')} style={{ resizeMode: 'contain', width: windowDimensions.width * 0.7, height: windowDimensions.width - 32 }} />
                <GoogleLoginButton />
                <EmailLoginButton />
                <CreateAccountButton />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    logoRider: {

    }
})