import { Box, Button, Modal } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useState } from "react";

interface Lead {
    id: number;
    title: string;
    shortDescription: string;
    proposalCost: number;
    budget: number;
    techStack: string[];
    created_at: Date;
    location: string;
    client: {
      id: number;
      name: string;
      isVerified: boolean;
      image: string;
    };
  }

export default function ClientDetails({ open, onClose, job }: { open: boolean; onClose: () => void, job: Lead | null }) {
    
    // details
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    
  return (
    <Modal open={open} className="flex justify-center items-center" onClose={onClose}>
        <Box className="bg-white p-8 flex flex-col gap-6 rounded-lg w-full max-w-screen-sm mx-2 sm:mx-0">
            <Box className="flex gap-4">
                <img src={job?.client.image} alt="" className="w-16 h-16 rounded-sm" />
                <Box>
                    <h1><span className="font-bold">{job?.client.name}</span> @anibaby <VerifiedIcon className="text-blue-400 w-5 h-5" /> <SecurityIcon className="text-secondary w-5 h-5" /> </h1>
                    <p className="text-sm font-semibold">Project Title: {job?.title} {`(${job?.location})`} </p>
                </Box>
            </Box>
            <p>{job?.shortDescription}</p>
            <Box className="w-full bg-secondary bg-opacity-5 p-2 rounded-md flex divide-x space-x-2">
                <Box className="flex gap-2 items-center">
                    <LocalPhoneIcon className="text-secondary w-5 h-5" />
                    <input readOnly type={ showPhone ? "text" : "password" } className="border-none outline-none bg-transparent w-auto" value={"+44 123 456 789"} />
                    {
                        showPhone ? (
                            <VisibilityOffIcon role="button" className="text-main w-5 h-5" onClick={() => setShowPhone(false)} />
                        ) : (
                            <VisibilityIcon role="button" className="text-main w-5 h-5" onClick={() => setShowPhone(true)} />
                        )
                    }
                </Box>
                <Box className="flex gap-2 items-center pl-2">
                    <MailIcon className="text-secondary w-5 h-5" />
                    <input readOnly type={ showEmail ? "text" : "password" } className="border-none outline-none bg-transparent w-auto" value={"abc@gmail.com"} />
                    {
                        showEmail ? (
                            <VisibilityOffIcon role="button" className="text-main w-5 h-5" onClick={() => setShowEmail(false)} />
                        ) : (
                            <VisibilityIcon role="button" className="text-main w-5 h-5" onClick={() => setShowEmail(true)} />
                        )
                    }
                </Box>
            </Box>
            <Box className="flex justify-center gap-4">
                <Button variant="contained" color="primary" onClick={onClose}>
                    <CloseIcon className="mr-2 w-4 h-4" />
                    Close
                </Button>
                <Button variant="contained" color="secondary" onClick={onClose}>
                    <QuestionAnswerIcon className="mr-2 w-4 h-4" />
                    Chat Now
                </Button>
            </Box>
        </Box>
    </Modal>
  )
}
