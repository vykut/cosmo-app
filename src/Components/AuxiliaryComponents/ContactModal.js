import React from 'react'
import { View, Text, Modal, Linking, Platform, StyleSheet } from 'react-native'
import { Button, Subheading, Title, useTheme } from 'react-native-paper'
import { isEmpty } from 'react-redux-firebase'
import { colors } from '../../utils'
import { useCartContext } from '../contexts/CartContext'
import TitleSurface from './TitleSurface'
import { BlurView } from 'expo-blur';


export default function ContactModal({ visible, hide }) {
    const cartContext = useCartContext()
    const market = cartContext.cosmoMarketStore
    const theme = useTheme()

    if (isEmpty(market))
        return null

    return (
        <Modal
            animationType='slide'
            onRequestClose={() => { console.log('modal closed') }}
            supportedOrientations={['portrait']}
            transparent={true}
            visible={visible}
        >
            <BlurView style={{
                flex: 1, justifyContent: "center", alignItems: 'center', padding: 35
            }}>
                <View style={styles.modalView}>
                    <TitleSurface title='Orar'>
                        <Subheading>
                            {`L - V: ${market.openHour || 10} - ${market.closeHour || 23}`}
                        </Subheading>
                        <Subheading>
                            {`S - D: ${market.weekendOpenHour || 12} - ${market.weekendCloseHour || 21}`}
                        </Subheading>
                    </TitleSurface>
                    <TitleSurface title='Ne poți contacta la'>
                        <Subheading >
                            Telefon: <Subheading style={{ color: theme.colors.primary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL(`tel:${market?.phone || '0733287301'}`)}>{market?.phone || '0733287301'}</Subheading>
                        </Subheading>
                        <Subheading>
                            Email: <Subheading style={{ color: theme.colors.primary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL(`mailto:${market?.email || 'cosmo.market.firebase@gmail.com'}`)}>{market?.email || 'cosmo.market.firebase@gmail.com'}</Subheading>
                        </Subheading>
                        <Subheading>
                            Adresă: <Subheading style={{ color: theme.colors.primary, textDecorationLine: 'underline' }} onPress={() => Platform.OS === 'ios' ?
                                Linking.openURL(`http://maps.apple.com/?daddr=${market?.address}`)
                                :
                                Linking.openURL(`http://maps.google.com/?daddr=${market?.address}`)
                            }>{market?.address}</Subheading>
                        </Subheading>
                    </TitleSurface>
                    <Button mode='contained' color={theme.colors.primary} labelStyle={{ color: 'white' }} style={{ marginHorizontal: 'auto', marginTop: 8, borderRadius: 17 }} onPress={hide}>
                        Închide
                    </Button>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        // margin: 20,
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 15,
        // alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})