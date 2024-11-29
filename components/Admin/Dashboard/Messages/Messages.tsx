'use client'

import { IoIosNotificationsOutline } from "react-icons/io"
import "./MessageBox/Message.css"
import Menus from "../Menus/Menus"
import { IoSettingsOutline } from "react-icons/io5"
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { messagesData } from "@/utils/messagesData";
import MessageBox from "./MessageBox/MessageBox";
import { RxHamburgerMenu } from "react-icons/rx"
import Composition from "./CompositionModal/Composition"


import { useRouter, usePathname } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from "js-cookie";
import moment from "moment";
import { useUserStore } from "@/context/userStore";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/context/firebase";
import { useChatStore } from "@/context/chatStore";
import { useUserContext } from "@/context/user_context";

export default function Messages() {
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };




    
  // BACKEND INTEGRATION
  const {
    verifyAdmin,
  }: any = useUserContext();

  
  const [selectedMessage, setSelectedMessage]  : any  = useState<any>(); // to select message for open and manage active conversation
  const [messageListOpen, setMessageListOpen]  : any  = useState<boolean>(true);
  let [adminData, setAdminData] : any = useState({});
  const [loading2, setLoading2]  : any  = useState(true);
  const [chats, setChats]  : any  = useState([]);
  const [seen, setSeen] : any    = useState(0);
  const [input, setInput]  : any  = useState(""); // Search input state

  const router  : any  = useRouter();
  const { generateSnackbar }  : any  = useSnackbar();
  const { userChatDetilas }  : any  = useUserContext();
 

    async function findUserAndChats() {
      try {
            const unSub = onSnapshot(collection(db, "usersChats"), async (querySnapshot) => {
            let chatData : any = [];
          
            // Loop through all chat documents and fetch chat details
            for (const doc of querySnapshot.docs) {
              let item : any = doc.data()?.chats; // assuming chats are in an array under 'chats'
          
              if (item && item.length > 0) {
                // We will process each chat item sequentially
                let promises : any = [];
                
                // Loop through each chat item and fetch user details
                for (const chatItem of item) {
                  try {
                    let userDocRef : any = await userChatDetilas({
                      userId: chatItem?.receiverId,
                      userType: "admin",
                    });
          
          
                    // Check for valid userDocRef before pushing to promises
                    if (userDocRef?.status === 200 || userDocRef?.data?.status === "success") {
                      let userDocSnap = userDocRef?.data;
                      // Add the valid chatItem and userDocSnap to promises array
                      promises.push({ userDocSnap, chatItem });
                    }
                  } catch (error) {
                    console.error("Error fetching userDocRef for chatItem", chatItem, error);
                  }
                }
          
                // Now resolve all promises
                let chatDetails = await Promise.all(promises.map(({ userDocSnap, chatItem }) => {
                  if (userDocSnap) {
                    return { ...chatItem, user: userDocSnap }; // Add user to chatItem
                  }
                  return undefined; // If no valid userDocSnap, return undefined
                }));
          
                // Filter out undefined values
                chatDetails = chatDetails.filter(item => item !== undefined);
          
                chatData = [...chatData, ...chatDetails]; // Add valid chat details to chatData
              }
            }
          
            // Sort chats by last updated timestamp
            setChats(chatData.sort((a, b) => b?.updatedAt - a?.updatedAt));
            setLoading2(false);
          });
          
          // Return the unsubscribe function to be called on unmount
          return unSub;

      } catch (e) {
        // console.log(e);
      }
    }

  useEffect(() => {
    async function verify() {
      try {
        setLoading2(true);
        let adminToken: any = Cookies.get("adminToken");

        if (adminToken !== undefined) {
          let res: any = await verifyAdmin({ adminToken });
          if (
            res?.status === 200 ||
            res?.data?.status === "success" ||
            res?.data?.data?.verify === true
          ) {
            // Call the async function inside useEffect
            setAdminData(res?.data?.data)
            const unSubFn = findUserAndChats();
          } else {
            router.push("/admin-login");
          }
        } else {
          router.push("/admin-login");
        }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Something went wrong, please Try Again.", "error");
      }
    }
    verify();

    
  
      // Cleanup function to unsubscribe when the component unmounts
      return () => {
        if (findUserAndChats) {
          findUserAndChats(); // This will stop the real-time updates
        }
      };
  }, []);

  // Recalculate the 'seen' value when 'chats' changes
  useEffect(() => {
    const unseenMessages = chats?.filter((message: any) => !message?.isSeen).length;
    setSeen(unseenMessages || 0);
  }, [chats]);


  const filteredChats = chats.filter((message: any) =>
    message?.user?.data?.username?.toLowerCase().includes(input.toLowerCase()) || message?.user?.data?.businessName?.toLowerCase().includes(input.toLowerCase())  
  );


    return (
        <>
            {loading2 ? (
          <div className="w-[100%] h-screen flex justify-center items-center">
            <div className="loader m-auto" />
          </div>
        ) : (
            <>
            <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 pt-2 md:py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of message box */}
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center pe-2">
                        <button className="block md:hidden" onClick={() => setMessageListOpen(!messageListOpen)}><RxHamburgerMenu className="size-[20px]" /></button>
                        <h4 className="md:text-[28px] text-[17px] font-bold text-[#555758]">Messages</h4>
                    </div>

                    <div className="flex justify-end gap-2">
                        {/* compose button */}
                        <button onClick={openModal} className="md:px-6 px-2 leading-3 text-[13px] md:text-[15px] h-auto text-white bg-[#07242B] rounded-md">+ Compose</button>
                        {/* notification */}
                        <button className="md:p-2 p-[1px]"><IoIosNotificationsOutline className="size-[20px] md:size-[24px] text-black/50" /></button>
                        {/* user information */}
                        <button className="flex px-1 gap-2 items-center py-1">
                            <img className="md:w-10 w-8 md:h-10 h-8 object-cover rounded-full object-top border shadow" src={adminData?.picture} alt="work alat" />
                            <p className="text-[15px] text-[#555758] font-semibold">{adminData?.name}</p>
                        </button>
                    </div>
                </div>

                {/* message box must be dynamic with chat socket io */}
                <div className="flex h-full gap-4 relative">

                    <div className={`w-[260px] h-[76vh] custom-scroll-of-message max-md:overflow-scroll md:h-[560px] absolute md:static ${messageListOpen ? "left-0 top-0 bottom-0 max-md:z-[150] visible md:visible md:shadow-none shadow-lg md:bg-transparent bg-white p-2" : "-left-full bottom-0 top-0 invisible md:visible md:shadow-none shadow-lg md:bg-transparent bg-white p-2 max-md:z-[150]"} transition-all duration-300`}>

                        <div className="flex w-full py-2 justify-between">
                            <div className="flex gap-2">
                                <p className="text-[14px] text-[#555758] font-semibold">Inbox</p>
                                {/* label will dynamic */}
                                {/* <label className="bg-[#C3F0FB] text-[#1D75DD] text-[8px] py-1 px-3 rounded-lg">{2} New</label> */}
                            </div>

                            <button><IoSettingsOutline className="size-[18px] text-[#555758]" /></button>
                        </div>

                        <div className="py-2">
                            <div className="flex items-center bg-[#F2F2F2] rounded-[20px] px-4 py-1 w-full">
                                <AiOutlineSearch className="size-[20px] text-[#909090]" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="outline-none bg-transparent ml-2 text-gray-500 placeholder-gray-400 w-full py-1"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)} 
                                />
                            </div>
                        </div>

                        {/* message list */}
                        <div className="md:py-1 h-[76vh] md:h-full">
                                               <ul className="h-full  w-[100%] rounded-xl overflow-x-hidden chat-nav flex-shrink-0">
                        {filteredChats && filteredChats?.map((message: any, i: number) => (
                          <li
                            key={i}
                            onClick={() => {
                              setSelectedMessage(message);
                              setMessageListOpen(false);
                            }}
                            className={`w-full  ${
                              selectedMessage?.receiverId === message?.receiverId
                                ? "bg-[#07242B]"
                                : "bg-[#F2F2F2]"
                            } p-3 mb-[1px] cursor-pointer`}
                          >
                            <div className="flex justify-between gap-3">
                              <div className="flex items-center">
                                <img
                                  className="w-8 h-8 object-cover object-top rounded-full border shadow"
                                  src={message?.user?.data?.avatar}
                                  alt=""
                                />
                                <div className="px-2">
                                  <p className="text-[14px] text-[#989BA1] font-semibold tracking-wide capitalize">
                                    {message?.projectTitle?.substring(0, 13)}...
                                  </p>
                                  <p className="text-[10px] text-[#989BA1] font-semibold tracking-wide capitalize">
                                    {message?.user?.data?.businessName.length > 0 ? message?.user?.data?.businessName  : message?.user?.data?.username}
                                  </p>
                                </div>
                              </div>
                              <p className="text-[12px] font-semibold text-[#989BA1]">
                                {moment.duration(message?.updatedAt - Date.now()).humanize()}
                              </p>
                            </div>
                            <div className="py-2">
                              <p className="text-[13px] text-[#989BA1] px-3">
                                {message?.lastMessage?.substring(0, 30)}...
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                        </div>
                    </div>

                    {/* message box main */}
                    {
                        selectedMessage ? <div className="w-auto flex flex-1 justify-center items-center h-[74vh] md:h-[635px] p-3 mt-3 rounded-md overflow-x-auto overflow-y-scroll custom-scroll-of-message">
                            <MessageBox data={selectedMessage}/>
                        </div> : <div className="w-auto flex flex-1 justify-center items-center h-[74vh] md:h-[635px] p-3 mt-3 rounded-md bg-[#EDEDED]">
                            <p className="text-xl font-semibold capitalize text-[#989BA1]">No conversation selected</p>
                        </div>
                    }
                </div>

                {/* admin composition */}
                {isModalOpen && (
                    <Composition closeModal={closeModal} isOpen={isModalOpen} />
                )}
            </div>
        </div>


            </>
        )
    }
        
        </>
            )
}
