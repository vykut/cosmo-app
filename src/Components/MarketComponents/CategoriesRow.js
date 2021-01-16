import React from 'react'
import { View } from 'react-native'
import RowContainer from '../AuxiliaryComponents/RowContainer'
import CategoryChip from './CategoryChip'
import { ProgressBar, Text, Headline, Subheading, Button, useTheme } from 'react-native-paper'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useMarketContext } from '../contexts/MarketContext'

export default function CategoriesRow({ categories, products, sort }) {
    const navigation = useNavigation()
    const route = useRoute()
    const theme = useTheme()
    const marketContext = useMarketContext()

    if (!categories.length)
        return <ProgressBar indeterminate color={theme.colors.primary} />

    return (
        <RowContainer title='Categorii' products={products} navigation={navigation} sort={sort}>
            {categories.map((category) => <CategoryChip
                key={category.id}
                category={category}
            />)}
        </RowContainer>
    )
}
