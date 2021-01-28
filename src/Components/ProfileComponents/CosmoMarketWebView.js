import React, { useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview'
import { cosmoMarketWebsiteURL } from '../../utils';


export default function CosmoMarketWebView() {
    const route = useRoute()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        if (route.params?.title)
            navigation.setOptions({ title: route.params.title })
    })

    if (!route.params?.url)
        return null

    return (
        <WebView source={{ uri: `${cosmoMarketWebsiteURL}/${route.params.url}` }} />
    )
}
