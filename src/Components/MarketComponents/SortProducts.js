import React from 'react'
import { View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const sortOptions = [
    {
        title: 'Adăugate recent',
        option: 1
    },
    {
        title: 'Preț crescător',
        option: 2
    },
    {
        title: 'Preț descrescător',
        option: 3
    },
    {
        title: 'Alfabetic A - Z',
        option: 4
    },
    {
        title: 'Alfabetic Z - A',
        option: 5
    },
]

export default function SortProducts() {
    const route = useRoute()
    const navigation = useNavigation()

    const setSort = (option) => {
        navigation.setParams({ sort: option })
    }


    return (
        <View>
            <RadioButton.Group onValueChange={setSort} value={route.params?.sort} >
                {sortOptions.map((option) => <RadioButton.Item value={option.option} label={option.title} key={option.option} />)}
            </RadioButton.Group>
        </View>
    )
}
