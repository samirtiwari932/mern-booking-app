"use client"
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import React from 'react'
import SignOutButton from './SignOutButton'

const Header = () => {
    const { isLoggedIn } = useAppContext()

    return (
        <div className='bg-blue-800 py-6'>
            <div className='container mx-auto flex flex-row justify-between'>
                <span className='text-3xl text-white font-bold tracking-tight'>
                    <Link href='/'>
                        MernHolidays.com
                    </Link>
                </span>
                <span className='flex space-x-2'>
                    {isLoggedIn ? <>
                        <Link className='flex items-center px-3 text-white font-bold hover:bg-blue-500' href='/my-booking'>My Bookings</Link>
                        <Link className='flex items-center text-white font-bold hover:bg-blue-600 px-3 ' href='/my-hotels'>My Hotels</Link>
                        <SignOutButton />
                    </> : <Link href="/sign-in" className='flex items-center text-blue-600 px-3  bg-white font-bold hover:bg-gray-100 '>Sign in</Link>

                    }
                </span>
            </div>
        </div>
    )
}

export default Header