import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
      <div className='bg-white p-6 md:mx-auto'>
        <svg 
        viewBox='0 0 24 24'
        className='text-green-600 w-16 h-16 mx-auto my-6'
        >
        <path fill="currentColor" d="M14.755 14.006l-2.536-3.381H13.283a.531.531 0 0 0 .41-.869l-2.536-3.381h1.063a.532.532 0 0 0 .415-.863L8.385.199a.53.53 0 0 0-.83 0l-4.25 5.313a.531.531 0 0 0 .415.863h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h1.063l-2.55 3.4a.53.53 0 0 0 .425.85h4.781v1.594c0 .293.238.531.531.531h2.125a.531.531 0 0 0 .531-.531v-1.594h4.782a.531.531 0 0 0 .41-.869z"/>
        </svg>
        <div className='text-center'>
            <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                Payment Done!</h3>
            <p className='text-gray-600 my-2'>
                Thank you for completing your secure online payment
            </p>
            <p>Have a great day!</p>
            <div className='py-10 text-center'>
                <Link
                    to='/home'
                    className='px-12 bg-buttonColor text-black font-semibold py-3'
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
      </div>
  )
}

export default CheckoutSuccess
