"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from "../../../api-client"
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export type SignInFormData = {
    email: string,
    password: string
}

const page = () => {
    const queryClient = useQueryClient()
    const router = useRouter();
    const { showToast } = useAppContext()
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>()

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign In  Successful !", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken")
            router.push("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Sign In</h2>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input type='email' className='border rounded w-full py-1 px-2 font-normal' {...register("email", { required: "This field is required" })}></input>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input type='password' autoComplete='on' className='border rounded w-full py-1 px-2 font-normal' {...register("password", {
                    required: "This field is required", minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters "
                    }
                })}></input>
                {errors.password && (
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
            </label>
            <span className='flex items-center justify-between'>
                <span className='text-sm'>
                    Don't have an account? {''}
                    <Link href='/register' className='underline hover:text-blue-600'>Register Here</Link>
                </span>
                <button
                    type='submit'
                    className='bg-blue-600 p-2 text-white font-bold hover:bg-blue-500 text-xl'>Login</button>
            </span>
        </form>
    )
}

export default page