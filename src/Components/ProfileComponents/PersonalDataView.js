import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { TextInput, Button, useTheme, ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { useProfileContext } from '../contexts/ProfileContext'

export default function PersonalDataView() {
    const { handleSubmit, errors, control } = useForm();
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const profileContext = useProfileContext()

    const profile = profileContext.profile

    const updatePersonalData = async (data) => {
        try {
            setIsLoading(true)
            await profileContext.updatePersonalData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isLoaded(profile))
        return <ActivityIndicator color={theme.colors.primary} animating={true} size='large' />

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={{ padding: 8 }}>
                <TextInput
                    style={{ marginVertical: 8, backgroundColor: 'white', flex: 1 }}
                    label='Email'
                    autoCompleteType='email'
                    mode='outlined'
                    value={profile?.email}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none'
                    disabled
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 8, backgroundColor: 'white', flex: 1 }}
                            label='Prenume'
                            autoCompleteType='name'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='default'
                            textContentType='givenName'
                            disabled={isLoading}
                        />
                    )}
                    name="firstName"
                    rules={{ required: true }}
                    defaultValue={profile?.firstName}
                />
                {errors.firstName && <Text style={{ color: theme.colors.error }}>Prenumele este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 8, backgroundColor: 'white', flex: 1 }}
                            label='Nume'
                            autoCompleteType='name'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='default'
                            textContentType='familyName'
                            disabled={isLoading}
                        />
                    )}
                    name="lastName"
                    rules={{ required: true }}
                    defaultValue={profile?.lastName}
                />
                {errors.lastName && <Text style={{ color: theme.colors.error }}>Numele este necesar</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={{ marginVertical: 8, backgroundColor: 'white', flex: 1 }}
                            label='Telefon'
                            autoCompleteType='tel'
                            mode='outlined'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                            disabled={isLoading}
                        />
                    )}
                    name="phone"
                    rules={{ required: true }}
                    defaultValue={profile?.phone}
                />
                {errors.phone && <Text style={{ color: theme.colors.error }}>Telefonul este necesar</Text>}
                <Button
                    disabled={isLoading}
                    color={theme.colors.primary}
                    onPress={handleSubmit(updatePersonalData)}
                    mode='contained'
                    labelStyle={{ color: 'white' }}
                    style={{ marginVertical: 8, borderRadius: 24, marginHorizontal: 32 }}
                    contentStyle={{ height: 48 }}
                >
                    Actualizează datele
            </Button>
            </ScrollView >
        </KeyboardAvoidingView >
    )
}
