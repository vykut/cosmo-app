import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useFirestoreConnect, isEmpty } from 'react-redux-firebase'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { useMarketContext } from '../contexts/MarketContext';
import { DataTable, Subheading, Title } from 'react-native-paper'
import { useProfileContext } from '../contexts/ProfileContext';
import ProductsInOrderList from '../ProductComponents/ProductsInOrderList';


export default function PastOrder() {
    const route = useRoute()
    const marketContext = useMarketContext()
    const profileContext = useProfileContext()

    const order = route.params?.order

    const productsInOrderStoreAs = `myOrder-productsInOrder-${order?.id}`
    useFirestoreConnect(() => {
        if (order?.id)
            return [
                {
                    collection: 'orders',
                    doc: order.id,
                    subcollections: [{ collection: 'products' }],
                    storeAs: productsInOrderStoreAs,
                },
            ]
    })

    const productsInOrder = useSelector(
        ({ firestore }) => {
            let products = firestore.data[productsInOrderStoreAs]
            if (!isEmpty(products)) {
                let productsArray = Object.entries(products).filter(x => x[1])
                return productsArray.map((product) => { return { id: product[0], data: product[1] } })
            }
        }
    )


    console.log(order)


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ padding: 8 }}>
                <View style={{ flex: 1 }}>
                    <Subheading>ID comandă: {order.id}</Subheading>
                    <Subheading>Dată: {new Date(order?.data?.createdAt?.seconds * 1000)?.toLocaleString('ro-RO')}</Subheading>
                    <Subheading>Adresă livrare: {order.data?.address?.label}</Subheading>
                    <Subheading>Stare comandă: {order.data?.state}</Subheading>
                    <Title>Detalii livrator</Title>
                    <Subheading>Prenume: {order.data?.rider?.firstName}</Subheading>
                    <Subheading>Telefon: {order.data?.rider?.phone}</Subheading>
                    <Subheading>ID livrator: {order.data?.riderID}</Subheading>
                </View>
                <ProductsInOrderList productsInOrder={productsInOrder} order={order} />
            </ScrollView>
        </View>
    )
}
