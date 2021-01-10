import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MarketProvider from './MarketContext/MarketContext';
import MarketStackNavigation from './MarketStackNavigation';
import FilterModal from './FilterModal';
import { cosmoTheme, stackHeaderStyle } from '../../utils';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native'


const MarketModalStack = createStackNavigator();


export default function MarketModalNavigation() {
    const theme = useTheme()

    function headerActions({ navigation, route }) {
        return {
            headerLeft: () => <Button labelStyle={{ textTransform: 'none' }} color={theme.colors.accent} onPress={() => navigation.goBack()} title='Anulează' />,
            headerRight: () => <Button labelStyle={{ textTransform: 'none' }} color={theme.colors.accent} onPress={() => navigation.navigate('Products', route.params)} title='Aplică' />,
        }
    }

    return (
        <MarketProvider>
            <MarketModalStack.Navigator mode='modal' screenOptions={stackHeaderStyle}>
                <MarketModalStack.Screen name='MarketStack' component={MarketStackNavigation} options={{ headerShown: false }} />
                <MarketModalStack.Screen name='FilterModal' component={FilterModal} options={headerActions} />
            </MarketModalStack.Navigator>
        </MarketProvider>
    )
}
