import React from 'react'
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useTheme } from 'react-native-paper'
import AddressForm from './AddressForm';

export default function AddressPicker({ onAddressChange }) {
    const auth = useSelector(state => state.firebase.auth)
    const theme = useTheme()

    useFirestoreConnect([{
        collection: 'addresses',
        where: [['userID', '==', auth?.uid]]
    }])

    const addresses = useSelector(
        ({ firestore }) => firestore.data.addresses && Object.entries(firestore.data.addresses).filter(x => x[1])
            .map(x => { return { label: x[1].label, value: x[0] } }) || []
    )

    const setAddress = (item) => {
        onAddressChange(item)
    }

    return (
        <View>
            <DropDownPicker
                items={[...addresses, { label: 'Adresă nouă', value: 'new' }]}
                placeholder='Selectează adresa de livrare'
                itemStyle={{ justifyContent: 'center' }}
                labelStyle={{ color: theme.colors.text }}
                onChangeItem={setAddress}
            />
            <AddressForm />
        </View>
    )
}
