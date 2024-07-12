// import { Button } from "@/components/ui/button";
// import { db } from "@/utils/db";
// import { AIAssessment, UserAssessment } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { eq } from "drizzle-orm";
// import { Lightbulb, TimerIcon } from "lucide-react";
// import moment from "moment";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import { toast } from "sonner";

// function QuestionSection({
//   mockAssessmentQuestions,
//   activeQuestionIndex,
//   setActiveQuestionIndex,
//   assessmentId,
//   totalTime,
//   setTimeTaken,
// }) {
//   const [assessmentData, setAssessmentData] = useState({});
//   const [timer, setTimer] = useState(180);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [questionTimes, setQuestionTimes] = useState({});
//   const [startTime, setStartTime] = useState(Date.now());
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setUserAnswers({});
//     setQuestionTimes({});
//     setStartTime(Date.now());
//     getAssessmentDetails();
//   }, [assessmentId]);

//   const getAssessmentDetails = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(AIAssessment)
//         .where(eq(AIAssessment.mockId, assessmentId));

//       setAssessmentData(result[0]);
//     } catch (error) {
//       console.error("Error fetching assessment details:", error);
//     }
//   };

//   const handleOptionClick = (questionIndex, option) => {
//     const currentTime = Date.now();
//     const timeTaken = (currentTime - startTime) / 1000;

//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: option,
//     }));

//     setQuestionTimes((prevTimes) => ({
//       ...prevTimes,
//       [questionIndex]: timeTaken,
//     }));

//     setStartTime(currentTime);
//   };

//   const isOptionSelected = (questionIndex, option) => {
//     return userAnswers[questionIndex] === option;
//   };

//   const updateAnswer = async () => {
//     const userAnswer = userAnswers[activeQuestionIndex];
//     const timeTaken = questionTimes[activeQuestionIndex];
//     if (
//       userAnswer !== undefined &&
//       userAnswer !== null &&
//       assessmentData?.mockId
//     ) {
//       try {
//         const result = await db.insert(UserAssessment).values({
//           mockIdRef: assessmentData?.mockId,
//           question: mockAssessmentQuestions[activeQuestionIndex]?.question,
//           correctAns: mockAssessmentQuestions[activeQuestionIndex]?.answer,
//           userAns: userAnswer,
//           userEmail: user?.primaryEmailAddress?.emailAddress,
//           createdAt: moment().format("DD-MM-YYYY"),
//           timeTaken: timeTaken,
//         });

//         if (result) {
//           toast("Answer saved successfully!");
//         }
//       } catch (error) {
//         console.error("Error saving answer:", error);
//       }
//     }
//   };

//   const handleQuestionChange = (newIndex) => {
//     const currentTime = Date.now();
//     const timeTaken = (currentTime - startTime) / 1000;

//     setQuestionTimes((prevTimes) => ({
//       ...prevTimes,
//       [activeQuestionIndex]: timeTaken,
//     }));

//     setActiveQuestionIndex(newIndex);
//     setStartTime(currentTime);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-12">
//         {/* Questions and options */}
//         <div className="col-span-3 p-5">
//           {mockAssessmentQuestions && (
//             <div className="p-5 border rounded-lg my-8">
//               <div className="mt-7 justify-end flex">
//                 <h2 className="flex items-center gap-2 justify-end">
//                   <TimerIcon />
//                   Total Time Left :
//                   <span className={timer < 30 ? "text-red-500" : ""}>
//                     {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
//                     {timer % 60}
//                   </span>
//                 </h2>
//               </div>
//               <h2 className="my-5 text-md md:text-lg">
//                 Question :{" "}
//                 {mockAssessmentQuestions[activeQuestionIndex]?.question}
//               </h2>

//               <div className="gap-6 flex flex-col">
//                 {mockAssessmentQuestions[activeQuestionIndex]?.options.map(
//                   (option, index) => (
//                     <h3
//                       key={index}
//                       className={`border p-4 rounded-2xl cursor-pointer ${
//                         isOptionSelected(activeQuestionIndex, option) &&
//                         "bg-blue-100"
//                       }`}
//                       onClick={() =>
//                         handleOptionClick(activeQuestionIndex, option)
//                       }
//                     >
//                       Option {index + 1} : {option}
//                     </h3>
//                   )
//                 )}
//               </div>

