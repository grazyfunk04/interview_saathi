"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIAssessment } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import { Lightbulb, TimerReset, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Assessment({ params }) {
  const [assessmentData, setAssessmentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAssessmentDetails();
  }, []);

  const getAssessmentDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AIAssessment)
      .where(eq(AIAssessment.mockId, params.assessmentId));

    // console.log(result);
    setAssessmentData(result[0]);
    setLoading(false);
  };

  const totalTime = assessmentData?.assessmentQuestions * 40;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                  <strong>Assessment Topic:</strong>{" "}
                  {assessmentData?.assessmentTopic}
                </h2>
                <h2 className="text-lg">
                  <strong>Assessment Level:</strong>{" "}
                  {assessmentData?.assessmentLevel && capitalizeFirstLetter(assessmentData?.assessmentLevel)}
                </h2>
                <h2 className="text-lg">
                  <strong>Number of questions:</strong>{" "}
                  {assessmentData?.assessmentQuestions}
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
              {process.env.NEXT_PUBLIC_ASSESSMENT_INFORMTION}
            </h2>
            <h2 className="mt-5 text-black flex items-center gap-2">
              <TimerReset />
              Total time alloted will be{""}
              <strong className="text-black text-xl">
                {Math.floor(totalTime / 60)}:{totalTime % 60 < 10 ? "0" : ""}
                {totalTime % 60}
              </strong>
              {""}
              Minutes
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
        {webcamEnabled ? (
          <Button
            variant="outline"
            disabled={!webcamEnabled}
            onClick={() =>
              router.replace(
                "/dashboard/assessment/" + params.assessmentId + "/start"
              )
            }
          >
            Start Assessment
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default Assessment;
