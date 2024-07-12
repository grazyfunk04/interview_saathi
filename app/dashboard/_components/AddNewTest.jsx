"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { AIAssessment } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddNewTest() {
  const [openDialog, setOpenDialog] = useState(false);

  const [assessmentTopic, setAssessmentTopic] = useState();
  const [assessmentQuestions, setAssessmentQuestions] = useState();
  const [assessmentLevel, setAssessmentLevel] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      "Assessment Topic : " +
      assessmentTopic +
      ", Questions Difficulty Level : " +
      assessmentLevel +
      ", Number of questions : " +
      assessmentQuestions +
      "depends on this information please give me multiple choice question with answers in json format, give array of questions, options and answer as text as field in json and if there is any code write it in question itself with proper spacing and lining";

    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResp = result.response
      .text()
      .trim()
      .replace(/^```json/, "")
      .replace(/```$/, "")
    console.log(JSON.parse(mockJsonResp));

    setJsonResponse(mockJsonResp);
    if (mockJsonResp) {
      const resp = await db
        .insert(AIAssessment)
        .values({
          mockId: uuidv4(),
          jsonMockRes: mockJsonResp,
          assessmentTopic: assessmentTopic,
          assessmentQuestions: assessmentQuestions,
          assessmentLevel: assessmentLevel,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: AIAssessment.mockId });

      console.log("Inserted ID:", resp);
      if (resp) {
        setOpenDialog(false);
        router.replace("/dashboard/assessment/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New Assessment</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your assessment.
            </DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your topic of assessment, number of
                    questions.
                  </h2>

                  <div className="mt-7 my-3">
                    <label htmlFor="">Assessment Topic</label>
                    <Input
                      placeholder="Ex. React Js"
                      required={true}
                      onChange={(event) =>
                        setAssessmentTopic(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Assessment Level</label>
                    <Select
                      onValueChange={(value) => setAssessmentLevel(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem
                          value="Medium"
                          onValueChange={(event) =>
                            setAssessmentLevel(event.target.value)
                          }
                        >
                          Medium
                        </SelectItem>
                        <SelectItem
                          value="Hard"
                          onValueChange={(event) =>
                            setAssessmentLevel(event.target.value)
                          }
                        >
                          Hard
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Number of questions</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max="50"
                      onChange={(event) =>
                        setAssessmentQuestions(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Assessment"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewTest;
