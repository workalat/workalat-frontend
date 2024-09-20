import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WalletIcon from '@mui/icons-material/Wallet';
import { Box, Button, Modal, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from 'react';

import doneIcon from "@/public/icons/done.svg";

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

export default function ContactClient({ open, onClose, job, openClientDetails, applied, setApplied}: { open: boolean; onClose: () => void, job: Lead | null, openClientDetails: () => void, applied: boolean, setApplied: (applied: boolean) => void }) {

  // application
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: add contact client logic
    // simulate form submission
    setLoading(false);
    setApplied(true);

    // show client contact details after 3 sec
    setTimeout(() => {
      openClientDetails();
    }, 2000)
  }

  
  const JobDoneModal = (
    <div>
      <img src={doneIcon.src} alt='' className='w-20 mx-auto mb-2' />
      <h1 className='text-lg font-bold'>Done!</h1>
      <p>You can now contact {job?.client.name}</p>
    </div>
  )

  return (
    <Modal open={open} className="flex justify-center items-center" onClose={onClose}>
      <Box className="bg-white w-full max-w-screen-sm text-center rounded-md p-6 pb-12 shadow-md">
        {
          loading ? <div className="loader m-auto" /> : (
            applied ? JobDoneModal : (
              <>
                <WalletIcon className="text-secondary text-7xl" />
                <h1 className="font-bold">Contacting {job?.client.name} will cost you {job?.proposalCost} points</h1>
                <p>You have 20 points in your wallet.{" "}
                  <Link href="/wallet" className="text-red font-bold hover:underline">Top up!</Link>
                </p>
                <form className="mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    multiline
                    label="Type your proposal"
                    rows={4}
                    className="shadow-md"
                  />
                  <Button variant="contained" type="submit" className="mt-4 font-semibold" size="large" >
                    Contact client
                    <ArrowForwardIcon className="ml-2 text-2xl" />
                  </Button>
                </form>
              </>
            )
          )
        }
      </Box>
    </Modal>
  )
}
