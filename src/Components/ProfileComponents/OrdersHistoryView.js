import React, { memo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useOrderContext } from '../contexts/OrderContext'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { ActivityIndicator, useTheme, DataTable, Headline } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';


export default function OrdersHistoryView() {
    const orderContext = useOrderContext()
    const theme = useTheme()
    const navigation = useNavigation()

    const pastOrders = orderContext.orders

    const DataTableHeader = memo(() => {
        return <DataTable.Header>
            <DataTable.Title>Dată</DataTable.Title>
            {/* <DataTable.Title>Status</DataTable.Title> */}
            <DataTable.Title numeric>Total</DataTable.Title>
        </DataTable.Header>
    }, [])

    if (!isLoaded(pastOrders))
        return <ActivityIndicator color={theme.colors.primary} animating={true} size='large' style={{ marginTop: 16 }} />

    if (isEmpty(pastOrders))
        return <Headline style={{ textAlign: 'center' }}>Nu există comenzi.</Headline>

    return (
        <View style={{ flex: 1 }}>
            <DataTable style={{ flex: 1 }}>
                <DataTableHeader />
                <ScrollView style={{ height: '100%' }}>
                    {pastOrders.map((order) => {
                        const date = new Date(order?.data?.createdAt?.seconds * 1000).toLocaleString('ro-RO')
                        return <DataTable.Row key={order?.id} onPress={() => navigation.navigate('PastOrder', { order })}>
                            <DataTable.Cell>{date}</DataTable.Cell>
                            {/* <DataTable.Cell>{order?.data?.state}</DataTable.Cell> */}
                            <DataTable.Cell numeric>{order?.data?.totalPrice?.toFixed(2)} RON</DataTable.Cell>
                        </DataTable.Row>
                    })}
                </ScrollView>
            </DataTable>
        </View>
    )
}
