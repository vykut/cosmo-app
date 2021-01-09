import React, { useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMarketContext } from './MarketContext/MarketContext';
import CategoryChip from './CategoryChip';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

export default function ProductsView() {
    const route = useRoute()
    const navigation = useNavigation()
    const marketContext = useMarketContext()
    var products



    if (route.params.currentCategory)
        products = marketContext.products.filter((product) => product.data.categories.includes(route.params.currentCategory.id))
    else
        products = marketContext.products || []


    // set screen title
    useEffect(() => {
        if (route.params.currentCategory) {
            navigation.setOptions({ title: route.params.currentCategory.data.name })
        } else {
            navigation.setOptions({ title: 'Toate produsele' })
        }
    }, [navigation, route.params.currentCategory])

    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <CategoriesList />
                <ProductsList products={products} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    scrollView: {
        height: '100%'
    }
})
