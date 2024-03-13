"use client"
import React, { useEffect } from 'react';

import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from './DetailsSection';

import TypesSection from '@/components/forms/ManageHotelForms/TypesSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImageSection from './ImageSection';
import { HotelType } from '../../../../../../backend/src/shared/types';
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
    imageUrls: string[]
    adultCount: number,
    childCount: number
}
type Props = {
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
    hotel?: HotelType // we oly receive hotel on the edit page when on the add hotel we don't receive any hotel thats why optinal 
}
const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel)
    }, [reset, hotel])

    const onSubmit = handleSubmit((FormDataJson: HotelFormData) => {
        const formData = new FormData()
        if (hotel) {
            formData.append("hotelId", hotel._id)
        }
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

        //[image1.jpg,image2.jpg,image3.jpg]
        // imageUrls = [image1.jpg]

        if (FormDataJson.imageUrls) {
            FormDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url)
            })
        }

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