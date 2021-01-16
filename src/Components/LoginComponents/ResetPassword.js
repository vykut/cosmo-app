import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, TextInput, useTheme, Banner, Subheading, Text } from 'react-native-paper'
import { useForm, Controller } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [banner, setBanner] = useState({ visible: false })
    const firebase = useFirebase()
    const theme = useTheme()

    const onShowBanner = ({ text, type }) => setBanner({ visible: true, text, type })

    const onDismissBanner = () => setBanner({ ...banner, visible: false })

    const resetPassword = async (data) => {
        try {
            setIsLoading(true)
            await firebase.resetPassword(data.email)
            onShowBanner({ text: 'Link-ul de resetare a parolei a fost trimis pe email.', type: 'success' })
        } catch (err) {
            onShowBanner({ text: err.message, type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    function ResetPasswordForm({ submit, disabled }) {
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
                <View style={{ marginVertical: 12, flex: 1, alignItems: 'center' }}>
                    <Button
                        labelStyle={{ textTransform: 'none', color: theme.colors.lightText }}
                        contentStyle={{ height: 48 }}
                        style={{ borderRadius: 24, width: 280 }}
                        onPress={handleSubmit(submit)}
                        mode='contained'
                        disabled={disabled}
                    >
                        Resetează parola
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
                    style={{ backgroundColor: banner.type === 'error' ? theme.colors.error : theme.colors.success, borderRadius: 8 }}
                >
                    <Subheading style={{ color: 'white' }}>
                        {banner.text}
                    </Subheading>
                </Banner>
                <ResetPasswordForm submit={resetPassword} disabled={isLoading} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
