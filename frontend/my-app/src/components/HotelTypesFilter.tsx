import { hotelTypes } from '@/config/hotel-options-config'
type Props = {
    selectedHotelTypes: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void

}

import React from 'react'


const HotelTypesFilter = ({ onChange, selectedHotelTypes }: Props) => {
    return (
        <div className='border-b border-slate-300 pb-5'>
            <h4 className='text-md font-semibold mb-2'>Property Types </h4>
            {hotelTypes.map((hotelType) => (
                <label className='flex  items-center space-x-2'>
                    <input type='checkbox' className='rounded ' value={hotelType} checked={selectedHotelTypes.includes(hotelType)}
                        onChange={onChange} />
                    <span>{hotelType}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypesFilter