import React, { useEffect, useMemo } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useFirebase } from 'react-redux-firebase'
import { Button, useTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileView() {
    const navigation = useNavigation()
    const theme = useTheme()
    const firebase = useFirebase()

    const buttons = useMemo(() => {
        return [
            {
                title: 'Date personale',
                action: () => navigation.navigate('PersonalData')
            },
            {
                title: 'Adrese livrare',
                action: () => navigation.navigate('Addresses')
            },
            {
                title: 'Istoric comenzi',
                action: () => navigation.navigate('OrdersHistory')
            },
            {
                title: 'Termeni și condiții',
                action: () => navigation.navigate('CosmoMarketWebView', { url: 'termeni-si-conditii', title: 'Termeni și condiții' })
            },
            {
                title: 'Politica cookie',
                action: () => navigation.navigate('CosmoMarketWebView', { url: 'politica-cookie', title: 'Politica cookie' })
            },
            {
                title: 'GDPR',
                action: () => navigation.navigate('CosmoMarketWebView', { url: 'gdpr', title: 'GDPR' })
            },
            {
                title: 'Despre noi',
                action: () => navigation.navigate('CosmoMarketWebView', { url: 'despre-noi', title: 'Despre noi' })
            },
        ]
    }, [navigation])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ padding: 8 }}>
                {buttons.map(({ title, action }, index) => <Button
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={styles.buttonLabelStyle}
                    color='white'
                    mode='contained'
                    onPress={action}
                    icon='chevron-right'
                    key={index}
                >
                    {title}
                </Button>)}
                <Button
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={{ color: 'white' }}
                    color={theme.colors.error}
                    mode='contained'
                    onPress={() => firebase.logout()}
                    icon='exit-to-app'
                >
                    Deconectare
                </Button>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 24,
        marginHorizontal: 24,
        marginVertical: 8,
    },
    buttonLabelStyle: {
        color: 'black'
    },
    buttonContentStyle: {
        flex: 1,
        flexDirection: 'row-reverse',
        height: 48,
    }
})