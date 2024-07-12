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
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { AIInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position : " +
      jobPosition +
      ", job description: " +
      jobDesc +
      ", Years of experience: " +
      jobExperience +
      ", depends on this information please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT +
      " interview question with answers in json format, give questions and answers as field in json";

    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(mockJsonResp));

    setJsonResponse(mockJsonResp);
    if(mockJsonResp){
      const resp = await db.insert(AIInterview).values({
        mockId: uuidv4(),
        jsonMockRes:mockJsonResp,
        jobPosition:jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({mockId:AIInterview.mockId});
  
      console.log('Inserted ID:', resp);
      if(resp){
        setOpenDialog(false);
        router.replace('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
    else{
      console.log('ERROR');
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing.
            </DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description
                    and years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label htmlFor="">Job Role/ Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required={true}
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">
                      Job Description/ Tech Stack (In Short)
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySQL etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max="50"
                      onChange={(event) => setJobExperience(event.target.value)}
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
                        <LoaderCircle className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      "Start Interview"
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

export default AddNewInterview;
