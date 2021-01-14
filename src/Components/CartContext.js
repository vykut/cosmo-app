import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux";
import { isEmpty, useFirestoreConnect, useFirestore, useFirebase } from "react-redux-firebase";
import { firebaseFunctions } from "../utils";

const CartContext = createContext()

export function useCartContext() {
    return useContext(CartContext)
}

export function CartProvider({ children }) {
    const auth = useSelector(state => state.firebase.auth);
    const functions = firebaseFunctions

    const initialCart = useMemo(() => {
        return {
            products: {},
            quantity: 0,
            totalPrice: 0
        }
    }, [])

    const [offlineCart, setOfflineCart] = useState(initialCart)

    const cosmoMarketDoc = 'CosmoMarket'
    useFirestoreConnect([{
        collection: 'stores',
        doc: cosmoMarketDoc,
    }])

    const cosmoMarketStore = useSelector(
        ({ firestore }) => firestore.data.stores && firestore.data.stores[cosmoMarketDoc]
    )

    const shouldUploadCartToFirestore = !isEmpty(auth) && offlineCart.quantity
    useEffect(() => {
        if (shouldUploadCartToFirestore) {
            var promises = []
            Object.keys(offlineCart.products).forEach((product) => {
                promises.push(functions.httpsCallable('addProductToCart')({ productID: product, quantity: offlineCart.products[product].quantity }))
            })
            Promise.all(promises)
                .then(() => {
                    setOfflineCart(initialCart)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [offlineCart.products, functions, initialCart, shouldUploadCartToFirestore])

    useFirestoreConnect([{
        collection: 'carts',
        doc: auth?.uid,
    }])

    const firebaseCart = useSelector(
        ({ firestore }) => firestore.data.carts?.[auth?.uid]
    )

    const productsInFirebaseCartStoreAs = 'productsInFirebaseCart'
    useFirestoreConnect(() => {
        if (isEmpty(auth))
            return []

        return [{
            collection: 'carts',
            doc: auth.uid,
            subcollections: [{
                collection: 'products'
            }],
            storeAs: productsInFirebaseCartStoreAs
        }]
    })

    const productsInFirebaseCart = useSelector(
        ({ firestore }) => firestore.data[productsInFirebaseCartStoreAs] &&
            Object.entries(firestore.data[productsInFirebaseCartStoreAs]).filter(x => x[1])
                .map(x => { return { id: x[0], data: { ...x[1], totalPrice: x[1].price } } })
    )


    const addProductToCart = async (productID, price, quantity = 1) => {
        if (quantity > 0) {
            let productTotalPrice = price * quantity
            if (isEmpty(auth)) {
                setOfflineCart(c => {
                    return {
                        ...c,
                        products: {
                            ...c.products,
                            [productID]: {
                                totalPrice: c.products?.[productID] ? productTotalPrice + c.products[productID].totalPrice : productTotalPrice,
                                quantity: c.products?.[productID] ? quantity + c.products[productID].quantity : quantity
                            }
                        },
                        quantity: c.quantity + quantity,
                        totalPrice: c.totalPrice + productTotalPrice
                    }
                })
            } else {
                try {
                    await functions.httpsCallable('addProductToCart')({ productID: productID, quantity: quantity })
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    const deleteProductFromCart = async (productID) => {
        if (isEmpty(auth)) {
            setOfflineCart((prevCart) => {
                const newCart = { ...prevCart }
                newCart.quantity = prevCart.quantity - prevCart.products[productID].quantity
                newCart.totalPrice = prevCart.totalPrice - prevCart.products[productID].totalPrice
                delete newCart.products[productID]
                return newCart
            })
        } else {
            try {
                await functions.httpsCallable('deleteProductFromCart')({ productID: productID })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getCart = () => {
        if (isEmpty(auth)) {
            return offlineCart
        } else {
            return firebaseCart
        }
    }

    const getProductsInCart = () => {
        if (isEmpty(auth)) {
            return Object.keys(offlineCart.products).map((key) => { return { id: key, data: offlineCart.products[key] } })
        } else {
            return productsInFirebaseCart
        }
    }

    const incrementQuantity = async (productID) => {
        if (isEmpty(auth)) {
            setOfflineCart({
                ...offlineCart,
                quantity: offlineCart.quantity + 1,
                totalPrice: offlineCart.totalPrice + offlineCart.products[productID].totalPrice / offlineCart.products[productID].quantity,
                products: {
                    ...offlineCart.products,
                    [productID]: {
                        totalPrice: offlineCart.products[productID].totalPrice + offlineCart.products[productID].totalPrice / offlineCart.products[productID].quantity,
                        quantity: offlineCart.products[productID].quantity + 1
                    }
                }
            })
        } else {
            try {
                await functions.httpsCallable('addProductToCart')({ productID: productID, quantity: 1 })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const decrementQuantity = async (productID) => {
        if (isEmpty(auth)) {
            setOfflineCart({
                ...offlineCart,
                quantity: offlineCart.quantity - 1,
                totalPrice: offlineCart.totalPrice - offlineCart.products[productID].totalPrice / offlineCart.products[productID].quantity,
                products: {
                    ...offlineCart.products,
                    [productID]: {
                        ...offlineCart.products[productID],
                        totalPrice: offlineCart.products[productID].totalPrice - offlineCart.products[productID].totalPrice / offlineCart.products[productID].quantity,
                        quantity: offlineCart.products[productID].quantity - 1
                    }
                }
            })
        } else {
            try {
                await functions.httpsCallable('addProductToCart')({ productID: productID, quantity: -1 })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const value = {
        // vars
        cosmoMarketStore,

        //functions
        addProductToCart,
        deleteProductFromCart,
        getCart,
        getProductsInCart,
        incrementQuantity,
        decrementQuantity,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}