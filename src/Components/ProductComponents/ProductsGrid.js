import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import ProductBox from './ProductBox'

export default function ProductsGrid({ products }) {

    if (!products.length) {
        return <View style={{ marginLeft: 8 }}>
            <Text>Nu există produse</Text>
        </View>
    }

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
