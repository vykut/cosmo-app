import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import AddressPicker from '../AuxiliaryComponents/AddressPicker'
import { TextInput, Button, useTheme, ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { useProfileContext } from '../contexts/ProfileContext'
import { useForm } from 'react-hook-form'



export default function ProfileAddressesView() {
    const profileContext = useProfileContext()
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            address: {
                street: '',
                number: '',
                block: '',
                floor: '',
                apartment: '',
                intercom: '',
                label: '',
            },
            coords: {
                latitude: 44.535417803832146,
                longitude: 26.17188568471457,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            },
            addressID: '',
            notes: '',
            payment: 'cash',
        },
    });

    const updateAddress = async (data) => {
        try {
            setIsLoading(true)
            await profileContext.updateAddress(data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteAddress = async () => {
        try {
            const addressID = form.getValues('addressID')
            setIsLoading(true)
            await profileContext.deleteAddress(addressID)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }

    }

    function DeleteAddressButton() {
        if (!form.getValues('addressID'))
            return null

        return (
            <Button
                disabled={isLoading}
                color={theme.colors.error}
                onPress={deleteAddress}
                labelStyle={{ color: 'white' }}
                style={{ marginVertical: 8, borderRadius: 24, marginHorizontal: 32 }}
                contentStyle={{ height: 48 }}
                mode='contained'>
                Șterge adresa
            </Button>
        )
    }

    if (!isLoaded(profileContext.addresses))
        return <ActivityIndicator color={theme.colors.primary} animating={true} size='large' />

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={{ padding: 8 }}>
                <AddressPicker {...form} />
                <Button
                    disabled={isLoading}
                    color={theme.colors.primary}
                    onPress={form.handleSubmit(updateAddress)}
                    mode='contained'
                    labelStyle={{ color: 'white' }}
                    style={{ marginVertical: 8, borderRadius: 24, marginHorizontal: 32 }}
                    contentStyle={{ height: 48 }}
                >
                    Actualizează datele
            </Button>
                <DeleteAddressButton />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
