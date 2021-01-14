import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Image, useWindowDimensions } from 'react-native'
import { Button, Surface, useTheme, IconButton, Paragraph, Title, Headline, Text, } from 'react-native-paper'
import { aspectRatio, colors, firebaseFunctions } from '../../utils'
import { useCartContext } from '../CartContext'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import QuantitySelector from '../AuxiliaryComponents/QuantitySelector'


export default function ProductView() {
    const cartContext = useCartContext()
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
    const windowDimensions = useWindowDimensions()
    const theme = useTheme()
    const profile = useSelector(state => state.firebase.profile)
    const navigation = useNavigation()
    const route = useRoute()
    const functions = firebaseFunctions

    const product = route.params.product

    const stock = product.data.stock

    useEffect(() => {
        if (!stock) {
            setIsLoading(true)
        }
    }, [stock])

    const favoriteProducts = profile?.favoriteProducts || []

    useLayoutEffect(() => {
        navigation.setOptions({ title: product.data.name })
    }, [navigation, product.data.name])

    const addProductToCart = async () => {
        setIsLoading(true)
        try {
            await cartContext.addProductToCart(product.id, product.data.price, quantity)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const addToFavorite = async () => {
        setIsFavoriteLoading(true)
        try {
            await functions.httpsCallable('favoriteProduct')({ id: product.id })
        } catch (err) {
            console.log(err)
        } finally {
            setIsFavoriteLoading(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scroll}>
                <Surface style={styles.surface}>
                    <Image source={{ uri: product.data.image }} style={{ ...styles.image, width: windowDimensions.width - 64, height: windowDimensions.width - 64 }} />
                    <View style={styles.favoriteStockContainer}>
                        <IconButton
                            icon={favoriteProducts.includes(product.id) ? 'heart' : 'heart-outline'}
                            color={theme.colors.error}
                            size={24}
                            onPress={addToFavorite}
                            disabled={isFavoriteLoading}
                        />
                        <Paragraph>Favorite</Paragraph>
                        <AntDesign name="database" size={24} color={stock ? theme.colors.text : theme.colors.error} style={{ marginLeft: 16 }} />
                        <Paragraph style={{ marginLeft: 8, color: stock ? theme.colors.text : theme.colors.error }}>{stock ? 'În stoc' : 'Nu este în stoc'}</Paragraph>
                    </View>
                </Surface>
                <Title>{product.data.name}</Title>
                <Paragraph>{product.data.description}</Paragraph>
                <View style={styles.bottomContainer}>
                    <View style={styles.priceQuantityContainer}>
                        <Title style={{ color: theme.colors.error }}>{product.data.price.toFixed(2)} RON</Title>
                        <QuantitySelector quantity={quantity} onQuantityChange={(value) => setQuantity(q => q + value)} />
                    </View>
                    <Button disabled={isLoading} onPress={addProductToCart} style={styles.addToCartButton} mode='contained' icon='cart' labelStyle={{ color: theme.colors.lightText, textTransform: 'none' }} contentStyle={{ height: 40, width: '100%', flexDirection: 'row-reverse' }}>
                        Adaugă în coș
                </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // height: '100%'
    },
    scroll: {
        padding: 24,
        // flex: 1,
        // height: '100%',

    },
    surface: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 1,
        position: 'relative',
        marginBottom: 16,
    },
    image: {
        margin: 8,
        resizeMode: 'contain',
    },
    favoriteStockContainer: {
        padding: 8,
        backgroundColor: '#F7F7F7',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    priceQuantityContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addToCartButton: {
        marginTop: 8,
        borderRadius: 24,
        marginBottom: 49,
    }
})