import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { stackHeaderStyle } from '../../utils';
import { useTheme } from 'react-native-paper';
import { Button, IconButton } from 'react-native-paper'
import CartStackNavigation from './CartStackNavigation';
import OrderDetailsView from './OrderDetailsView';


const CartModalStack = createStackNavigator();


export default function CartModalNavigation(props) {
    const theme = useTheme()

    function modalAction({ navigation, route }) {
        return {
            // headerLeft: () => <Button labelStyle={{ textTransform: 'none' }} color={theme.colors.accent} onPress={() => navigation.goBack()} >
            //     Înapoi
            // </Button>,
            title: 'Detalii comandă',
            headerBackTitle: 'Coș'
        }
    }

    return (
        <CartModalStack.Navigator mode='modal' screenOptions={stackHeaderStyle}>
            <CartModalStack.Screen name='CartStack' component={CartStackNavigation} options={{ headerShown: false, }} />
            <CartModalStack.Screen name='OrderModal' component={OrderDetailsView} options={modalAction} />
        </CartModalStack.Navigator>
    )
}