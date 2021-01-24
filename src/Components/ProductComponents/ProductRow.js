import React, { useEffect, useMemo, useState } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Surface, Text, Subheading, Title, ProgressBar, useTheme } from 'react-native-paper'
import QuantitySelector from '../AuxiliaryComponents/QuantitySelector'
import { useCartContext } from '../contexts/CartContext'
import { useMarketContext } from '../contexts/MarketContext'

export default function ProductRow({ product }) {
    const cartContext = useCartContext()
    const marketContext = useMarketContext()
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()

    const adjustQuantity = async (value) => {
        setIsLoading(true)
        try {
            if (value > 0)
                await cartContext.incrementQuantity(product.id)
            if (value < 0)
                if (product.data.quantity === 1)
                    await cartContext.deleteProductFromCart(product.id)
                else
                    await cartContext.decrementQuantity(product.id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (product?.data?.quantity) {
            setIsLoading(false)
        }
    }, [product?.data?.quantity])

    const mergedProduct = useMemo(() => {
        const products = marketContext.products
        const p = products?.find(p => p.id === product?.id && p.data)
        if (p) {
            return { ...product, data: { ...product.data, ...p.data } }
        }
        return null
    }, [marketContext.products, product])


    if (!mergedProduct) {
        return <ProgressBar indeterminate color={theme.colors.primary} />
    }

    return (
        <View style={{ marginVertical: 8 }}>
            <Surface style={styles.surface}>
                <View style={styles.row}>
                    <View style={styles.leftRow}>
                        <Image source={{ uri: mergedProduct.data.image }} style={styles.image} />
                        <View style={styles.titleContainer}>
                            <Subheading numberOfLines={3}>{mergedProduct.data.name}</Subheading>
                            <Title>{mergedProduct.data.totalPrice.toFixed(2)} RON</Title>
                        </View>
                    </View>
                    <QuantitySelector quantity={mergedProduct.data.quantity} onQuantityChange={(value) => adjustQuantity(value)} disabled={isLoading} />
                </View>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    surface: {
        elevation: 1,
        borderRadius: 12,
    },
    row: {
        padding: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // overflow: 'scroll',
    },
    image: {
        marginRight: 16,
        resizeMode: 'contain',
        width: 40,
        height: 40,
    },
    titleContainer: {
        flex: 1,
    },
})