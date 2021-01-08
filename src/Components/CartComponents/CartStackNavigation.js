import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartView from './CartView';
import { stackHeaderStyle } from '../../utils';

const CartStack = createStackNavigator();

export default function CartStackNavigation() {
    return (
        <CartStack.Navigator screenOptions={stackHeaderStyle}>
            <CartStack.Screen name="Coșul meu" component={CartView} />
        </CartStack.Navigator>
    )
}
