import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ProgressBar, Text, Headline, Subheading, Button, useTheme } from 'react-native-paper'
import { colors } from '../../utils'
import RowContainer from '../AuxiliaryComponents/RowContainer'
import ProductBox from './ProductBox'
import { useNavigation, useRoute } from '@react-navigation/native';

const numberOfProducts = 5

export default function ProductsRow({ products, category, title }) {
    const navigation = useNavigation()
    const theme = useTheme()

    if (!products.length)
        return <ProgressBar indeterminate color={theme.colors.primary} />

    return (
        <RowContainer title={title} category={category} products={products} navigation={navigation}>
            {products.slice(0, numberOfProducts).map((product) => <ProductBox key={product.id} product={product} />)}
        </RowContainer>
    )
}