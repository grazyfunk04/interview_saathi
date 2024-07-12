"use client"
import { SignInButton,SignUpButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

function Header() {
    const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-md">
        {/* <Image src="/videoconference.png" width={50} height={50} alt="logo" className="w-[150px] md:w-[200px]"/> */}
        <h2 className="text-4xl text-primary font-bold">Interview Saathi</h2>

        <ul className="hidden md:flex gap-14 font-medium text-lg">
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">Product</li>
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">Pricing</li>
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">Contact us</li>
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">About Us</li>
        </ul>
        <div className="flex gap-8">
            <SignInButton displayName='Login'/>
            <SignUpButton />
        </div>
      </div>
    </div>
  )
}

export default Header
