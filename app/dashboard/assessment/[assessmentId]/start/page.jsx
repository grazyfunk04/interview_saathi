"use client";
import { db } from "@/utils/db";
import { AIAssessment } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";

function StartAssessment({ params }) {
  const [assessmentData, setAssessmentData] = useState({});
  const [mockAssessmentQuestions, setMockAssessmentQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState({});
  const totalTime = assessmentData?.assessmentQuestions * 40;

  useEffect(() => {
    getAssessmentDetails();
  }, []);

  const getAssessmentDetails = async() => {
    const result = await db
      .select()
      .from(AIAssessment)
      .where(eq(AIAssessment.mockId, params.assessmentId));

    // console.log(result[0]);
    setAssessmentData(result[0]);
    const jsonMockResp = JSON.parse(result[0].jsonMockRes);

    setMockAssessmentQuestions(jsonMockResp);
  };

  return (
    <div>
      <div>
        {/* Questions */}
        <QuestionSection
          mockAssessmentQuestions={mockAssessmentQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          assessmentId={params.assessmentId}
        />
      </div>
    </div>
  );
}

export default StartAssessment;
