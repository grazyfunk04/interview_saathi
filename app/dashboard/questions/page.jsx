import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

const faqs = [
  {
    question: "What is the purpose of this application?",
    answer: "The application allows users to practice topic-wise questions and take mock interviews based on specific topics and job descriptions. It provides feedback and ratings based on the recorded answers."
  },
  {
    question: "How can I select the topics for practice questions?",
    answer: "Users can browse through a list of available topics and select their preferred ones for practice."
  },
  {
    question: "Can I choose the number of questions I want to practice?",
    answer: "Yes, users can select the number of questions they want to practice from each topic."
  },
  {
    question: "How do mock interviews work?",
    answer: "Users can choose a topic, specify their years of experience, and input a job description. The application will then conduct a mock interview where users record their answers. Feedback and ratings are provided based on the recorded responses."
  },
  {
    question: "Is there a time limit for answering questions in the mock interview?",
    answer: "Yes, each question in the mock interview has a time limit to simulate real interview conditions."
  },
  {
    question: "How is the feedback provided after the mock interview?",
    answer: "Feedback is provided based on the recorded answers. It includes ratings and constructive comments to help users improve their performance."
  },
  {
    question: "Can I review my recorded answers?",
    answer: "Yes, users can review their recorded answers along with the feedback and ratings provided."
  },
  {
    question: "Is my recorded data kept confidential?",
    answer: "Yes, all recorded data is kept confidential and is only used to provide feedback and ratings to the user."
  },
  {
    question: "Can I retake a mock interview on the same topic?",
    answer: "Yes, users can retake mock interviews on the same topic to practice and improve their performance."
  },
  {
    question: "Are there any costs associated with using this application?",
    answer: "The application may offer both free and premium features. Please check the pricing section for detailed information on the costs."
  }
];

function Questions() {
  return (
    <div className="p-4 my-8">
      <div>
        <h2 className="text-black font-bold text-2xl">FAQ's</h2>
      </div>

      <div>
        {faqs.map((item, index)=>(
          <Collapsible className="mt-8">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
             {`Question: ${item.question}` } <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="p-2 border rounded-lg text-sm">
                  <strong>Answer: </strong>
                  {item.answer}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

export default Questions;
