/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isEmpty, isLoaded, populate } from 'react-redux-firebase'
import { firebaseFunctions } from "../../utils"

const populates = [
    { child: 'riderID', root: 'users', childAlias: 'rider' },
    { child: 'addressID', root: 'addresses', childAlias: 'address' },
]

const OrderContext = React.createContext()

export function useOrderContext() {
    return useContext(OrderContext)
}

export default function OrderProvider({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    const functions = firebaseFunctions

    const ordersStoreAs = 'myOrders'
    useFirestoreConnect(() => {
        if (auth?.uid)
            return [{
                collection: 'orders',
                where: [['userID', '==', auth.uid]],
                orderBy: [['createdAt', 'desc']],
                storeAs: ordersStoreAs
            }, { collection: 'users' }, { collection: 'addresses' }]
    })


    const orders = useSelector(
        ({ firestore }) => {
            let orders = populate(firestore, ordersStoreAs, populates)
            if (!isEmpty(orders))
                return Object.entries(orders).filter(x => x[1])
                    .map((order) => { return { id: order[0], data: order[1] } })
            return null
        }
    )

    const orderStoreAs = 'myOrder'
    useFirestoreConnect(() => {
        if (auth?.uid)
            return [{
                collection: 'orders',
                where: [['userID', '==', auth?.uid], ['state', 'in', ['pending', 'assigned']]],
                orderBy: [['createdAt', 'desc']],
                limit: 1,
                storeAs: orderStoreAs
            },
            { collection: 'users' },
            ]
    })

    const currentOrder = useSelector(
        ({ firestore }) => {
            let order = populate(firestore, orderStoreAs, populates)
            if (!isEmpty(order)) {
                let orderArray = Object.keys(order).filter(x => order[x])
                return { id: orderArray[0], data: order[orderArray[0]] }
            }
            return null
        }
    )

    const productsInOrderStoreAs = 'myOrder-productsInOrder'
    useFirestoreConnect(() => {
        if (currentOrder?.id)
            return [
                {
                    collection: 'orders',
                    doc: currentOrder?.id,
                    subcollections: [{ collection: 'products' }],
                    storeAs: productsInOrderStoreAs,
                },
            ]
    })

    const productsInOrder = useSelector(
        ({ firestore }) => {
            let products = firestore.data[productsInOrderStoreAs]
            if (!isEmpty(products)) {
                let productsArray = Object.entries(products).filter(x => x[1])
                return productsArray.map((product) => { return { id: product[0], data: product[1] } })
            }
        }
    )

    const cancelOrder = () => {
        if (!isEmpty(currentOrder)) {
            return functions.httpsCallable('cancelOrder')({ orderID: currentOrder.id })
        }
    }

    const getOrderByID = (orderID) => {
        return orders?.find((order) => orderID === order.id)
    }

    const value = {
        //vars
        orders,
        currentOrder,
        productsInOrder,

        //functions
        getOrderByID,
        cancelOrder,
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

