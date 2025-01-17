import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MarketProvider from '../contexts/MarketContext';
import MarketStackNavigation from './MarketStackNavigation';
import FilterModal from './FilterModal';
import { cosmoTheme, stackHeaderStyle } from '../../utils';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper'


const MarketModalStack = createStackNavigator();


export default function MarketModalNavigation(props) {
    const theme = useTheme()

    // console.log(props, 'modal nav')

    function headerActions({ navigation, route }) {
        return {
            headerLeft: () => <Button labelStyle={{ textTransform: 'none' }} color={theme.colors.accent} onPress={() => navigation.goBack()} >
                Anulează
            </Button>,
            headerRight: () => <Button labelStyle={{ textTransform: 'none' }} color={theme.colors.accent} onPress={() => navigation.navigate('Products', route.params)}>
                Aplică
            </Button>,
        }
    }

    return (

        <MarketModalStack.Navigator mode='modal' screenOptions={stackHeaderStyle}>
            <MarketModalStack.Screen name='MarketStack' component={MarketStackNavigation} options={{ headerShown: false }} />
            <MarketModalStack.Screen name='FilterModal' component={FilterModal} options={headerActions} />
        </MarketModalStack.Navigator>
    )
}
