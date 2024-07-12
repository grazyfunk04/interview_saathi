"use client";
import { Lightbulb, TimerIcon, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function QuestionSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  setTimeTaken
}) {
  const [timer, setTimer] = useState(180);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setActiveQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < mockInterviewQuestions.length ? nextIndex : 0;
      });
      setTimer(180);
      setStartTime(Date.now());
    }

    return () => clearInterval(countdown);
  }, [timer, setActiveQuestionIndex, mockInterviewQuestions.length]);

  useEffect(() => {
    setTimer(180);
    setStartTime(Date.now());
  }, [activeQuestionIndex]);

  const handleQuestionClick = (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setTimeTaken((prevTimeTaken) => ({
      ...prevTimeTaken,
      [activeQuestionIndex]: timeSpent,
    }));
    setActiveQuestionIndex(index);
    setStartTime(Date.now());
  };

  const textToSpeech = (question) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(question);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech!!');
    }
  };

  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestions.map((question, index) => (
            <h2
              key={index}
              className={`p-3 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index && "text-white bg-yellow-500"
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestions[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-600 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>

        <div className="mt-7">
          <h2 className="flex items-center gap-2">
            <TimerIcon />
            Time Left:
            <span className={timer < 30 ? "text-red-500" : ""}>
              {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
              {timer % 60}
            </span>
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
