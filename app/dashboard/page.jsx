import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import Image from 'next/image'
import AddNewTest from './_components/AddNewTest'
import AssessmentList from './_components/AssessmentList'

function Dashboard() {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <div className='flex items-center gap-8'>
        <h2 className='text-gray-500'>Create and Start your AI Interview or Assessment</h2>
        <Image src={'/dashboardheader.gif'} alt='pic' width={100} height={100} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
        <AddNewInterview />
        <AddNewTest />
      </div>

      {/* Previous Questions List */}
      <div className='flex flex-col gap-4'>
        <InterviewList />
        <AssessmentList />
      </div>
    </div>
  )
}

export default Dashboard
