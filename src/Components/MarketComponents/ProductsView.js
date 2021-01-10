import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, Searchbar, useTheme, IconButton } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMarketContext } from './MarketContext/MarketContext';
import CategoryChip from './CategoryChip';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';
import { colors } from '../../utils';
import { Badge } from 'react-native-paper';

export default function ProductsView() {
    const route = useRoute()
    const navigation = useNavigation()
    const marketContext = useMarketContext()
    const theme = useTheme()
    var products

    if (route.params.currentCategory)
        products = marketContext.products.filter((product) => product.data.categories.includes(route.params.currentCategory.id))
    else
        products = marketContext.products || []

    if (products.length && route.params.searchQuery) {
        products = products.filter((product) => product.data && product.data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(route.params.searchQuery))
    }

    if (route.params.filter) {
        if (route.params.filter.price) {
            products = products.filter((product) => product.data && product.data.price >= route.params.filter.price[0] && product.data.price <= route.params.filter.price[1])
        }
    }

    useLayoutEffect(() => {
        const filter = () => {
            navigation.navigate('FilterModal', { ...route.params, products })
        }

        navigation.setOptions({
            headerRight: () => <View style={{ position: 'relative' }}>
                <IconButton icon='filter-variant' color={theme.colors.accent} onPress={filter} />
                {route.params?.filter?.price && <Badge theme={theme} size={10} style={{ position: 'absolute', right: 12, top: 13, }} />}
            </View>,
        })
    }, [navigation, products, route.params, theme])

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
            <Searchbar
                placeholder="Caută un produs"
                onChangeText={(searchQuery) => navigation.setParams({ ...route.params, searchQuery: searchQuery })}
                value={route.params.searchQuery}
                inputStyle={styles.input}
                style={styles.search}
                iconColor={theme.colors.accent}

                placeholderTextColor={theme.colors.lightText}
            />
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
    input: {
        // backgroundColor: 'red'
        color: colors.lightText
    },
    search: {
        backgroundColor: 'rgba(50,172,173,1)',
        borderRadius: 0,
    },
    scrollView: {
        height: '100%'
    }
})
