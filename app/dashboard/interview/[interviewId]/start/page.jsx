"use client";
import { db } from "@/utils/db";
import { AIInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState({});
  const [mockInterviewQuestions, setInterviewMockQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState({});

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AIInterview)
      .where(eq(AIInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockRes);
    console.log(jsonMockResp);
    setInterviewMockQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };

  const updateTimeTaken = (questionIndex, time) => {
    setTimeTaken((prevTimeTaken) => ({
      ...prevTimeTaken,
      [questionIndex]: time,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          setTimeTaken={updateTimeTaken}
        />

        {/* Video and recording */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          timeTaken={timeTaken}
        />
      </div>
      <div className="flex justify-end gap-6 mb-10">
        {activeQuestionIndex > 0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <Button onClick={()=> setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestions?.length - 1 && (
          <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
            <Button >End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
