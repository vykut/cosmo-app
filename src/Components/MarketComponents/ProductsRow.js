import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { isEmpty } from 'react-redux-firebase'

export default function ProductsRow({ products }) {

    console.log(products)

    if (!products.length)
        return null

    return (
        <View>
            {products.map((product) => {
                <Text>{product.data.name}</Text>
            })}
        </View>
    )
}
