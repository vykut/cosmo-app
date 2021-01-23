import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Chip, useTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMarketContext } from '../contexts/MarketContext';

export default function CategoryChip({ category, selected }) {
    const navigation = useNavigation()
    const route = useRoute()
    const theme = useTheme()
    const marketContext = useMarketContext()

    const seeProducts = () => {
        navigation.push('Products', {
            ...route.params,
            currentCategory: category,
        })
    }

    const removeCategory = () => {
        let categories = marketContext.getParentCategories(category)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Market' }, {
                name: 'Products',
                params: {
                    ...route.params,
                    currentCategory: categories.length ? categories[categories.length - 1] : null,
                }
            }]
        })
    }

    return (
        <View style={styles.mainContainer}>
            <Chip
                style={selected && { backgroundColor: theme.colors.accent } || { maxWidth: 150 }}
                textStyle={{ color: theme.colors.text }}
                selected={selected}
                onClose={selected && removeCategory}
                onPress={!selected && seeProducts}
            >
                {category?.data?.name}
            </Chip>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 8,
    }
})
