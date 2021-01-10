import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Subheading } from 'react-native-paper'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useMarketContext } from './MarketContext/MarketContext'
import { useWindowDimensions } from 'react-native';

export default function PriceFilter() {
    const route = useRoute()
    const navigation = useNavigation()
    const marketContext = useMarketContext()
    const [maxPrice, setMaxPrice] = useState(350)
    const [labelPrice, setLabelPrice] = useState(route.params?.filter?.price)
    const window = useWindowDimensions()

    var price = route.params?.filter?.price

    const products = marketContext.products

    useEffect(() => {
        if (products && products.length) {
            var price = products.reduce((acc, curr) => curr.data &&
                curr.data.price > acc ? Math.ceil(curr.data.price) : acc
                , 0)
            price = price + 1
            setMaxPrice(price)
        }
    }, [products])

    const setPriceFilter = (values) => {
        if (values[0] === 0 && values[1] === maxPrice) {
            navigation.setParams({
                filter: {
                    ...route.params?.filter,
                    price: null,
                }
            })
        }
        else {
            navigation.setParams({
                filter: {
                    ...route.params?.filter,
                    price: values,
                }
            })
        }
    }

    const setPriceLabels = (values) => {
        setLabelPrice(values)
    }


    return (
        <View style={styles.mainContainer}>
            <MultiSlider
                min={0}
                max={maxPrice}
                values={price || [0, maxPrice]}
                step={1}
                onValuesChangeFinish={setPriceFilter}
                onValuesChange={setPriceLabels}
                sliderLength={window.width - 64}
            />
            <View style={styles.labels} >
                <Subheading>
                    {labelPrice?.[0] ? labelPrice[0] : 0}
                </Subheading>
                <Subheading>
                    RON
                </Subheading>
                <Subheading>
                    {labelPrice?.[1] ? labelPrice[1] : maxPrice}
                </Subheading>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    labels: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})