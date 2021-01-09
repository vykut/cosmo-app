/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'

const MarketContext = React.createContext()

export function useMarketContext() {
    return useContext(MarketContext)
}



export default function MarketProvider({ children }) {
    // const [recentProducts, setRecentProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useFirestoreConnect({
        collection: 'categories',
        where: [['enabled', '==', true]]
    })

    const categories = useSelector(
        ({ firestore }) => firestore.data.categories && Object.entries(firestore.data.categories)
            .map((category) => { return { id: category[0], data: category[1] } })
    )

    const mainCategories = isEmpty(categories) ? [] : categories.filter((category) => category.data.mainCategory)

    const getChildrenCategories = (category) => {
        if (category.data.childrenCategories) {
            return categories.filter((childrenCategory) => category.data.childrenCategories.includes(childrenCategory.id))
        }
    }

    const getParentCategories = (category) => {
        if (category.data.parentCategories) {
            return categories.filter((parentCategory) => category.data.parentCategories.includes(parentCategory.id))
        }
    }

    useFirestoreConnect({
        collection: 'products',
        where: [['enabled', '==', true], ['stock', '==', true]]
    })

    const products = useSelector(
        ({ firestore }) => firestore.data.products && Object.entries(firestore.data.products)
            .map((product) => { return { id: product[0], data: product[1] } })
    )

    const recentProducts = isEmpty(products) ? [] : [...products].sort((a, b) => {
        if (a.data.createdAt >= b.data.createdAt)
            return -1
        return 1
    })

    const mealsCategory = !isEmpty(categories) && categories.find((category) => category.id === 'emgqRnkMcrfiM24JI3i6')
    const meals = isEmpty(products) ? [] : products.filter((product) => product.data.categories.includes(mealsCategory.id))

    const cigarettesCategory = !isEmpty(categories) && categories.find((category) => category.id === 'KIdyISkEMmATZsnAhYpk')
    const cigarettes = isEmpty(products) ? [] : products.filter((product) => product.data.categories.includes(cigarettesCategory.id))

    const categoriesRows = [
        {
            title: 'Categorii',
            categories: mainCategories,
            products: isEmpty(products) ? [] : products,
        }
    ]

    const productsRows = [
        {
            title: 'Recent adăugate în Cosmo Market',
            products: recentProducts,
        },
        {
            category: mealsCategory,
            products: meals,
        },
        {
            category: cigarettesCategory,
            products: cigarettes,
        },
    ]



    const value = {
        //vars
        categories,
        mainCategories,
        products,
        recentProducts,
        meals,
        categoriesRows,
        productsRows,

        //functions
        getChildrenCategories,
        getParentCategories,
    }

    return (
        <MarketContext.Provider value={value}>
            {children}
        </MarketContext.Provider>
    )
}

