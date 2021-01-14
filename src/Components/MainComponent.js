import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartStackNavigation from './CartComponents/CartStackNavigation';
import ProfileStackNavigation from './ProfileComponents/ProfileStackNavigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { bottomTabStyle, colors, cosmoTheme } from '../utils';
import { useCartContext } from './CartContext';
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import MarketModalNavigation from './MarketComponents/MarketModalNavigation';
import SplashScreen from './AuxiliaryComponents/SplashScreen';



const Tab = createBottomTabNavigator();

export default function MainComponent() {
    const cartContext = useCartContext()
    const auth = useSelector(state => state.firebase.auth)


    if (!isLoaded(auth))
        return <SplashScreen />

    return (
        <NavigationContainer theme={cosmoTheme} >
            <Tab.Navigator tabBarOptions={bottomTabStyle}>
                <Tab.Screen name="Market" component={MarketModalNavigation} options={{
                    tabBarIcon: ({ color, size, ...props }) => {
                        return <MaterialCommunityIcons name='storefront-outline' size={size} color={color} />
                    }
                }} />
                <Tab.Screen name="Cart" component={CartStackNavigation} options={{
                    tabBarIcon: ({ color, size, ...props }) => {
                        return <MaterialCommunityIcons name='cart-outline' size={size} color={color} />
                    },
                    tabBarBadge: cartContext.getCart()?.quantity,
                    tabBarBadgeStyle: { backgroundColor: colors.accent, color: colors.darkText }
                }} />
                <Tab.Screen name="Profile" component={ProfileStackNavigation} options={{
                    tabBarIcon: ({ color, size, ...props }) => {
                        return <MaterialCommunityIcons name='account-circle-outline' size={size} color={color} />
                    }
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
