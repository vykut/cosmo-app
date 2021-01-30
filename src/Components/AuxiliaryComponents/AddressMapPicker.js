import React, { useMemo, useState } from 'react'
import { View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geocode from "react-geocode";
import { Controller } from "react-hook-form";
import { ActivityIndicator, useTheme } from 'react-native-paper';


Geocode.setApiKey("AIzaSyA-etyc9vfV3PGWCImKKgVTZZy5Cw0pWDI");
Geocode.setLanguage("ro");
Geocode.setRegion("ro");
// Geocode.enableDebug();

export default function AddressMapPicker({ control, setValue }) {
    const [isShowing, setIsShowing] = useState(false)
    const [defaultChange, setDefaultChange] = useState(true)

    const theme = useTheme()

    const setAddress = async ({ latitude, longitude }) => {
        try {
            setIsShowing(true)
            const result = await Geocode.fromLatLng(latitude, longitude)
            const addresses = result?.results?.map((result) => { return { address: result?.formatted_address, street: result?.address_components?.filter(res => res?.types?.[0] === 'route')?.[0]?.long_name } }).filter(x => x.street)
            const address = addresses?.[0]
            const street = address?.street
            setValue('address.street', street)
        } catch (err) {
            console.log(err)
        } finally {
            setIsShowing(false)
        }
    }

    return (
        <View style={{ marginVertical: 8, borderRadius: 8 }}>
            {/* <Text>Alege locația pe hartă</Text> */}
            <Controller
                control={control}
                render={({ onChange, value }) =>
                    <View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            showsBuildings={false}
                            showsCompass={true}
                            showsIndoors={false}
                            rotateEnabled={false}
                            pitchEnabled={false}
                            mapType='hybrid'
                            showsIndoorLevelPicker={false}
                            style={{ width: 'auto', height: 300, borderRadius: 8 }}
                            onRegionChangeComplete={async (coords) => {
                                if (defaultChange)
                                    setDefaultChange(false)
                                else {
                                    onChange(coords)
                                    await setAddress(coords)
                                }
                            }}
                            region={value}
                        />
                        {isShowing && <View style={{ width: 'auto', height: 300, backgroundColor: 'black', opacity: 0.2, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }} />}
                        {isShowing ? <ActivityIndicator
                            animating={true}
                            color={theme.colors.error}
                            size='large'
                            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
                        /> : <Image
                                source={require('../../../assets/marker.png')}
                                style={{ position: 'absolute', left: '50%', bottom: '50%', marginLeft: -27, marginBottom: -8 }}
                            />}
                    </View>
                }
                name='coords'
                defaultValue={{
                    latitude: 44.535417803832146,
                    longitude: 26.17188568471457,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }}
            />
        </View>
    )
}
