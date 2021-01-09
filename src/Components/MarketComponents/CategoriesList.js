import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import CategoryChip from './CategoryChip'
import { useMarketContext } from './MarketContext/MarketContext'

export default function CategoriesList() {
    const route = useRoute()
    const marketContext = useMarketContext()
    var childrenCategories
    var parentCategories

    if (route.params.currentCategory) {
        if (route.params.currentCategory.data.childrenCategories)
            childrenCategories = marketContext.getChildrenCategories(route.params.currentCategory)
    } else {
        childrenCategories = marketContext.mainCategories
    }

    if (route.params.currentCategory && route.params.currentCategory.data.parentCategories) {
        parentCategories = marketContext.getParentCategories(route.params.currentCategory)
    }

    return (
        <View style={styles.mainContainer}>
            { parentCategories && parentCategories.map((category) => {
                return <CategoryChip
                    key={category.id}
                    category={category}
                    selected
                />
            })}
            { route.params.currentCategory && <CategoryChip category={route.params.currentCategory} selected />}
            {
                childrenCategories && childrenCategories.map((category) => category && <CategoryChip
                    key={category.id}
                    category={category}
                />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
    }
})
