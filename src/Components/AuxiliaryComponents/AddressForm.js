import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TextInput, useTheme, Text } from 'react-native-paper'
import { Controller } from "react-hook-form";


export default function AddressForm({ control, errors }) {
    const theme = useTheme()

    return (
        <View>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        style={{ backgroundColor: 'white' }}
                        theme={theme}
                        dense
                        selectionColor={theme.colors.primary}
                        label='Strada * '
                        autoCompleteType='street-address'
                        mode='outlined'
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        keyboardType='default'
                        textContentType='streetAddressLine1'
                        autoCapitalize='words'
                    />
                )}
                name="address.street"
                rules={{ required: true }}
                defaultValue=''
            />
            {errors?.address?.street && <Text style={{ color: theme.colors.error }}>Strada este necesară</Text>}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Număr *'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                        )}
                        name="address.number"
                        rules={{ required: true }}
                        defaultValue=''
                    />
                    {errors?.address?.number && <Text style={{ color: theme.colors.error }}>Numărul este necesar</Text>}
                </View>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Bloc'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                        )}
                        name="address.block"
                        defaultValue=''
                    />
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Etaj'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                        )}
                        name="address.floor"
                        defaultValue=''
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Apartament'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                        )}
                        name="address.apartment"
                        defaultValue=''
                    />
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Interfon'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                                autoCapitalize='none'
                            />
                        )}
                        name="address.intercom"
                        defaultValue=''
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ backgroundColor: 'white' }}
                                theme={theme}
                                dense
                                selectionColor={theme.colors.primary}
                                label='Etichetă *'
                                mode='outlined'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='default'
                            />
                        )}
                        name="address.label"
                        rules={{ required: true }}
                        defaultValue=''
                    />
                    {errors?.address?.label && <Text style={{ color: theme.colors.error }}>Eticheta este necesară</Text>}
                </View>
            </View>
        </View>
    )
}
