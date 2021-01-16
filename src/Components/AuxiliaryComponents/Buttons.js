import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { useFirebase } from 'react-redux-firebase'
import * as Google from 'expo-google-app-auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function GoogleLoginButton() {
    const theme = useTheme()
    const firebase = useFirebase()

    const login = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '567087731440-sk0020ke5oi79oome8s65hl75hok8so0.apps.googleusercontent.com',
                iosClientId: '567087731440-neb8hv7i3aim2nr7tv4kbvj5rs4r6d7c.apps.googleusercontent.com',
                androidStandaloneAppClientId: '567087731440-4cs0k6mniq2h6t449gcaa150abeklurg.apps.googleusercontent.com',
                iosStandaloneAppClientId: '567087731440-n8g6d61glm0cb8lipoavffegcig89mkg.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                language: 'ro',
            });


            if (result.type === 'success') {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

                console.log(credential)
                const data = await firebase.auth().signInWithCredential(credential)
                if (data.additionalUserInfo.isNewUser) {
                    firebase.updateProfile({
                        email: data.user.email,
                        phone: data.user.phoneNumber || '',
                        firstName: data.user.displayName || '',
                        lastName: data.user.displayName || '',
                        favoriteProducts: [],
                        numberOfOrdersCompleted: 0,
                    })
                }
            } else {
                return { canceled: true };
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <Button
                contentStyle={{ height: 48 }}
                labelStyle={{ textTransform: 'none', color: theme.colors.text }}
                mode='contained'
                color={theme.colors.lightText}
                style={{ borderRadius: 24, width: 280 }}
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
    const theme = useTheme()
    const navigation = useNavigation()

    const showEmailLoginScreen = () => {
        navigation.navigate('Login')
    }

    return (
        <View>
            <Button
                contentStyle={{ height: 48 }}
                labelStyle={{ textTransform: 'none', color: theme.colors.lightText }}
                mode='contained'
                color={'#C23926'}
                style={{ borderRadius: 24, width: 280 }}
                onPress={showEmailLoginScreen}
            >
                <MaterialCommunityIcons name='email' size={16} />
                <View style={{ width: 16, height: 1 }} />
                Conectare cu email

            </Button>
        </View>
    )
}

export function CreateAccountButton() {
    const theme = useTheme()
    const navigation = useNavigation()

    const showSignUpScreen = () => {
        navigation.navigate('Signup')
    }

    return (
        <View>
            <Button
                contentStyle={{ height: 48 }}
                labelStyle={{ textTransform: 'none', color: 'black' }}
                mode='contained'
                color={theme.colors.accent}
                style={{ borderRadius: 24, width: 280 }}
                onPress={showSignUpScreen}
            >
                <MaterialCommunityIcons name='email' size={16} />
                <View style={{ width: 16, height: 1 }} />
                Creare cont
            </Button>
        </View>
    )
}

export function ResetPasswordButton() {
    const theme = useTheme()
    const navigation = useNavigation()

    const showResetPasswordScreen = () => {
        navigation.navigate('ResetPassword')
    }

    return (
        <View>
            <Button
                labelStyle={{ textTransform: 'none', color: theme.colors.primary }}
                mode='text'
                onPress={showResetPasswordScreen}
            >
                Ai uitat parola?
            </Button>
        </View>
    )
}