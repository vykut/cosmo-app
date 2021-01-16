import React from 'react'
import { View } from 'react-native'
import { TextInput, Text, useTheme } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

export default function ContactInformation({ control, errors }) {
    const theme = useTheme()
    const profile = useSelector(state => state.firebase.profile)

    if (!isLoaded(profile))
        return null

    return (
        <View>
            <Controller
                control={control}
                render={({ onChange, value }) => <TextInput
                    label='Telefon'
                    onChangeText={text => onChange(text)}
                    value={value}
                    dense
                    mode='outlined'
                    style={{ backgroundColor: 'white' }}
                />
                }
                name='profile.phone'
                defaultValue={profile?.phone}
                rules={{ required: true }}
            />
            {errors?.profile?.phone && <Text style={{ color: theme.colors.error }}>Telefonul este necesar</Text>}
            <Controller
                control={control}
                render={({ onChange, value }) => <TextInput
                    label='Prenume'
                    onChangeText={text => onChange(text)}
                    value={value}
                    dense
                    mode='outlined'
                    style={{ backgroundColor: 'white' }}
                />
                }
                name='profile.firstName'
                defaultValue={profile?.firstName}
                rules={{ required: true }}
            />
            {errors?.profile?.firstName && <Text style={{ color: theme.colors.error }}>Prenumele este necesar</Text>}
        </View>
    )
}
