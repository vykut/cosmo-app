import React from 'react'
import { View, Text } from 'react-native'
import { Title, DataTable, ActivityIndicator, useTheme } from 'react-native-paper'
import ProductInOrderRow from '../ProductComponents/ProductInOrderRow'
import { isLoaded } from 'react-redux-firebase'

export default function ProductsInOrderList({ order, productsInOrder }) {
    const theme = useTheme()

    if (!isLoaded(productsInOrder))
        return <ActivityIndicator color={theme.colors.primary} animating={true} size='large' />

    if (!productsInOrder?.length)
        return <Title style={{ textAlign: 'center' }}>Nu există produse în comandă.</Title>

    return (
        <View>
            <Title style={{ textAlign: 'center' }}>Produse</Title>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nume</DataTable.Title>
                    <DataTable.Title numeric>Cantitate</DataTable.Title>
                    <DataTable.Title numeric>Total</DataTable.Title>
                </DataTable.Header>
                {productsInOrder.map((product) => <ProductInOrderRow productInOrder={product} key={product.id} />)}
                <DataTable.Row>
                    <DataTable.Cell>Total</DataTable.Cell>
                    <DataTable.Cell numeric>{order?.data?.quantity}</DataTable.Cell>
                    <DataTable.Cell numeric>{order?.data?.totalPrice?.toFixed(2)} RON</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}
