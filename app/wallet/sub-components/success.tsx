import ArrowForward from '@mui/icons-material/ArrowForward'
import { Box, Button, Modal } from '@mui/material'
import React from 'react'

export default function SuccessModal(
    { open, setOpen } : { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }
) {
  return (
    <Modal open={open} className='flex justify-center items-center' onClose={() => setOpen(false)} >
        <Box className=" bg-white rounded-md p-6 w-full max-w-xl flex flex-col justify-center items-center">
            <img src="/icons/done.svg" alt='' />
            <h1 className='font-bold text-xl'>Payment Successfull</h1>
            <p>Your wallet will be credited soon.</p>
            <Button variant="contained" className="mt-8 font-semibold" onClick={() => setOpen(false)}>
                <ArrowForward className='rotate-180 w-5 mr-2' />
                Back to Wallet
            </Button>
        </Box>
    </Modal>
  )
}
