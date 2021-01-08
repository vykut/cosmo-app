import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MarketView from './MarketView';
import ProductsView from './ProductsView';
import ProductView from './ProductView';
import { stackHeaderStyle } from '../../utils';
import MarketProvider from './MarketContext/MarketContext';

const MarketStack = createStackNavigator();

export default function MarketStackNavigation() {
    return (
        <MarketProvider>
            <MarketStack.Navigator screenOptions={stackHeaderStyle}>
                <MarketStack.Screen name='Market' component={MarketView} />
                <MarketStack.Screen name='Products' component={ProductsView} />
                <MarketStack.Screen name='Product' component={ProductView} />
            </MarketStack.Navigator>
        </MarketProvider>
    )
}
