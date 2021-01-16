import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ProgressBar, Text, Headline, Subheading, Button, useTheme } from 'react-native-paper'
import { colors } from '../../utils'
import { useMarketContext } from '../contexts/MarketContext'

export default function RowContainer({ children, navigation, category, title, sort }) {
    const theme = useTheme()
    const marketContext = useMarketContext()

    const seeAll = () => {
        navigation.navigate('Products', {
            currentCategory: category,
            sort,
        })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.rowTitle}>
                <Subheading>
                    {category ? category.data.name : title}
                </Subheading>
                <Button mode='text' icon='chevron-right' contentStyle={{ flexDirection: 'row-reverse' }} labelStyle={{ textTransform: 'none' }} onPress={seeAll}>
                    Vezi toate
                </Button>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        // margin: 8
        marginVertical: 8,
    },
    rowTitle: {
        marginLeft: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    scrollView: {
        paddingVertical: 4,
    }
})