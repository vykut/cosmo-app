/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'

const MarketContext = React.createContext()

export function useMarketContext() {
    return useContext(MarketContext)
}

export default function MarketProvider({ children }) {
    const [recentProducts, setRecentProducts] = useState([])


    useFirestoreConnect({
        collection: 'products',
        where: [['enabled', '==', true], ['stock', '==', true]]
    })

    const products = useSelector(
        ({ firestore }) => firestore.data.products && Object.entries(firestore.data.products)
            .map((product) => { return { id: product[0], data: product[1] } })
    )

    useEffect(() => {
        console.log(products)
        if (!isEmpty(products)) {
            setRecentProducts([...products].sort((a, b) => {
                // console.log(a.data.createdAt > b.data.createdAt)
                if (a.data.createdAt >= b.data.createdAt)
                    return -1
                return 1
            }))
        }
    }, [products])

    const value = {
        //vars
        products,
        recentProducts,

        //functions
    }

    return (
        <MarketContext.Provider value={value}>
            {children}
        </MarketContext.Provider>
    )
}

