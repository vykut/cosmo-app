import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from './ProfileView';
import { stackHeaderStyle } from '../../utils';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigation() {
    // if !isLoaded(auth)
    // return <SplashScreen />

    // if isEmpty(auth)
    // return authStack

    return (
        <ProfileStack.Navigator screenOptions={stackHeaderStyle}>
            <ProfileStack.Screen name='Profil' component={ProfileView} />
        </ProfileStack.Navigator>
    )
}
