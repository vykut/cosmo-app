import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { firebaseConfig } from './FirebaseConfig';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MainComponent from './Components/MainComponent';
import { app } from './utils';
import { CartProvider } from './Components/contexts/CartContext';
import MarketProvider from './Components/contexts/MarketContext';
import ProfileProvider from './Components/contexts/ProfileContext';
import OrderProvider from './Components/contexts/OrderContext';
import * as Facebook from 'expo-facebook'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableClaims: true,
  enableRedirectHandling: false,
}

const firebaseApp = app

firebase.firestore()

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {

}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#32ACAD',
    accent: '#f4C132',
    info: '#212121',
    error: '#DE512B',
    success: '#55DF99',
    text: '#1E1E1E',
    lightText: '#FFFFFF',
  }
};

Facebook.initializeAsync({ appId: '872754790179974', appName: 'CosmoMarket' })

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PaperProvider theme={theme}>
          <ProfileProvider>
            <MarketProvider>
              <CartProvider>
                <OrderProvider>
                  <MainComponent />
                </OrderProvider>
              </CartProvider>
            </MarketProvider>
          </ProfileProvider>
        </PaperProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
