"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIInterview } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import { Lightbulb, TimerReset, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState({});
  const [loading, setLoading] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AIInterview)
      .where(eq(AIInterview.mockId, params.interviewId));

    // console.log(result);
    setInterviewData(result[0]);
    setLoading(false);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {!loading ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData?.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack:</strong>{" "}
                  {interviewData?.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong>{" "}
                  {interviewData?.jobExperience}
                </h2>
              </>
            ) : (
              <h2>Loading....</h2>
            )}
          </div>

          <div className="p-5 rounded-lg border bg-yellow-100 border-yellow-300">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-5 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMTION}
            </h2>
            <h2 className="mt-5 text-black flex items-center gap-2">
              <TimerReset />
              For Each question you will be provided 3 minutes to answer..
            </h2>
          </div>
        </div>

        <div>
          {webcamEnabled ? (
            <div className="justify-center items-center flex flex-col">
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                style={{ height: 400, width: 400, borderRadius: 20 }}
                mirrored={true}
              />
              <Button
                onClick={() => setWebcamEnabled(false)}
                variant="ghost"
                className="justify-center"
              >
                Disable
              </Button>
            </div>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <div className="flex items-center justify-center">
                <Button onClick={() => setWebcamEnabled(true)}>
                  Enable Web Cam and Microphone
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end mt-5">
        <Link
          href={"/dashboard/interview/" + params.interviewId + "/start"}
        >
          {webcamEnabled ? (
            <Button variant="outline" disabled={!webcamEnabled}>
              Start Interview
            </Button>
          ) : null}
        </Link>
      </div>
    </div>
  );
}

export default Interview;
