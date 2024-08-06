import Products from '@/Components/Products'
import React from 'react'

function Add() {
    return (
        <div className='w-screen h-screen bg-white'>
            <div className='flex justify-center pt-3'>
                <p className='text-xl text-orange-600 font-medium '>Fill all fields to add new product</p>
            </div>

            <hr class="my-2 h-px border-0 bg-gray-300" />
            {/* Form Starts */}
            <div className=''>
            <Products/>
            </div>
        </div>
    )
}

export default Add
