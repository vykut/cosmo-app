import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { CreateAccountButton, GoogleLoginButton, ResetPasswordButton } from '../AuxiliaryComponents/Buttons'
import { Button, TextInput, useTheme, Banner, Subheading, Text } from 'react-native-paper'
import { useForm, Controller } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [banner, setBanner] = useState({ visible: false })
    const firebase = useFirebase()
    const theme = useTheme()

    const onShowBanner = (text) => setBanner({ visible: true, text })

    const onDismissBanner = () => setBanner({ visible: false })

    const login = async (data) => {
        setIsLoading(true)
        try {
            await firebase.login({
                email: data.email.trim().toLowerCase(),
                password: data.password.trim(),
            })
        } catch (err) {
            // console.log(err)
            onShowBanner(err.message)
            setIsLoading(false)
        }
    }

    function LoginForm({ submit, disabled }) {
        const { handleSubmit, errors, control } = useForm();
        const theme = useTheme()

        return (
            <View>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 12, backgroundColor: 'white', flex: 1 }}
                            label='Email'
                            autoCompleteType='email'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoCapitalize='none'
                        />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.email && <Text style={{ color: theme.colors.error }}>Emailul este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 12, backgroundColor: 'white', flex: 1 }}
                            label='Parolă'
                            autoCompleteType='password'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            secureTextEntry={true}
                            keyboardType='default'
                            textContentType='password'
                        />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.password && <Text style={{ color: theme.colors.error }}>Parola este necesară</Text>}
                <View style={{ marginVertical: 12, flex: 1, alignItems: 'center' }}>
                    <Button
                        labelStyle={{ textTransform: 'none', color: theme.colors.lightText }}
                        contentStyle={{ height: 48 }}
                        style={{ borderRadius: 24, width: 280 }}
                        onPress={handleSubmit(submit)}
                        mode='contained'
                        disabled={disabled}
                    >
                        Conectează-te
                </Button>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={{ padding: 8 }} >
                <View style={{ flex: 1, alignItems: 'center' }} >
                    <Image source={require('../../../assets/logo-cosmo-market.png')} style={{ resizeMode: 'contain', height: 70, marginTop: 24, marginBottom: 12 }} />
                </View>

                <Banner
                    visible={banner.visible}
                    actions={[{
                        label: 'OK',
                        onPress: onDismissBanner,
                        color: 'white'
                    }]}
                    style={{ backgroundColor: theme.colors.error, borderRadius: 8 }}
                >
                    <Subheading style={{ color: 'white' }}>
                        {banner.text}
                    </Subheading>
                </Banner>
                <LoginForm submit={login} disabled={isLoading} />

                <View style={{ marginVertical: 12, flex: 1, alignItems: 'center', }}>
                    <GoogleLoginButton />
                </View>
                <View style={{ marginVertical: 12, flex: 1, alignItems: 'center', }}>
                    <CreateAccountButton />
                </View>
                <View style={{ marginVertical: 12, flex: 1, alignItems: 'center', }}>
                    <ResetPasswordButton />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logoRider: {

    }
})