//               <div className="flex justify-end gap-6 mb-10 mt-10">
//                 {activeQuestionIndex > 0 && (
//                   <Button
//                     onClick={() =>
//                       handleQuestionChange(activeQuestionIndex - 1)
//                     }
//                   >
//                     Previous Question
//                   </Button>
//                 )}
//                 {activeQuestionIndex !==
//                   mockAssessmentQuestions?.length - 1 && (
//                   <Button
//                     onClick={() => {
//                       updateAnswer();
//                       handleQuestionChange(activeQuestionIndex + 1);
//                     }}
//                   >
//                     Next Question
//                   </Button>
//                 )}
//                 {activeQuestionIndex ===
//                   mockAssessmentQuestions?.length - 1 && (
//                   <Button
//                     onClick={() => {
//                       updateAnswer();
//                       router.replace(
//                         "/dashboard/assessment/" +
//                           assessmentData?.mockId +
//                           "/feedback"
//                       );
//                     }}
//                   >
//                     End Assessment
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Question number and camera */}
//         <div className="col-span-1 flex flex-col gap-8">
//           {/* webcam */}
//           <div className="flex flex-col justify-end items-center">
//             <div className="flex flex-col justify-end items-center bg-black rounded-lg p-5 mt-12">
//               <Image
//                 src={"/webcam.png"}
//                 width={100}
//                 height={10}
//                 className="absolute"
//               />
//               <Webcam
//                 style={{ height: "100%", width: "100%", zIndex: 10 }}
//                 mirrored={true}
//               />
//             </div>
//           </div>

//           {/* questions section */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {mockAssessmentQuestions.map((question, index) => (
//               <h2
//                 key={index}
//                 className={`p-3 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
//                   activeQuestionIndex === index ? "text-white bg-yellow-500" : ""
//                 } ${
//                   userAnswers[index] ? "bg-green-500 text-white" : ""
//                 }`}
//                 onClick={() => handleQuestionChange(index)}
//               >
//                 {index + 1}
//               </h2>
//             ))}
//           </div>

