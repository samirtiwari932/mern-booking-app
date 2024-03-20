"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import * as apiClient from "../../../api-client"
import { useQuery } from 'react-query';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import GuestInfo from '@/components/GuestInfo';


const page = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "fetchHotelById",
        () =>
            apiClient.fetchHotelById(hotelId as string), {
        enabled: !!hotelId,
    });

    if (!hotel) {
        return <></>
    }
    return (
        <div className='space-y-6'>
            <div>
                <span className='flex'>

                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className='fill-yellow-400' />
                    ))}
                </span>
                <h1 className='text-3xl font-bold'>{hotel.name}</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {hotel.imageUrls.map((image) => (
                    <div className='h-[300px]'>
                        <Image src={image} alt={hotel.name} className='rounded-md w-full h-full object-cover object-center' width={100} height={100} />
                    </div>

                ))}
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                {hotel.facilities.map((facility) => (
                    <div className='border border-slate-300 rounded-sm p-3'>
                        {facility}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
                <div className='whitespace-pre-line'>
                    {hotel.description}
                </div>
                <div className='h-fit'>
                    <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    )
}

export default page