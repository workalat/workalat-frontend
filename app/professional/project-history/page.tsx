"use client";

import VerifyUser from "@/app/middleware/VerifyUser";
import { projectHistory } from "@/utils/projectClientsData";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import moment from "moment";

export default function projects() {
  const [loading2, setLoading2] : any  = useState(true);
  let [userData, setUserData] : any  = useState({});
  let [projectData, setProjectData] : any  = useState([]);
  let { AllProjectHistory } : any  = useUserContext();
  const { generateSnackbar } : any  = useSnackbar();
  let router : any  = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        setLoading2(true);
        let token : any  = Cookies.get("token");
        let ver : any  = await VerifyUser(token, "professional");
        if (ver?.status === "success" && ver.userType === "professional") {
          setUserData(ver);
          let data : any  = await AllProjectHistory({
            userId: ver.userId,
            userType: ver.userType,
          });
          if (data?.status !== 400 || data?.data?.status === "success") {
            setProjectData(data?.data?.data?.reverse());
            setLoading2(false);
          } else {
            generateSnackbar(
              data?.response?.data?.message ||
                "Some error occurred, Please try again",
              "error"
            );
          }
        } else {
          router.push("/");
        }
      } catch (e) {
        generateSnackbar("Some Error Occur, Please try Again.", "error");
      }
    }
    verify();
  }, []);

  return (
    <>
      {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
          <div className="bg-white relative">
            {/* Left Image */}
            <img
              className="absolute z-0 left-0 top-[40px] w-[600px]"
              src="/CIRCLES.png"
              alt="workalat"
            />
            {/* Right Image */}
            <img
              className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]"
              src="/CIRCLES.png"
              alt="workalat"
            />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
              <div className="pb-12">
                <h1 className="text-2xl font-bold text-[#07242B]">
                  Project History
                </h1>

                <div className="w-full pt-5">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="py-2 border-b border-black/20">
                        <tr>
                          <th className="p-4 text-left">Project title</th>
                          {/* <th className="p-4 text-left">Award status</th> */}
                          <th className="p-4 text-left">Date posted</th>
                          <th className="p-4 text-left">Status</th>
                          <th className="p-4 text-left">Amount</th>
                          <th className="p-4 text-left">Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectData.map((data, i) => (
                          <tr
                            key={data?._id}
                            className={`border-b border-black/20 ${i % 2 == 0 && "bg-white"}`}
                          >
                            <td className="p-4">
                              <p className="text-[15px] font-semibold capitalize">
                                {data?.serviceNeeded} (
                                {data?.serviceLocationTown
                                  ? `${data?.serviceLocationTown},`
                                  : ""}{" "}
                                {data.serviceLocationPostal}){" "}
                              </p>
                            </td>
                            {/* <td className="p-4">
                                                <p className="text-gray-500 text-[15px] capitalize">{data?.award}</p>
                                            </td> */}
                            <td className="p-4 text-[15px] capitalize">
                              {moment(data?.projectTimeStamp).format(
                                "dddd, D MMMM  h:mm A"
                              )}
                            </td>
                            <td className="p-4 text-[15px] capitalize">
                              {data?.awardedStatus !== "awarded"
                                ? "Not Awarded"
                                : data?.projectStatus === "completed"
                                  ? "Completed"
                                  : data?.projectStatusClient}
                            </td>
                            <td className={`p-4 text-[15px] capitalize`}>
                              £{data?.projectPriceTitle}
                            </td>
                            <td className="p-4">
                              <button
                                onClick={()=>{router.push(
                                    `/professional/my-responses/details/${data?._id}`
                                  )}}
                                className="bg-transparent border-2 border-[#FFBE00] text-black px-4 py-2 font-semibold rounded flex justify-center items-center gap-2 text-[15px]"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
