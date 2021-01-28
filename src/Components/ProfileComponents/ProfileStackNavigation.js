import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from './ProfileView';
import { stackHeaderStyle } from '../../utils';
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Login from '../LoginComponents/Login';
import SignUp from '../LoginComponents/SignUp';
import ResetPassword from '../LoginComponents/ResetPassword';
import LoginOnboarding from '../LoginComponents/LoginOnboarding';
import PersonalDataView from './PersonalDataView';
import ProfileAddressesView from './ProfileAddressesView';
import OrdersHistoryView from './OrdersHistoryView';
import PastOrder from './PastOrder';
import CosmoMarketWebView from './CosmoMarketWebView';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigation() {
    const auth = useSelector(state => state.firebase.auth)



    // if (isEmpty(auth))
    // return authStack
    // animationTypeForReplace: state.isSignout ? 'pop' : 'push'

    return (
        <ProfileStack.Navigator screenOptions={stackHeaderStyle}>
            {isEmpty(auth) ?
                <>
                    {/* <ProfileStack.Screen name='LoginOnboarding' component={LoginOnboarding} options={{ headerShown: false, animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} /> */}
                    <ProfileStack.Screen name='Login' component={Login} options={{ title: 'Conectează-te', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                    <ProfileStack.Screen name='Signup' component={SignUp} options={{ title: 'Creează cont', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                    <ProfileStack.Screen name='ResetPassword' component={ResetPassword} options={{ title: 'Resetează parola', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                </>
                :
                <>
                    <ProfileStack.Screen name='Profile' component={ProfileView} options={{ title: 'Profil' }} />
                    <ProfileStack.Screen name="PersonalData" component={PersonalDataView} options={{ title: 'Date personale' }} />
                    <ProfileStack.Screen name="Addresses" component={ProfileAddressesView} options={{ title: 'Adrese livrare' }} />
                    <ProfileStack.Screen name="OrdersHistory" component={OrdersHistoryView} options={{ title: 'Istoric comenzi' }} />
                    <ProfileStack.Screen name="PastOrder" component={PastOrder} options={{ title: 'Detalii comandă' }} />
                </>
            }
            <ProfileStack.Screen name='CosmoMarketWebView' component={CosmoMarketWebView} />
        </ProfileStack.Navigator>
    )
}
