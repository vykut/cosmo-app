import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CartView from './CartView';
import { stackHeaderStyle } from '../../utils';
import ReviewOrderView from './ReviewOrderView';
import OrderDetailsView from './OrderDetailsView';

const CartStack = createStackNavigator();

export default function CartStackNavigation() {
    return (
        <CartStack.Navigator screenOptions={stackHeaderStyle}>
            <CartStack.Screen name="Cart" component={CartView} />
            <CartStack.Screen name="OrderReview" component={ReviewOrderView} />
            <CartStack.Screen name='OrderDetails' component={OrderDetailsView} />
        </CartStack.Navigator>
    )
}
