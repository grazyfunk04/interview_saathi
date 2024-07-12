"use client"
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div className="flex justify-center flex-col items-center my-20">
        <div className='justify-center items-center text-center'>
          <h2 className="font-bold text-5xl text-slate-700">
            Ace Your Interviews and Assessments with Confidence
          </h2>
          <h2 className="text-xl mt-5 text-slate-500">
            The ultimate tool designed to help you practice and perfect your interview skills. Our platform offers realistic mock interviews, tailored feedback, and comprehensive assessment preparation, ensuring you're ready to impress any interviewer.
          </h2>
        </div>

        <div>
          <Image src={"/hero.gif"} alt="video" width={200} height={200} />
        </div>

      <div className="text-center max-w-3xl">
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-md">Sign Up free with Google and Github</h3>
        </div>
      </div>
    </div>
  )
}

export default Hero
