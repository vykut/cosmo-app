import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useCartContext } from '../CartContext'
import ProductRow from './ProductRow'


export default function ProductsList() {
    const cartContext = useCartContext()

    const cart = cartContext.getCart()
    const productsInCart = cartContext.getProductsInCart()


    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scroll}>
                {/* adauga banner cu comanda in curs */}
                {productsInCart?.sort((a, b) => a.id.localeCompare(b.id)).map((product) => {
                    return <ProductRow product={product} key={product.id} />
                })}
                <View style={{ marginBottom: 200 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scroll: {
        // flex: 1,
        padding: 16,
        // height: '100%',
    }
})