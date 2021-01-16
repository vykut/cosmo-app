import React, { useMemo } from 'react'
import { View, Image } from 'react-native'
import { Surface, Button, Subheading, Title, Text, useTheme, DataTable } from 'react-native-paper'
import { useMarketContext } from '../contexts/MarketContext'
import { useNavigation, useRoute } from '@react-navigation/native';


export default function ProductInOrderRow({ productInOrder }) {
    const marketContext = useMarketContext()
    const theme = useTheme()
    const navigation = useNavigation()

    const product = marketContext.getProductByID(productInOrder.id)


    return (
        <DataTable.Row onPress={() => navigation.navigate('Product', { product })}>
            <DataTable.Cell >
                <Text style={{ color: theme.colors.primary }}>{product?.data?.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
                {productInOrder?.data?.quantity}
            </DataTable.Cell>
            <DataTable.Cell numeric>
                {productInOrder?.data?.price} RON
            </DataTable.Cell>
        </DataTable.Row>
    )
}
