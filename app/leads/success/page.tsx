"use client";
import { Box, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import { useSearchParams, useRouter } from "next/navigation";

export default function ManageMembershipPage() {
  let [loading, setLoading] = useState(false);
  let [loading2, setLoading2] = useState(false);

  let { payAsGoSessionData, setPayPayment } = useUserContext();
  const { generateSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    async function confirmSubs() {
      if (hasFetched.current) return;
      try {
        setLoading2(true);
        let sessionId = searchParams.get("sessionId");
        if (!sessionId) {
          generateSnackbar("Session ID is missing", "error");
          return;
        }

        setLoading2(false);
        setLoading(true);
        let res = await payAsGoSessionData({ sessionId });

        if (res.status === 200 && res.data?.status === "success") {
          setPayPayment("paid"); 
          generateSnackbar("Wallet Purchase Successful.", "success");

          console.log(process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ORIGIN)
          // Send message back to parent window (ensure the origin matches)
          window.opener.postMessage(
            { paymentStatus: "success" },
            process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ORIGIN // Set your domain here
          );
 
          // Close the window after notifying the parent
          window.close();
        } else {
          generateSnackbar("Failed to confirm payment. Please try again.", "error");
          router.push("/wallet/error");
        }
      } catch (e) {
        generateSnackbar("Error during payment confirmation.", "error");
        router.push("/wallet/error");
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    }

    confirmSubs();
  }, [searchParams, payAsGoSessionData, setPayPayment, generateSnackbar, router]);

  return (
    <>
      {loading2 ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <Modal open={loading}>
          <Box className="w-full h-full flex justify-center items-center">
            <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
              <img src="/images/loader.gif" alt="Loading..." className="w-60" />
              <h1 className="text-center font-bold text-xl ml-2">Confirming Payment...</h1>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
