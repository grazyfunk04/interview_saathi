"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
  timeTaken,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { isRecording, results, startSpeechToText, stopSpeechToText,setResults } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestions[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for given interview question " +
      " please give us rating for answer and feedback as area of improvement if any " +
      "in just 3 - 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const jsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
      timeTaken: timeTaken[activeQuestionIndex],
    });

    if (resp) {
      toast("Answer saved successfully!");
      setUserAnswer("");
      setResults([]);
    }
    setUserAnswer("");
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
      </div>
      <Button
        className={`bg-blue-500 my-10 hover:bg-blue-500 ${
          isRecording
            ? "bg-white hover:bg-white border"
            : "bg-blue-500 hover:bg-blue-500"
        }`}
        onClick={startStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="flex text-red-500 gap-2 items-center animate-pulse">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex text-white gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
