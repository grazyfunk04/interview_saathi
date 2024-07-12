"use client";
import { db } from "@/utils/db";
import { AIAssessment} from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import AssessmentItemCard from "./AssessmentItemCard";

function AssessmentList() {
  const { user } = useUser();
  const [assessmentList, setAssessmentList] = useState([]);

  useEffect(() => {
    user && getAssessmentList();
  }, [user]);

  const getAssessmentList = async () => {
    const result = await db
      .select()
      .from(AIAssessment)
      .where(eq(AIAssessment.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(AIAssessment.id));

    setAssessmentList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Previous Mock Assessment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {assessmentList &&
          assessmentList.map((item, index) => (
            <AssessmentItemCard key={index} assessment={item} />
          ))}
      </div>
    </div>
  );
}

export default AssessmentList;
