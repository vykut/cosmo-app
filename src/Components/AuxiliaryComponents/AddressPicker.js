import React, { useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from 'react-native-paper'
import AddressForm from './AddressForm';
import { useProfileContext } from '../contexts/ProfileContext';
import { Controller } from "react-hook-form";
import AddressMapPicker from './AddressMapPicker';


export default function AddressPicker(form) {
    // const [region, setRegion] = useState(initialCoords)
    const theme = useTheme()
    const profileContext = useProfileContext()

    const initialItem = useMemo(() => {
        return { label: 'Adresă nouă', value: 'new' }
    }, [])

    const addresses = profileContext.addresses?.map((address) => { console.log(address); return { label: address.data.label, value: address.id } }) || []
    // const items = addresses && [...addresses, initialItem]

    return (
        <View>
            <Controller
                control={form.control}
                render={({ onChange, value }) => <DropDownPicker
                    items={[...addresses, initialItem]}
                    placeholder='Selectează adresa de livrare'
                    itemStyle={{ justifyContent: 'center' }}
                    labelStyle={{ color: theme.colors.text }}
                    onChangeItem={(item) => {
                        onChange(item.value)
                        if (item.value === 'new') {
                            if (!value)
                                return
                            form.setValue('address', {
                                number: '',
                                block: '',
                                floor: '',
                                apartment: '',
                                intercom: '',
                                label: '',
                            })
                        } else {
                            const address = profileContext.getAddressByID(item.value)?.data
                            form.setValue('address', address)
                            form.setValue('coords', {
                                latitude: address?.latitude || 44.535417803832146,
                                longitude: address?.longitude || 26.17188568471457,
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            })
                            form.clearErrors()
                        }
                    }}
                />}
                name='addressID'
                rules={{ required: true }}
            >
            </Controller>
            {form.errors.addressID && <Text style={{ color: theme.colors.error }}>Selectează o adresă</Text>}
            <AddressMapPicker {...form} />
            <AddressForm {...form} />
        </View>
    )
}
