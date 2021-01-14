import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text, Paragraph, Subheading, Surface, Caption, IconButton, useTheme } from 'react-native-paper'
import { imageHeight, imageWidth } from '../../utils'
import { useCartContext } from '../CartContext'
import { useNavigation, useRoute } from '@react-navigation/native';



export default function ProductBox({ product }) {
    const [isLoading, setIsLoading] = useState(false)
    const cartContext = useCartContext()
    const theme = useTheme()
    const navigation = useNavigation()

    const addProductToCart = async () => {
        setIsLoading(true)
        await cartContext.addProductToCart(product.id, product.data.price)
        setIsLoading(false)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.box}>
                <Surface style={styles.surface}>
                    <Pressable onPress={() => navigation.navigate('Product', { product })}>
                        <Image source={{ uri: product.data.image }} style={styles.image} />
                    </Pressable>
                    <IconButton icon='plus' color={theme.colors.primary} onPress={addProductToCart} style={styles.plus} disabled={isLoading} />
                </Surface>
                <Caption>{product.data.name}</Caption>
                <Paragraph style={{ fontWeight: 'bold' }}>
                    {product.data.price} RON
                </Paragraph>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {

    },
    box: {
        width: imageWidth + 16,
        marginHorizontal: 8,
    },
    surface: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 1,
        position: 'relative',
        paddingBottom: 24,
    },
    image: {
        margin: 8,
        marginBottom: 0,
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'contain',
    },
    plus: {
        position: 'absolute',
        bottom: -10,
        right: -10,
    }
})
