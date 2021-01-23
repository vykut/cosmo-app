import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import CategoriesRow from './CategoriesRow';
import { useMarketContext } from '../contexts/MarketContext';
import ProductsRow from '../ProductComponents/ProductsRow';
import ClosedStoreBanner from '../AuxiliaryComponents/ClosedStoreBanner';

export default function MarketView() {
    const marketContext = useMarketContext()

    return (
        <>

            <View style={styles.mainContainer}>
                <ClosedStoreBanner />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {marketContext.categoriesRows.map((categoryRow, index) => <CategoriesRow {...categoryRow} key={index} />)}
                    {marketContext.productsRows.map((productRow, index) => <ProductsRow {...productRow} key={index} />)}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
});
