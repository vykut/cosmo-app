import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { IconButton, Text, useTheme } from 'react-native-paper'
import CategoriesRow from './CategoriesRow';
import { useMarketContext } from '../contexts/MarketContext';
import ProductsRow from '../ProductComponents/ProductsRow';
import ClosedStoreBanner from '../AuxiliaryComponents/ClosedStoreBanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import ContactModal from '../AuxiliaryComponents/ContactModal';


export default function MarketView() {
    const marketContext = useMarketContext()
    const navigation = useNavigation()
    const theme = useTheme()
    const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon='information-outline' color={theme.colors.accent} onPress={() => setModalVisible(true)} />
        })
    })

    return (
        <>
            <View style={styles.mainContainer}>
                <ClosedStoreBanner />
                <ContactModal visible={modalVisible} hide={() => setModalVisible(false)} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {marketContext.categoriesRows.map((categoryRow, index) => <CategoriesRow {...categoryRow} key={index} />)}
                    {marketContext.productsRows.map((productRow, index) => <ProductsRow {...productRow} key={index} />)}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
});
