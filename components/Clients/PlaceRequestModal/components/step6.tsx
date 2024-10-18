import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react"; 
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";



interface Step5Props {
  updateFormData: (data: any) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const Step6: React.FC<Step5Props> = ({
  handleNext,
  updateFormData,
  handlePrev,
}) => {
  const [budget, setBudget] = React.useState(
    localStorage.getItem("stepFormData")
      ? JSON.parse(localStorage.getItem("stepFormData")!).budget
      : ""
  );
  let [selectedBudget, setSelectedBudget] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget((event.target as HTMLInputElement).value);
  };

  //My Workflow
  const { projectData, setProjectData, getPointsBudget } = useUserContext();
  const { generateSnackbar } = useSnackbar();
  const router = useRouter();
  let [budgetData, setBudgetData] = useState([]); 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
      async function findData(){
        try{
          if(!projectData.serviceFrequency){
              handlePrev();
          }
          else{
            let category = projectData.serviceCategory;
            if(!category){
              router.push("/");
            }
            else{
              let res = await getPointsBudget({category});
              if(res.status !== 400 || res.data?.status === "success"){
                setBudgetData(res.data?.data);
              }
              else{
                generateSnackbar("Error fetching budget data.", "error");
              }
            }
          }
        }
        catch(e){
          // console.log(e);
          generateSnackbar("Error fetching budget data.", "error");
        }
      };
      findData();
  }, []);

  const handlePriceChange= (e: React.FormEvent<HTMLFormElement>) => {
    setSelectedBudget(e.target.value);
  }; 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(selectedBudget <=0){
      generateSnackbar("Pease select a budget", "error")
    }
    else{ 
      let projectPriceString = (selectedBudget >=0 && selectedBudget <=150) ? `Small Project (Below £${selectedBudget})` : (selectedBudget >=151 && selectedBudget <=500) ? `Mini Project (Below £${selectedBudget})` : (selectedBudget >=501 && selectedBudget <=3000) ? `Mega Project (Below £${selectedBudget})` : (selectedBudget > 3000) ? `Premium Project (£${selectedBudget} & above)` :""
      let projectPriceTitle = `0-${selectedBudget}`;
      let findPoints = budgetData.find((val)=>{if(val.budget === parseInt(selectedBudget)){return(val)}});
      setProjectData({
        ...projectData,
        projectPriceString,
        projectPriceTitle,
        projectMaxPrice : parseInt(selectedBudget),
        pointsNeeded : parseInt(findPoints.point)
      })
      console.log(projectData);

      // updateFormData({ budget: budget });
      handleNext();
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center">What is your estimated budget?</h1>
      <p className="-mt-4">Please indicate your budget range.</p>
      <form className="flex flex-col gap-0 pl-2 pr-8 md:px-8 md:pr-14 w-full" onSubmit={handleSubmit}>
        <FormControl>
          <RadioGroup
            aria-labelledby="additional service"
            name="additional service"
            value={budget}
            onChange={handleChange}
          >
            {budgetData.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.budget}
                control={<Radio />}
                onChange={handlePriceChange}
                label={<span>{(item.budget >=0 && item.budget <=150) ? `Small Project (Below £${item.budget})` : (item.budget >=151 && item.budget <=500) ? `Mini Project (Below £${item.budget})` : (item.budget >=501 && item.budget <=3000) ? `Mega Project (Below £${item.budget})` : (item.budget > 3000) ? `Premium Project (£${item.budget} & above)` :""}  <b></b></span>}
                labelPlacement="start"
                className="flex-grow md:text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="pl-4 sm:pl-4 mt-2 md:mt-8 flex justify-between">
          <Button
            variant="outlined"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            color="secondary"
            onClick={handlePrev}
          >
            <Image
              src={arrowRightIcon}
              alt="Arrow right"
              className="rotate-180"
            />
            <span className="font-bold">Back</span>
          </Button>
          <Button
            variant="contained"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4 md:-mr-2"
            type="submit"
          >
            <span className="font-bold">Next</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step6;
