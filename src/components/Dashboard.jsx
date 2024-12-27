import React from 'react'
import { TbCurrencyPeso } from "react-icons/tb";
import '../App.css'

function Dashboard({ isOpen }) {

  return (
    <section className={`main-content h-screen mt-14 p-7 overflow-auto scrollnone relative transition-all ${isOpen ? 'w-screen' : ''}`}>
        <div>
            <p className='font-semibold text-2xl '>Orders</p>

            <div className='w-full flex items-center flex-wrap gap-x-3'>
                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 text-white p-2 font-semibold rounded-t-md'>TODAY</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'>0</p>
                        <p>0 orders today</p>
                    </div>
                </div>

                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 p-2 text-white font-semibold rounded-t-md'>THIS WEEK</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'>0</p>
                        <p>0 orders this week</p>
                    </div>
                </div>

                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 p-2 text-white font-semibold rounded-t-md'>THIS MONTH</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'>0</p>
                        <p>0 orders this month</p>
                    </div>
                </div>
            </div>

            <p className='font-semibold text-2xl mt-7'>Revenue</p>

            <div className='w-full flex items-center flex-wrap gap-x-3'>
                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 text-white p-2 font-semibold rounded-t-md'>Overall Report</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,1230.00</p>
                        <p>0 orders today</p>
                    </div>
                </div>

                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 p-2 text-white font-semibold rounded-t-md'>Report This Month</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,1230.00</p>
                        <p>0 orders this week</p>
                    </div>
                </div>

                <div className='w-64 h-32 mt-3 border rounded-md'>
                    <p className='bg-gray-800 p-2 text-white font-semibold rounded-t-md'>Report Today</p>

                    <div className='p-2 flex flex-col gap-y-2'>
                        <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,1230.00</p>
                        <p>0 orders this month</p>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Dashboard