import React from 'react'
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm';
import { hotelFacilities } from '@/config/hotel-options-config';

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className='text-2xl font-bold mb-3'>Facilities</h2>
            <div className='grid md:grid-cols-5 grid-cols-3 gap-3 items-center '>
                {hotelFacilities.map((facility) => (
                    <label key={facility} className='text-sm flex gap-1' >
                        <input type='checkbox' value={facility} {...register("facilities", {
                            validate: (facilities) => {
                                if (facilities && facilities.length > 0) {
                                    return true
                                } else {
                                    return "At least  one facility is required"
                                }
                            }
                        })} />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className='text-red-500 text-sm font-bold '>
                    {errors.facilities.message}
                </span>
            )}
        </div>
    )
}

export default FacilitiesSection