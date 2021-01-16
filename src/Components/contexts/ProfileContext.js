/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isEmpty, isLoaded, useFirebase, useFirestore } from 'react-redux-firebase'

const ProfileContext = React.createContext()

export function useProfileContext() {
    return useContext(ProfileContext)
}

export default function ProfileProvider({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    const profile = useSelector(state => state.firebase.profile)
    const firebase = useFirebase()
    const firestore = useFirestore()

    useFirestoreConnect(() => {
        if (!isEmpty(auth))
            return {
                collection: 'addresses',
                where: [['userID', '==', auth.uid]],
                orderBy: [['label', 'asc']]
            }

        return null
    })

    const addresses = useSelector(
        ({ firestore }) => firestore.data.addresses && Object.entries(firestore.data.addresses).filter(x => x[1])
            .map((address) => { return { id: address[0], data: address[1] } })
    )

    const getAddressByID = (addressID) => addresses?.find(x => x.id === addressID)

    const updatePersonalData = (data) => {
        return firebase.updateProfile(data)
    }

    const updateAddress = ({ addressID, address, coords }) => {
        var docRef = firestore.collection('addresses')

        if (!addressID || addressID === 'new') {
            docRef = docRef.doc()
        } else {
            docRef = docRef.doc(addressID)
        }
        return docRef.set({ ...address, userID: auth.uid, latitude: coords.latitude, longitude: coords.longitude }, { merge: true })
    }


    const value = {
        //vars
        addresses,
        profile,
        //functions
        getAddressByID,
        updatePersonalData,
        updateAddress,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

