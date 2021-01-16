import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, TextInput, useTheme, Banner, Subheading, Text } from 'react-native-paper'
import { useForm, Controller } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import { capitalize } from '../../utils';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [banner, setBanner] = useState({ visible: false })
    const firebase = useFirebase()
    const theme = useTheme()

    const onShowBanner = (text) => setBanner({ visible: true, text })

    const onDismissBanner = () => setBanner({ visible: false })

    const signUp = async (data) => {
        setIsLoading(true)
        try {
            await firebase.createUser(
                {
                    email: data.email.trim().toLowerCase(),
                    password: data.password.trim()
                },
                {
                    firstName: capitalize(data.firstName.trim()),
                    lastName: capitalize(data.lastName.trim()),
                    email: data.email.trim().toLowerCase(),
                    phone: data.phone.trim(),
                    numberOfOrdersCompleted: 0,
                    favoriteProducts: [],
                })
        } catch (err) {
            // console.log(err)
            onShowBanner(err.message)
            setIsLoading(false)
        }
    }

    function SignUpForm({ submit, disabled }) {
        const { handleSubmit, errors, control, getValues } = useForm();
        const theme = useTheme()

        return (
            <View>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
                            label='Prenume'
                            autoCompleteType='name'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='default'
                            textContentType='givenName'
                        />
                    )}
                    name="firstName"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.firstName && <Text style={{ color: theme.colors.error }}>Prenumele este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
                            label='Nume'
                            autoCompleteType='name'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='default'
                            textContentType='familyName'
                        />
                    )}
                    name="lastName"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.lastName && <Text style={{ color: theme.colors.error }}>Numele este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
                            label='Telefon'
                            autoCompleteType='tel'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                        />
                    )}
                    name="phone"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.phone && <Text style={{ color: theme.colors.error }}>Telefonul este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
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
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
                            label='Parolă'
                            autoCompleteType='password'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            secureTextEntry={true}
                            keyboardType='default'
                            textContentType='newPassword'
                        />
                    )}
                    name="password"
                    rules={{ required: true, validate: value => value === getValues('repeatPassword') }}
                    defaultValue=""
                />
                {errors.password && <Text style={{ color: theme.colors.error }}>Parolele trebuie să coincidă</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 6, backgroundColor: 'white', flex: 1 }}
                            label='Repetă Parola'
                            autoCompleteType='password'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            secureTextEntry={true}
                            keyboardType='default'
                            textContentType='newPassword'
                        />
                    )}
                    name="repeatPassword"
                    rules={{ required: true, validate: value => value === getValues('password') }}
                    defaultValue=""
                />
                {errors.repeatPassword && <Text style={{ color: theme.colors.error }}>Parolele trebuie să coincidă</Text>}
                <View style={{ marginVertical: 6, flex: 1, alignItems: 'center' }}>
                    <Button
                        labelStyle={{ textTransform: 'none', color: theme.colors.lightText }}
                        contentStyle={{ height: 48 }}
                        style={{ borderRadius: 24, width: 280 }}
                        onPress={handleSubmit(submit)}
                        mode='contained'
                        disabled={disabled}
                    >
                        Creează cont
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

                <SignUpForm submit={signUp} disabled={isLoading} />
                <View style={{ marginBottom: 24 }} />

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logoRider: {

    }
})