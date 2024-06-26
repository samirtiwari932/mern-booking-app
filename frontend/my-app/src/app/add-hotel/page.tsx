"use client"

import ManageHotelForm from '@/components/forms/ManageHotelForms/ManageHotelForm'
import React from 'react'
import { useMutation } from 'react-query'
import * as apiClient from "../../api-client"
import { useAppContext } from '@/context/AppContext'
import NotFoundPage from '@/components/NotFoundPage'
import { useRouter } from 'next/navigation'


const page = () => {
    const router = useRouter()
    const { showToast, isLoggedIn } = useAppContext()
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved !", type: "SUCCESS" })
            router.push('/my-hotels')
        }, onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    if (!isLoggedIn) {
        return <NotFoundPage />
    }

    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading} />)
}

export default page