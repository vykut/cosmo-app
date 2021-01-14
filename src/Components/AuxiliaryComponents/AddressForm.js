import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { useForm } from "react-hook-form";

export default function AddressForm({ address, setAddress }) {
    const theme = useTheme()
    const { register, handleSubmit, setValue, getValues } = useForm();

    useEffect(() => {
        register('street', { required: true })
        register('number', { required: true })
        register('block')
        register('floor')
        register('apartment')
        register('intercom')
        register('label', { required: true })
    }, [register])

    return (
        <View>
            <TextInput
                label='Strada'
                value={getValues('street')}
                onChangeText={(text) => setValue('street', text)}
                mode='outlined'
                selectionColor={theme.colors.primary}
                dense
                theme={theme}
                style={{ backgroundColor: 'white' }}
            />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    label='Număr'
                    value={getValues('number')}
                    onChangeText={(text) => setValue('number', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                />
                <TextInput
                    label='Bloc'
                    value={getValues('block')}
                    onChangeText={(text) => setValue('block', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    label='Etaj'
                    value={getValues('floor')}
                    onChangeText={(text) => setValue('floor', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                />
                <TextInput
                    label='Apartament'
                    value={getValues('apartment')}
                    onChangeText={(text) => setValue('apartment', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    label='Interfon'
                    value={getValues('intercom')}
                    onChangeText={(text) => setValue('intercom', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                />
                <TextInput
                    label='Etichetă'
                    value={getValues('label')}
                    onChangeText={(text) => setValue('label', text)}
                    mode='outlined'
                    selectionColor={theme.colors.primary}
                    dense
                    theme={theme}
                    style={{ backgroundColor: 'white', flex: 1 }}
                // error={error()}
                />
            </View>
        </View>
    )
}
