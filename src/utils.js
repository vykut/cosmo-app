import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { firebaseConfig } from './FirebaseConfig'


export const app = firebase.initializeApp(firebaseConfig)

export const firestoreDB = app.firestore()
export const firebaseFunctions = app.functions('europe-west1')

export const colors = {
    primary: '#32ACAD',
    accent: '#f4C132',
    info: '#212121',
    error: '#DE512B',
    success: '#55DF99',
    lightText: '#FFFFFF',
    darkText: '#1E1E1E',
    background: '#F7FFFF',
}

export const stackHeaderStyle = {
    headerStyle: {
        backgroundColor: '#32ACAD'
    },
    headerTitleStyle: {
        color: '#FFFFFF'
    }
}

export const bottomTabStyle = {
    activeTintColor: colors.primary
}