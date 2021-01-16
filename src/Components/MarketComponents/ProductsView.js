import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, Searchbar, useTheme, IconButton } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMarketContext } from '../contexts/MarketContext';
import CategoriesList from './CategoriesList';
import { colors } from '../../utils';
import { Badge } from 'react-native-paper';
import ProductsGrid from '../ProductComponents/ProductsGrid';

export default function ProductsView() {
    const route = useRoute()
    const navigation = useNavigation()
    const marketContext = useMarketContext()
    const theme = useTheme()
    var products

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

    if (route.params.currentCategory)
        products = marketContext.products.filter((product) => product.data.categories.includes(route.params.currentCategory.id))
    else
        products = marketContext.products || []

    if (route.params.filter) {
        if (route.params.filter.price) {
            products = products.filter((product) => product.data && product.data.price >= route.params.filter.price[0] && product.data.price <= route.params.filter.price[1])
        }
    }

    if (products.length && route.params.searchQuery) {
        products = products.filter((product) => product.data && product.data.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(route.params.searchQuery))
    }

    if (route.params.sort) {
        switch (route.params.sort) {
            case 1:
                products.sort((a, b) => {
                    if (a.data.createdAt < b.data.createdAt)
                        return 1
                    if (a.data.createdAt > b.data.createdAt)
                        return -1
                    return 0
                })
                break
            case 2:
                products.sort((a, b) => a.data.price - b.data.price)
                break
            case 3:
                products.sort((a, b) => b.data.price - a.data.price)
                break
            case 4:
                products.sort((a, b) => {
                    if (a.data.name < b.data.name)
                        return -1
                    if (a.data.name > b.data.name)
                        return 1
                    return 0
                })
                break
            case 5:
                products.sort((a, b) => {
                    if (a.data.name < b.data.name)
                        return 1
                    if (a.data.name > b.data.name)
                        return -1
                    return 0
                })
                break
        }
    }

    return (
        <View style={{ flex: 1 }}>
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
                <ProductsGrid products={products} />
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
