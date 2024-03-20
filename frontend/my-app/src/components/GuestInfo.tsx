"use client"
import React from 'react'

import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '@/context/SeachContext';
import { useAppContext } from '@/context/AppContext';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFromData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfo = ({ hotelId, pricePerNight }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchContext()
    const { isLoggedIn } = useAppContext()
    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFromData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount
        }
    })

    const checkIn = watch("checkIn")
    const checkOut = watch("checkOut")

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const onSignInClick = (data: GuestInfoFromData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount)
        router.push('/sign-in')
    };

    const onSubmit = (data: GuestInfoFromData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount)
        router.push(`/hotel/${hotelId}/booking`)
    };
    return (
        <div className='flex flex-col p-4 bg-blue-200 gap-4'>
            <h3 className='text-md font-bold'>
                ${pricePerNight}
            </h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)} >
                <div className='grid grid-cols-1 gap-4 items-center'>
                    <div>
                        <DatePicker required selected={checkIn} onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-in Date'
                            className='min-w-full bg-white p-2 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>
                    <div>
                        <DatePicker required selected={checkOut} onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-Out Date'
                            className='min-w-full bg-white p-2 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>

                    <div className='flex bg-white px-2 py-1  gap-1'>
                        <label className='flex items-center flex-1 gap-2'>
                            Adults:
                            <input
                                className='w-full p-1 focus:outline-none font-bold'
                                type='number'
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required ",
                                    min: {
                                        value: 1,
                                        message: "There must be at least one adult"
                                    }
                                })}
                            />
                        </label>
                        <label className='flex items-center flex-1 gap-2'>
                            Children:
                            <input
                                className='w-full p-1 focus:outline-none font-bold'
                                type='number'
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className='text-red-500 font-semibold text-sm'>{errors.adultCount.message}</span>
                        )}
                    </div>

                    {isLoggedIn ? (
                        <button
                            type='submit'
                            className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500'>
                            Book Now
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500'>
                            Sign in to Book
                        </button>
                    )}

                </div>
            </form>
        </div>
    )
}

export default GuestInfo