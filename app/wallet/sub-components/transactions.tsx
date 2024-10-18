"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NorthIcon from "@mui/icons-material/North";
import { useEffect, useState } from "react";
import moment from "moment";

interface row {
  id: number;
  details: string;
  transactionId: number;
  date: Date;
  type: "success" | "fail";
  amount: string;
}


function createData(
  id: number,
  details: string,
  transactionId: number,
  date: Date,
  type: "success" | "fail",
  amount: string
): row {
  return { id, details, transactionId, date, type, amount };
}


const SuccessButton = () => (
  <Box className="bg-green-500 text-white rounded-md px-4 py-1 w-40 text-center flex justify-center items-center gap-2">
    <NorthIcon className="w-4 md:w-6" />
    Success
  </Box>
);

const FailButton = () => (
  <Box className="bg-red text-white rounded-md px-4 py-1 w-40 text-center flex justify-center items-center gap-2">
    <NorthIcon className="w-4 md:w-6 rotate-180" />
    Fail
  </Box>
);

export default function Transactions({data}) {
  console.log(data)
  const [rows, setRows] = useState<row[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Box className="!mb-8">
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table className="[&_*]:!font-mono border !rounded-lg md:[&_*]:!text-lg shadow-md">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell align="left" className="!pl-4 min-w-[120px]">
                ID
              </TableCell>
              <TableCell align="left" className="min-w-[120px]">Details</TableCell>
              <TableCell align="left" className="min-w-[120px]">Transaction Id</TableCell>
              <TableCell align="left" className="min-w-[120px]">Date & time</TableCell>
              <TableCell align="left" className="min-w-[120px]">Type</TableCell>
              <TableCell align="left" className="min-w-[120px]">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (data.map((row, i) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="!pl-4 min-w-[120px]">
                  #{i+1}
                </TableCell>
                 <TableCell align="left" className="min-w-[120px]">
                  <AccountBalanceWalletIcon className="w-6 mr-2" />
                  {row.points} Wallet Points
                </TableCell>
                <TableCell align="left" className="min-w-[120px]">{`${row._id.slice(0,12)}...`}</TableCell>
                <TableCell align="left" className="min-w-[120px]">{moment(parseInt(row.transactionTimeStamp)).format('DD MMM YYYY h:mmA')}</TableCell> 
                 <TableCell align="left" className="min-w-[120px]">
                  {row.transactionStatus === "success" ? <SuccessButton /> : <FailButton />}
                </TableCell>
                <TableCell align="left" className="min-w-[120px]">£{row.transactionAmount}</TableCell>  
              </TableRow>
            )))
            : (
              <TableRow>
                {[...Array(5)].map((_, i) => (
                  <TableCell key={i} align="left" className="!pl-4 min-w-[120px]">
                    <div className="animate-pulse bg-gray-300 h-5 w-20 rounded-md" />
                  </TableCell>
                ))}
              </TableRow>
            )
          }
          </TableBody>
        </Table>
      </div>
    </Box>
  );
}
