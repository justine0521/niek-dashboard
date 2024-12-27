import React from 'react'

function Orders({ isOpen }) {
  return (
    <section className={`main-content h-screen mt-14 p-7 overflow-auto scrollnone relative transition-all ${isOpen ? 'w-screen' : ''}`}>
        <p className='font-semibold text-2xl mb-3'>Order History</p>

        <table className='w-full'>
          <thead className='hidden'>
            <tr>
              <th>DATE</th>
              <th>PAID</th>
              <th>RECIPIENT</th>
              <th>PRODUCT</th>
              <th>SIZE</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className=' bg-gray-800'>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="DATE">
                <span class="font-semibold text-orange-400 text-md">DATE</span>
                <p className='text-white'>06/23/2024</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="RECIPIENT">
                <div className='flex flex-col text-left w-full'>
                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">RECIPIENT</span>
                    <p className='text-white'>Justine Santos</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">CONTACT NUMBER</span>
                    <p className='text-white'>09619771972</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">REGION</span>
                    <p className='text-white'>3</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">PROVINCE</span>
                    <p className='text-white'>Bataan</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">MUNICIPALITY</span>
                    <p className='text-white'>Mariveles</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">BARANGAY</span>
                    <p className='text-white'>Balon Anito</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">STREET</span>
                    <p className='text-white'>Banaba Street</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">BUILDING</span>
                    <p className='text-white'>N/A</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">HOUSE NUMBER</span>
                    <p className='text-white'>314</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span class="font-semibold text-orange-400 text-sm">ZIP CODE</span>
                    <p className='text-white'>2105</p>
                  </div>
                </div>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="PRODUCT">
                <span class="font-semibold text-orange-400 text-md">PRODUCT</span>
                <p className='text-white'>Niek Air MAX 97</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="SIZE">
                <span class="font-semibold text-orange-400 text-md">SIZE</span>
                <p className='text-white'>44</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="QUANTITY">
                <span class="font-semibold text-orange-400 text-md">QUANTITY</span>
                <p className='text-white'>x3</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="PRICE">
                <span class="font-semibold text-orange-400 text-md">PRICE</span>
                <p className='text-white'>600</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="PAID">
                <span class="font-semibold text-orange-400 text-md">PAID</span>
                <p className='text-white'>No</p>
              </td>
              <td className="flex justify-between items-center text-right px-5 py-1 w-full border" data-label="STATUS">
                <span class="font-semibold text-orange-400 text-md">STATUS</span>
                <select name="status" id="status" className='py-1 px-2 border rounded'>
                  <option value="">Pending</option>
                  <option value="">Shipped</option>
                  <option value="">Delivered</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
    </section>
  )
}

export default Orders