//           {/* note section */}
//           <div className="border rounded-lg p-5 bg-blue-100 mt-15">
//             <h2 className="flex gap-2 items-center text-blue-700">
//               <Lightbulb />
//               <strong>Note:</strong>
//             </h2>
//             <h2 className="text-sm text-blue-600 my-2">
//               {process.env.NEXT_PUBLIC_ASSESSMENT_NOTE}
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuestionSection;

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIAssessment, UserAssessment } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { Lightbulb, TimerIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import Email from "@/emails";

function QuestionSection({
  mockAssessmentQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  assessmentId,
}) {
  const [assessmentData, setAssessmentData] = useState({});
  const [timer, setTimer] = useState();
  const [userAnswers, setUserAnswers] = useState({});
  const [questionTimes, setQuestionTimes] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const { user } = useUser();
  const router = useRouter();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUserAnswers({});
    setQuestionTimes({});
    setStartTime(Date.now());
    getAssessmentDetails();
  }, [assessmentId]);

  const getAssessmentDetails = async () => {
    try {
      const result = await db
        .select()
        .from(AIAssessment)
        .where(eq(AIAssessment.mockId, assessmentId));

      setAssessmentData(result[0]);
      setTimer(mockAssessmentQuestions.length * 40);

      const userAnswersResult = await db
        .select()
        .from(UserAssessment)
        .where(
          and(
            eq(UserAssessment.mockIdRef, assessmentId),
            eq(
              UserAssessment.userEmail,
              user?.primaryEmailAddress?.emailAddress
            )
          )
        );

      const loadedUserAnswers = {};
      userAnswersResult.forEach((answer) => {
        const questionIndex = mockAssessmentQuestions.findIndex(
          (question) => question.question === answer.question
        );
        if (questionIndex >= 0) {
          loadedUserAnswers[questionIndex] = answer.userAns;
        }
      });
      setUserAnswers(loadedUserAnswers);
    } catch (error) {
      console.error("Error fetching assessment details:", error);
    }
  };

  const handleOptionClick = (questionIndex, option) => {
    const currentTime = Date.now();
    const timeTaken = (currentTime - startTime) / 1000;

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));

    setQuestionTimes((prevTimes) => ({
      ...prevTimes,
      [questionIndex]: timeTaken,
    }));

    setStartTime(currentTime);
  };

  const isOptionSelected = (questionIndex, option) => {
    return userAnswers[questionIndex] === option;
  };

  useEffect(() => {
    setTotalQuestion(mockAssessmentQuestions?.length);
  }, [mockAssessmentQuestions]);

  useEffect(()=> {
    setTimer(mockAssessmentQuestions?.length * 40);
  }, [mockAssessmentQuestions])

  useEffect(() => {
    if (assessmentData?.mockId) {
      updateAnswer();
    }
  }, [userAnswers[activeQuestionIndex]]);

  const updateAnswer = async () => {
    const userAnswer = userAnswers[activeQuestionIndex];
    const timeTaken = questionTimes[activeQuestionIndex];
    const correctAnswer = mockAssessmentQuestions[activeQuestionIndex]?.answer;
    if (
      userAnswer !== undefined &&
      userAnswer !== null &&
      assessmentData?.mockId
    ) {
      try {
        const existingAnswer = await db
          .select()
          .from(UserAssessment)
          .where(
            and(
              eq(UserAssessment.mockIdRef, assessmentData.mockId),
              eq(
                UserAssessment.question,
                mockAssessmentQuestions[activeQuestionIndex]?.question
              ),
              eq(
                UserAssessment.userEmail,
                user?.primaryEmailAddress?.emailAddress
              )
            )
          );

        if (existingAnswer.length > 0) {
          await db
            .update(UserAssessment)
            .set({
              userAns: userAnswer,
              timeTaken: timeTaken,
              updatedAt: moment().format("DD-MM-YYYY"),
            })
            .where(eq(UserAssessment.id, existingAnswer[0].id));
        } else {
          await db.insert(UserAssessment).values({
            mockIdRef: assessmentData.mockId,
            question: mockAssessmentQuestions[activeQuestionIndex]?.question,
            correctAns: mockAssessmentQuestions[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
            timeTaken: timeTaken,
          });
        }
        console.log(totalScore);
        if (userAnswer === correctAnswer) {
          setTotalScore((prevScore) => prevScore + 1);
        }
        toast("Answer saved successfully!");
      } catch (error) {
        console.error("Error saving answer:", error);
      }
    }
  };

  const handleQuestionChange = (newIndex) => {
    const currentTime = Date.now();
    const timeTaken = (currentTime - startTime) / 1000;

    setQuestionTimes((prevTimes) => ({
      ...prevTimes,
      [activeQuestionIndex]: timeTaken,
    }));

    setActiveQuestionIndex(newIndex);
    setStartTime(currentTime);
  };

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
        subject: "Assessment Report",
        body: emailHtml,
      })
      .then((resp) => {
        console.log(resp);
        toast("Assessment Report Sent on Email Successfully");
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-12">
        {/* Questions and options */}
        <div className="col-span-3 p-5">
          {mockAssessmentQuestions && (
            <div className="p-5 border rounded-lg my-8">
              <div className="mt-7 justify-end flex">
                <h2 className="flex items-center gap-2 justify-end">
                  <TimerIcon />
                  Total Time Left :
                  <span className={timer < 30 ? "text-red-500" : ""}>
                    {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                    {timer % 60}
                  </span>
                </h2>
              </div>
              <h2 className="my-5 text-md md:text-lg">
                Question :{" "}
                {mockAssessmentQuestions[activeQuestionIndex]?.question}
              </h2>

              <div className="gap-6 flex flex-col">
                {mockAssessmentQuestions[activeQuestionIndex]?.options.map(
                  (option, index) => (
                    <h3
                      key={index}
                      className={`border p-4 rounded-2xl cursor-pointer ${
                        isOptionSelected(activeQuestionIndex, option) &&
                        "bg-blue-100"
                      }`}
                      onClick={() =>
                        handleOptionClick(activeQuestionIndex, option)
                      }
                    >
                      Option {index + 1} : {option}
                    </h3>
                  )
                )}
              </div>

              <div className="flex justify-end gap-6 mb-10 mt-10">
                {activeQuestionIndex > 0 && (
                  <Button
                    onClick={() =>
                      handleQuestionChange(activeQuestionIndex - 1)
                    }
                  >
                    Previous Question
                  </Button>
                )}
                {activeQuestionIndex !==
                  mockAssessmentQuestions?.length - 1 && (
                  <Button
                    onClick={() => {
                      handleQuestionChange(activeQuestionIndex + 1);
                    }}
                  >
                    Next Question
                  </Button>
                )}
                {activeQuestionIndex ===
                  mockAssessmentQuestions?.length - 1 && (
                  <Button
                    onClick={() => {
                      sendEmail(user?.fullName)
                      router.replace(
                        "/dashboard/assessment/" +
                          assessmentData?.mockId +
                          "/feedback"
                      );
                    }}
                  >
                    End Assessment
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Question number and camera */}
        <div className="col-span-1 flex flex-col gap-8">
          {/* webcam */}
          <div className="flex flex-col justify-end items-center">
            <div className="flex flex-col justify-end items-center bg-black rounded-lg p-5 mt-12">
              <Image
                src={"/webcam.png"}
                width={100}
                height={10}
                className="absolute"
              />
              <Webcam
                style={{ height: "100%", width: "100%", zIndex: 10 }}
                mirrored={true}
              />
            </div>
          </div>

          {/* questions section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockAssessmentQuestions.map((question, index) => (
              <h2
                key={index}
                className={`p-3 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index && "text-white bg-yellow-500"
                } ${userAnswers[index] ? 'text-white bg-blue-600' : ''}`}
                onClick={() => handleQuestionChange(index)}
              >
                {index + 1}
              </h2>
            ))}
          </div>

          {/* note section */}
          <div className="border rounded-lg p-5 bg-blue-100 mt-15">
            <h2 className="flex gap-2 items-center text-blue-700">
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-blue-600 my-2">
              {process.env.NEXT_PUBLIC_ASSESSMENT_NOTE}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionSection;
