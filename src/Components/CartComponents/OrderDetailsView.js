import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Headline, Title, Subheading, Paragraph, Button, useTheme } from 'react-native-paper'
import BottomSurface from '../AuxiliaryComponents/BottomSurface'
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import { useCartContext } from '../contexts/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useProfileContext } from '../contexts/ProfileContext';
import { useOrderContext } from '../contexts/OrderContext';
import ProductsInOrderList from '../ProductComponents/ProductsInOrderList';


export default function OrderDetailsView() {
    const cartContext = useCartContext()
    const profileContext = useProfileContext()
    const orderContext = useOrderContext()
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false)

    const profile = profileContext.profile
    const store = cartContext.cosmoMarketStore

    const order = orderContext.currentOrder

    const cancelOrder = async () => {
        try {
            setIsLoading(true)
            await orderContext.cancelOrder()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }



    if (!isLoaded(order))
        return <Title style={{ textAlign: 'center' }}>Se încarcă comanda...</Title>

    if (isEmpty(order))
        return <Title style={{ textAlign: 'center' }}>Eroare la afișarea comenzii</Title>

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ padding: 8 }} >
                {order?.data?.riderID ? <View style={{ marginVertical: 8 }}>
                    <Subheading>{`Comanda a fost preluată de ${order?.data?.rider?.firstName} și este în drum spre tine.`}</Subheading>
                    <Subheading>{`Îl poți contacta pe ${order?.data?.rider?.firstName} la numărul de telefon ${order?.data?.rider?.phone}.`}</Subheading>
                </View> :
                    <View style={{ marginVertical: 8 }}>
                        <Headline style={{ textAlign: 'center' }}>Mulțumim, {profile?.firstName}!</Headline>
                        <Subheading>Comanda a fost preluată și va fi atribuită unui livrator cât de curând. Revino la acest ecran în cateva minute pentru a vedea datele de contact ale livratorului.</Subheading>
                        <Button
                            mode='contained'
                            color={theme.colors.error}
                            labelStyle={{ color: 'white' }}
                            contentStyle={{ height: 48 }}
                            style={{ borderRadius: 24, margin: 16 }}
                            onPress={cancelOrder}
                            disabled={isLoading}
                        >
                            Anulează comanda
                    </Button>
                    </View>}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='av-timer' size={24} />
                    <Subheading>
                        {`Comanda ajunge la tine în ${store?.deliveryTime} minute.`}
                    </Subheading>
                </View>
                <ProductsInOrderList productsInOrder={orderContext.productsInOrder} order={order} />
                <View style={{ height: 100 }} />
            </ScrollView>
            <BottomSurface>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='av-timer' size={24} />
                        <Title>
                            {`${store?.deliveryTime}"`}
                        </Title>
                    </View>
                    <Headline style={{ textAlign: 'right' }}>{`Total: ${order?.data?.totalPrice?.toFixed(2) || 0} RON`}</Headline>
                </View>
            </BottomSurface>
        </View>
    )
}
