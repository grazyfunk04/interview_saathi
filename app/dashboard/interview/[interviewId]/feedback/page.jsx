"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
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

function Feedback({ params }) {
  const interviewId = params?.interviewId;
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    getFeedback();
  }, []);
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    // console.log(result)
    setFeedbackList(result);
  };

  useEffect(()=> {
    const getRating = ()=> {
      let temp = 0;
      feedbackList.map((item)=> (
        temp = temp + item.rating
      ));

      return (temp / feedbackList.length);
    }

    setTotalRating(getRating());
    
  }, [feedbackList])
  return (
    <div className="p-10">
      {feedbackList ? (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-blue-500 text-lg my-3">
            Your overall interview rating: <strong>{`${totalRating}/10`}</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>
        </>
      )
      : 
      (
        <h2 className="font-bold items-center text-xl text-gray-500">Please attempt the interview before accessing this page!!</h2>
      )
      }
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-8">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <div className="flex gap-10">
                  <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating: </strong>{item.rating}</h2>
                  <h2 className="text-red-500 p-2 border rounded-lg"><strong>Time Taken: </strong>{item.timeTaken}</h2>
                </div>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-700"><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <Button onClick={()=> router.replace('/dashboard')} className='mt-8'>Go Home</Button>
    </div>
  );
}

export default Feedback;
