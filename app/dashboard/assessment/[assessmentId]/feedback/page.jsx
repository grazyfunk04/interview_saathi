"use client";
import { db } from "@/utils/db";
import { AIAssessment, UserAssessment } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import Email from "@/emails";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function Feedback({ params }) {
  const assessmentId = params?.assessmentId;
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const [assessmentData, setAssessmentData] = useState({});
  const [mockAssessmentQuestions, setMockAssessmentQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

  useEffect(() => {
    getAssessmentDetails();
    getFeedback();
  }, []);

  const getAssessmentDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AIAssessment)
      .where(eq(AIAssessment.mockId, assessmentId));

    setAssessmentData(result[0]);
    const jsonMockResp = JSON.parse(result[0]?.jsonMockRes);
    setMockAssessmentQuestions(jsonMockResp);
    setLoading(false);
  };

  const getFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(UserAssessment)
      .where(eq(UserAssessment.mockIdRef, assessmentId))
      .orderBy(UserAssessment.id);

    // console.log(result)
    setFeedbackList(result);
    setLoading(false);
  };

  useEffect(() => {
    setTotalScore(getTotalScore());
  }, [feedbackList]);

  useEffect(() => {
    setTotalQuestion(mockAssessmentQuestions?.length);
  }, [mockAssessmentQuestions]);

  const getTotalScore = () => {
    let correctAns = 0;
    {
      feedbackList.map((item) => {
        if (item.correctAns === item.userAns) {
          correctAns++;
        }
      });
    }

    return correctAns;
  };

  if (loading) {
    return <h2>Loading....</h2>;
  }

  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        userFirstName={user}
        assessmentTopic={assessmentData?.assessmentTopic}
        assessmentQuestions={assessmentData?.assessmentQuestions}
        assessmentLevel={assessmentData?.assessmentLevel}
        date={assessmentData?.createdAt}
        correctAns={totalScore}
        totalAns={totalQuestion}
      />
    );

    plunk.emails
      .send({
        to: userEmail,
        subject: "Assessment Feedback",
        body: emailHtml,
      })
      .then((resp) => {
        console.log(resp);
        toast("Email sent Successfully");
      });
  };

  return (
    <div className="p-10">
      {feedbackList ? (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your assessment feedback
          </h2>
          <div className="flex items-center gap-8">
            <h2 className="text-blue-500 text-lg my-3">
              Your overall score is :{" "}
              <strong>{`${totalScore} / ${totalQuestion} `}</strong>
            </h2>
            <h2 className="text-blue-500 text-lg my-3">
              Your accuracy is :{" "}
              <strong>{`${(totalScore / totalQuestion) * 100} % `}</strong>
            </h2>
          </div>

          <h2 className="text-sm text-gray-500">
            Find below assessment question with correct answer, your answer and
            feedback for improvement
          </h2>
        </>
      ) : (
        <h2 className="font-bold items-center text-xl text-gray-500">
          Please attempt the interview before accessing this page!!
        </h2>
      )}
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-8">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <div className="flex gap-10">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Time Taken : </strong>
                    {item.timeTaken} seconds
                  </h2>
                </div>
                <h2
                  className={`p-2 border rounded-lg text-sm ${
                    item.userAns == item.correctAns
                      ? "bg-green-50"
                      : "bg-red-50"
                  } `}
                >
                  <strong>Your Answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer: </strong>
                  {item.correctAns}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            router.replace("/dashboard");
          }}
          className="mt-8"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
