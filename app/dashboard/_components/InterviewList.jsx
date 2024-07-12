"use client"
import { db } from '@/utils/db';
import { AIInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(()=> {
        user && getInterviewList();
    }, [user])
    const getInterviewList = async()=> {
        const result = await db.select().from(AIInterview).where(eq(AIInterview.createdBy, user?.primaryEmailAddress.emailAddress)).orderBy(desc(AIInterview.id))

        console.log(result);
        setInterviewList(result)
    }

  return (
    <div>
      <h2 className='font-bold text-xl'>Previous Mock Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList && interviewList.map((item, index)=> (
            <InterviewItemCard key={index} interview={item}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
