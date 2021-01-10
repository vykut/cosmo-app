import React, { useLayoutEffect, useMemo, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Text, Headline, Title, Subheading, Button, useTheme } from 'react-native-paper'
import PriceFilter from './PriceFilter'

export default function FilterModal() {
    const navigation = useNavigation()
    const route = useRoute()

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Filtrează' })
    })

    function Section({ title, children, TextComponent, filterName }) {
        const navigation = useNavigation()
        const route = useRoute()
        const theme = useTheme()

        const removeFilter = () => {
            navigation.setParams({
                filter: {
                    ...route.params.filter,
                    [filterName]: null,
                }
            })
        }

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <TextComponent>
                        {title}
                    </TextComponent>
                    {route.params.filter?.[filterName] && <Button mode='text' color={theme.colors.error} icon='close' contentStyle={{ flexDirection: 'row-reverse' }} labelStyle={{ textTransform: 'none', marginRight: 8 }} onPress={removeFilter}>Elimină</Button>}
                </View>
                {children}
            </View>
        )
    }

    const subsections = [
        {
            title: 'Preț',
            TextComponent: Title,
            children: <PriceFilter />,
            filterName: 'price',
        }
    ]

    const sections = [
        {
            title: 'Filtrează',
            TextComponent: Headline,
            children: subsections.map((subsection) => <Section {...subsection} key={subsection.title} />),
        }, {
            title: 'Sortează',
            TextComponent: Headline,
            children: null,
        }
    ]

    return (
        <View>
            <ScrollView>
                {sections.map((section) => <Section {...section} key={section.title} />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        margin: 8,
    },
    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})