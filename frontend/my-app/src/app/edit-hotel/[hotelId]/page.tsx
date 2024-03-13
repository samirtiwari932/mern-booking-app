"use client"

import { useParams } from "next/navigation";
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import * as apiClient from "../../../api-client"
import ManageHotelForm from "@/components/forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "@/context/AppContext";

export type EditHotelProps = {
    hotelId: string | "";
}
const isLoading = false;

const page = () => {
    const { showToast } = useAppContext()
    const { hotelId } = useParams<EditHotelProps>();
    console.log(hotelId, "dxfgvhbjnkml")
    const { data: hotel } = useQuery("fetchMyHotelsById", () => apiClient.fetchMyHotelsById(hotelId), {
        enabled: !!hotelId
    })

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel updated !", type: "SUCCESS" })
        }, onError: () => {
            showToast({ message: "Error updating hotel", type: "ERROR" })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }
    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}

export default page