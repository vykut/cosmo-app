import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useCartContext } from '../CartContext'
import ProductsList from '../ProductComponents/ProductsList'
import { Button, useTheme, Surface, Headline } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'


export default function CartView() {
    const cartContext = useCartContext()
    const theme = useTheme()
    const navigation = useNavigation()
    const auth = useSelector(state => state.firebase.auth)
    const cart = cartContext.getCart()

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Coșul meu' })
    }, [navigation])

    const goToOrderDetails = () => {
        if (isEmpty(auth)) {
            navigation.navigate('Profile', {
                screen: 'LoginOnboarding',
            })
        } else {
            navigation.navigate('OrderReview')
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <ProductsList />
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Surface style={{ elevation: 1, borderTopStartRadius: 36, borderTopRightRadius: 36 }}>
                    <View style={{ padding: 16 }}>
                        <Headline style={{ textAlign: 'right' }}>{`Total: ${cart.totalPrice.toFixed(2)} RON`}</Headline>
                        <Button
                            mode='contained'
                            color={theme.colors.primary}
                            labelStyle={{ textTransform: 'none', color: theme.colors.lightText }}
                            contentStyle={{ height: 48, flexDirection: 'row-reverse' }}
                            style={{ borderRadius: 24, marginTop: 16 }}
                            icon='chevron-right'
                            onPress={goToOrderDetails}
                        >
                            Continuă
                        </Button>
                    </View>
                </Surface>
            </View>
        </View>
    )
}
