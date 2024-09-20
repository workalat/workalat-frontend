"use client"
import { Box } from "@mui/material";
import { useState } from "react";

import CurrentBalance from "./sub-components/balance";
import MoreCredits from "./sub-components/more-credits";
import Transactions from "./sub-components/transactions";
import BuyPoints from "./sub-components/buy";
import SuccessModal from "./sub-components/success";

export default function WalletPage() {
    // buy modal
    const [open, setOpen] = useState(false);

    // success modal
    const [success, setSuccess] = useState(false);

    const openBuyModal = () => {
        setOpen(true);
    };
    
  return (
    <Box className="space-y-8 mt-8">
        <CurrentBalance />
        <MoreCredits openBuyModal={openBuyModal} />
        <Transactions />
        <BuyPoints open={open} setOpen={setOpen} data={{ points: "25 Points", price: "£42.50"  }} setSuccess={setSuccess} />
        <SuccessModal open={success} setOpen={setSuccess} />
    </Box>
  );
}
