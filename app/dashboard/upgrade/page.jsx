import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Upgrade() {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      
      <div className='justify-center items-center flex flex-col'>
        <h2 className='text-3xl font-bold'>Upgrade</h2>
        <h2>Upgrade to monthly plan to access unlimited mock interview and assessment</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-12'>

        <div className='rounded-3xl p-12 w-full col-span-2 border-[1px]'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-center text-lg font-bold'>Free</h2>
            <h2 className='text-sm text-center'><span className='text-4xl font-bold'>₹0</span>/monthly</h2>
          </div>
          <div className='flex flex-col mt-4 gap-2'>

            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Create 3 Free mock interview </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Unlimited retake interview </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Practice Question </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/close.png'} alt='check' width={20} height={20} />
              <h2>Premium member access </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/close.png'} alt='check' width={20} height={20} />
              <h2>Email support </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/close.png'} alt='check' width={20} height={20} />
              <h2>Customer Support</h2>
            </div>

          </div>

          <div className='items-center justify-center flex mt-8'>
            <Button variant="outline">Get Started</Button>
          </div>
        </div>

        <div className='rounded-3xl p-12 w-full col-span-2 border-[1px]'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-center text-lg font-bold'>Premium</h2>
            <h2 className='text-sm text-center'><span className='text-4xl font-bold'>₹249.00</span>/monthly</h2>
          </div>
          <div className='flex flex-col mt-4 gap-2'>

            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Create 3 Free mock interview </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Unlimited retake interview </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Practice Question </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Premium member access </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Email support </h2>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={'/check.png'} alt='check' width={20} height={20} />
              <h2>Customer Support</h2>
            </div>

          </div>

          <div className='items-center justify-center flex mt-8'>
            <Button variant="outline" className="rounded-lg">Get Started</Button>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Upgrade
