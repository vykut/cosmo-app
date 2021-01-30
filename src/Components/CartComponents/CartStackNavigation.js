import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartView from './CartView';
import { stackHeaderStyle } from '../../utils';
import ReviewOrderView from './ReviewOrderView';
import OrderDetailsView from './OrderDetailsView';
import { IconButton, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import CosmoMarketWebView from '../ProfileComponents/CosmoMarketWebView';

const CartStack = createStackNavigator();

export default function CartStackNavigation() {
    const theme = useTheme()
    const profile = useSelector(state => state.firebase.profile)
    const auth = useSelector(state => state.firebase.auth)

    function cartAction({ navigation, route }) {
        return {
            headerRight: () => profile?.orderInProgress && <IconButton icon='moped' color={theme.colors.accent} onPress={() => navigation.navigate('OrderModal')} />,
        }
    }

    return (
        <CartStack.Navigator screenOptions={stackHeaderStyle}>
            {profile?.orderInProgress ?
                <CartStack.Screen name="OrderDetails" component={OrderDetailsView} options={{ title: 'Detalii comandă' }} />
                :
                <>
                    <CartStack.Screen name="Cart" component={CartView} options={cartAction} />
                    {!isEmpty(auth) && <CartStack.Screen name="OrderReview" component={ReviewOrderView} />}
                </>
            }
            <CartStack.Screen name='CosmoMarketWebView' component={CosmoMarketWebView} />
        </CartStack.Navigator>
    )
}
