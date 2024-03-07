"use client"
import React from 'react';

import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from './DetailsSection';

import TypesSection from '@/components/forms/ManageHotelForms/TypesSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImageSection from './ImageSection';
export type HotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    pricePerNight: number,
    starRating: number,
    facilities: string[],
    imageFiles: FileList,
    adultCount: number,
    childCount: number
}
type Props = {
    onSave: (hotelFormData: FormData) => void
    isLoading: boolean
}
const ManageHotelForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((FormDataJson: HotelFormData) => {
        const formData = new FormData()
        formData.append("name", FormDataJson.name)
        formData.append("city", FormDataJson.city)
        formData.append("country", FormDataJson.country)
        formData.append("description", FormDataJson.description)
        formData.append("type", FormDataJson.type)
        formData.append("pricePerNight", FormDataJson.pricePerNight.toString())
        formData.append("starRating", FormDataJson.starRating.toString())
        formData.append("adultCount", FormDataJson.adultCount.toString())
        formData.append("childCount", FormDataJson.childCount.toString())

        FormDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        })

        Array.from(FormDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile)
        })

        onSave(formData)


    })
    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                <DetailsSection />
                <TypesSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImageSection />
                <span className='flex justify-end '>
                    <button disabled={isLoading} type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'>
                        {isLoading ? "Saving ..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm