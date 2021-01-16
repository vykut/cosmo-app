import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import TitleSurface from '../AuxiliaryComponents/TitleSurface';
import AddressPicker from '../AuxiliaryComponents/AddressPicker';
import PaymentType from './PaymentType';
import OrderNotes from './OrderNotes';
import { useForm } from "react-hook-form";
import OrderTotal from './OrderTotal';
import { Button, useTheme } from 'react-native-paper'
import { useCartContext } from '../contexts/CartContext';
import ContactInformation from './ContactInformation';



export default function ReviewOrderView() {
    const cartContext = useCartContext()
    const navigation = useNavigation()
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
    })
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Detalii comandă' })
    }, [navigation])

    const placeOrder = async (data) => {
        try {
            setIsLoading(true)
            await cartContext.placeOrder(data)
        } catch (error) {
            console.log('eroare la review order', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={{ padding: 8 }}>
                <TitleSurface title='Informații adresă'>
                    <AddressPicker {...form} />
                </TitleSurface>
                <TitleSurface title='Informații contact'>
                    <ContactInformation {...form} />
                </TitleSurface>
                <TitleSurface title='Metoda de plată' >
                    <PaymentType {...form} />
                </TitleSurface>
                <TitleSurface title='Observații comandă' >
                    <OrderNotes {...form} />
                </TitleSurface>
                <TitleSurface title='Subtotal'>
                    <OrderTotal />
                </TitleSurface>
                <Button
                    mode='contained'
                    color={theme.colors.primary}
                    contentStyle={{ height: 48 }}
                    style={{ borderRadius: 24 }}
                    labelStyle={{ color: 'white' }}
                    onPress={form.handleSubmit(placeOrder)}
                    disabled={isLoading}
                >
                    Plasează comanda
                    </Button>
                <View style={{ marginBottom: 24 }} />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
