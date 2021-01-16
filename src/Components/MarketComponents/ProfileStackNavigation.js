import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileView from './ProfileView';
import { stackHeaderStyle } from '../../utils';
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Login from '../LoginComponents/Login';
import SignUp from '../LoginComponents/SignUp';
import ResetPassword from '../LoginComponents/ResetPassword';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigation() {
    const auth = useSelector(state => state.firebase.auth)

    return (
        <ProfileStack.Navigator screenOptions={stackHeaderStyle}>
            {isEmpty(auth) ?
                <>
                    <ProfileStack.Screen name='Login' component={Login} options={{ title: 'Conectează-te', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                    <ProfileStack.Screen name='Signup' component={SignUp} options={{ title: 'Creează cont', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                    <ProfileStack.Screen name='ResetPassword' component={ResetPassword} options={{ title: 'Resetează parola', animationTypeForReplace: isEmpty(auth) ? 'pop' : 'push' }} />
                </>
                :
                <>
                    <ProfileStack.Screen name='Profil' component={ProfileView} />
                </>
            }
        </ProfileStack.Navigator>
    )
}
