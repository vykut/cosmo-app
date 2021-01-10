import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MarketView from './MarketView';
import ProductsView from './ProductsView';
import ProductView from './ProductView';
import { stackHeaderStyle } from '../../utils';

const MarketStack = createStackNavigator();

export default function MarketStackNavigation() {
    return (
        <MarketStack.Navigator screenOptions={stackHeaderStyle}>
            <MarketStack.Screen name='Market' component={MarketView} />
            <MarketStack.Screen name='Products' component={ProductsView} />
            <MarketStack.Screen name='Product' component={ProductView} />
        </MarketStack.Navigator>
    )
}
