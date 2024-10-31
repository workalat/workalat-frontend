"use client"
import { Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { IoIosArrowForward } from "react-icons/io";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";

interface Question {
  _id: string;
  questionChoices: string[];
  questionTitle: string;
  questionType: "radio" | "multi-select";
}

interface Answer {
  questionTitle: string;
  answer: string[];
}

interface Step2Props {
  handleNext: () => void;
  updateFormData: (data: any) => void;
  handlePrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ handleNext, updateFormData, handlePrev } : any ) => {
  const { projectData, setProjectData, searchJobQuestions } : any  = useUserContext();
  const { generateSnackbar }: any  = useSnackbar();
  const router : any  = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() { 
      if(!projectData?.serviceCategory || !projectData?.serviceNeeded || !projectData?.serviceLocationPostal || !projectData?.postCodeRegion){
        handlePrev();
      }
      else{
        setLoading(true);
        try { 
          let res : any  = await searchJobQuestions({ category: projectData.serviceCategory, service: projectData.serviceNeeded });
          if (res?.status === 200 && res?.data?.status === "success") {
            setQuestions(res.data?.data);
            // Initialize answers array with empty answers for each question
            setAnswers(res?.data?.data.map((q: Question) => ({ questionTitle: q.questionTitle, answer: [] })));
          } else {
            generateSnackbar(res?.response?.data?.message || "Some Error Occurred, Please try Again.", "error");
          }
        } catch (e) {
          generateSnackbar("An error occurred while fetching questions.", "error");
        } finally {
          setLoading(false);
        }
      }
    }
    getData();
  }, []);

  const handleAnswer = (value: string | string[]) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionTitle: questions[currentQuestionIndex].questionTitle,
        answer: Array.isArray(value) ? value : [value]
      };
      return updatedAnswers;
    });
  };

  const handleNext2 = (e,skip = false) => {
    const currentAnswer = answers[currentQuestionIndex];

    if ((currentAnswer.answer.length === 0) &&  !skip ) {
      generateSnackbar("Please answer the question before proceeding.", "error");
      return;
    } 

    if (currentQuestionIndex < questions.length - 1 ) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // All questions answered
      setProjectData(prevData => ({
        ...prevData,
        serviceQuestions: answers
      }));
      console.log(projectData);
      handleNext(); // Move to the next step of the form
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    } else {
      handlePrev(); // Go to previous step in the overall form
    }
  }; 

  const handleSkip = () => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionTitle: questions[currentQuestionIndex].questionTitle,
        answer: []
      };
      return updatedAnswers;
    });
    handleNext2(()=>{},true); // Move to next question
  };

  if (loading) {
    return (
      <div className="w-[100%] h-auto flex justify-center items-center">
        <div className="loader m-auto" />
      </div>
    );
  }

  if (questions.length === 0) {
    handleNext();
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex]?.answer || [];

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-center md:mt-8 capitalize">
        {currentQuestion.questionTitle}
      </h1>
      <form className="flex flex-col gap-0 px-2 sm:px-4 pr-8 sm:pr-12 w-full">
        {currentQuestion.questionType === "radio" ? (
          <FormControl>
            <RadioGroup
              aria-labelledby={currentQuestion.questionTitle}
              name={currentQuestion.questionTitle}
              value={currentAnswer[0] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
            >
              {currentQuestion.questionChoices.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  value={choice}
                  control={<Radio />}
                  label={choice}
                  labelPlacement="start"
                  className="flex-grow capitalize text-base md:text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
                />
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          currentQuestion.questionChoices.map((choice, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={currentAnswer.includes(choice)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAnswer([...currentAnswer, choice]);
                    } else {
                      handleAnswer(currentAnswer.filter(a => a !== choice));
                    }
                  }}
                />
              }
              label={choice}
              labelPlacement="start"
              className="flex-grow capitalize text-base md:text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
            />
          ))
        )}
        <div className="md:mt-8 flex justify-between pl-4">
          <Button
            variant="outlined"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            color="secondary"
            onClick={handlePrevious}
          >
            <Image src={arrowRightIcon} alt="Arrow right" className="rotate-180" />
            <span className="font-bold">Back</span>
          </Button>
          <Button
            variant="contained"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            onClick={handleNext2}
          >
            <span className="font-bold">Next</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
        <button type="button" onClick={handleSkip} className="flex items-center justify-center mt-2">
          Skip <IoIosArrowForward className="size-3" />
        </button>
      </form>
    </>
  );
};

export default Step2;