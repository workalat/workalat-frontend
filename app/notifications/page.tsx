import React from 'react'
import { Button, FormControlLabel, Switch } from '@mui/material'
import Image from 'next/image';

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import arrowRightWhiteIcon from "@/public/icons/arrow_right_white.svg";

const NotificationsPage = () => {
  return (
    <>
      <section className='bg-main text-white px-6 py-12 sm:p-12 rounded-lg'>
        <h1 className='text-3xl sm:text-4xl font-bold'>Notifications</h1>
        <h2 className='text-lg font-semibold mt-3'>Choose your mail preference</h2>
        <form className='flex flex-col w-full gap-6 mt-6'>
            <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Changes to my requests"
                labelPlacement="start"
                className='flex justify-between ml-0'
                />
            <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Updates about new features on WhatWorks"
                labelPlacement="start"
                className='flex justify-between ml-0'
                />
            <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Reminders to reply to Professionals"
                labelPlacement="start"
                className='flex justify-between ml-0'
            />
            <div className='flex justify-center gap-4 flex-col sm:flex-row gap-y-0'>
                <Button
                    variant="outlined"
                    className="h-[50px] sm:max-w-[130px] rounded-sm flex gap-2 mt-4 flex-grow text-white border-white hover:border-white hover:bg-white hover:bg-opacity-10" 
                >
                    <span className="font-bold">More</span>
                    <Image src={arrowRightWhiteIcon} alt="Arrow right" />
                </Button>
                <Button
                    variant="contained"
                    className="h-[50px] sm:max-w-[130px] rounded-sm flex gap-2 mt-4 flex-grow"
                >
                    <span className="font-bold">Save</span>
                    <Image src={arrowRightIcon} alt="Arrow right" />
                </Button>
            </div>
        </form>
      </section>
    </>
  )
}

export default NotificationsPage
