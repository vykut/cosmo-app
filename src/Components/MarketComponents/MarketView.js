import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import CategoriesRow from './CategoriesRow';
import { useMarketContext } from './MarketContext/MarketContext';
import ProductsRow from './ProductsRow';

export default function MarketView({ navigation }) {

    const marketContext = useMarketContext()

    return (
        <View style={styles.mainContainer}>
            <CategoriesRow />
            <ProductsRow products={marketContext.recentProducts} />
            {/* <ProductsRow category={categories.meals} /> */}
            {/* <ProductsRow category={categories.cigars} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    button: {
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 10,
        backgroundColor: '#fff',
        height: 100,
        marginTop: 200
    },
});
