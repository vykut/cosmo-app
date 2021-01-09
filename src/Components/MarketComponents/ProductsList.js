import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProductBox from '../ProductComponents/ProductBox'

export default function ProductsList({ products }) {
    return (
        <View style={styles.mainContainer}>
            {products.map((product) => <ProductBox product={product} key={product.id} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: '100%',
    }
})
