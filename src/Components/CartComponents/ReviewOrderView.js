import React, { useLayoutEffect } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import TitleSurface from '../AuxiliaryComponents/TitleSurface';
import AddressPicker from '../AuxiliaryComponents/AddressPicker';
import AddressForm from '../AuxiliaryComponents/AddressForm';
import PaymentType from './PaymentType';
import OrderNotes from './OrderNotes';


export default function ReviewOrderView() {
    const navigation = useNavigation()


    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Detalii comandă' })
    }, [navigation])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={{ padding: 8 }}>
                <TitleSurface title='Informații adresă' >
                    <AddressPicker />

                </TitleSurface>
                <TitleSurface title='Metoda de plată' >
                    <PaymentType />
                </TitleSurface>
                <TitleSurface title='Observații comandă' >
                    <OrderNotes />
                </TitleSurface>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
