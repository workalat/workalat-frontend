"use client"
import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import closeIcon from "@/public/icons/close.svg";
import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";

interface ChangePassProps {
  open: boolean;
  onClose: () => void;
}
const ChangePasswordModal = ({ open, onClose ,userId , userType}: any) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const { generateSnackbar } = useSnackbar();
  
  let { changePassword } = useUserContext();

  const handleSubmit = async (event: FormEvent) => {
    try{
      event.preventDefault();

    if (!newPassword || !confirmPassword || !currentPassword) {
      return generateSnackbar("Please Enter Password", "error");
    }

    if (newPassword !== confirmPassword) {
      return generateSnackbar("Passwords do not match", "error");
    }
    
    let res : any  = await changePassword({userId ,userType, oldPassword :currentPassword , newPassword : newPassword});
    if(res?.status === 200 || res?.response.data?.status === "success"){

      generateSnackbar("Password Changed Successfully.", "success")
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
  }
  else{
      generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
  }
    }
    catch(e){
      return generateSnackbar("Some Error Occur, Please Try Again.", "error");
    }
  };

  return (
    <Modal
      open={open}
      className="flex justify-center items-start mt-40"
      onClose={onClose}
    >
      <Box
        className="bg-white w-full max-w-2xl mx-4 p-6 py-8 rounded-xl"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box className="flex justify-between items-center border-b border-dark border-opacity-30 pb-2">
          <Typography gutterBottom className="text-xl font-semibold">
            Change Password
          </Typography>
          <Image alt="Close" src={closeIcon} className="cursor-pointer" onClick={onClose} />
        </Box>
        <FormControl fullWidth margin="normal" className="mt-8">
          <TextField
            label="Current Password"
            name="currentPassword"
            className="shadow-medium"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="New Password"
            name="newPassword"
            className="shadow-medium"
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            className="shadow-medium"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Box mt={2} className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            color="secondary"
            className="gap-2 py-3 px-6 flex-grow sm:flex-grow-0"
          >
            Cancel
            <Image src={cancelIcon} alt="Cancel" />
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="gap-2 py-3 px-6 flex-grow sm:flex-grow-0"
            onClick={handleSubmit}
          >
            Save changes
            <Image src={arrowRight} alt="Save changes" />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
