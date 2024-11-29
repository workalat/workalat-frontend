"use client";

import { BsThreeDotsVertical } from "react-icons/bs";
import "./Message.css";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/context/firebase";
import moment from "moment";

type PropsType = {
  data: any;
};
export default function MessageBox({ data }: PropsType) {
  const [demoMessageCollection, setDemoMessageCollection]: any = useState<
    any[]
  >([]); // here it is for the demo message collection fot the message box
  const [isModalOpen, setIsModalOpen]: any = useState<boolean>(false);
  const [modalImage, setModalImage]: any = useState<string | null>(null);

  const handleImageClick = (imgUrl: any) => {
    setModalImage(imgUrl);
    setIsModalOpen(true);
  };

  let [chat, setChat]: any = useState(false);
  let [text, setText]: any = useState("");
  let [img, setImg]: any = useState({
    file: null,
    url: "",
  });

  let endRef: any = useRef(null);

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    let unSub = onSnapshot(doc(db, "chats", data?.chatId), (res) => {
      setChat(res?.data());
    });

    return () => {
      unSub();
    };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      {/* Header */}
      <div className="w-full flex justify-between bg-[#EDEDED] p-3 rounded-md">
        <div className="flex items-center">
          <img
            className="w-10 h-10 object-cover object-top rounded-full border shadow"
            src={data?.user?.data?.avatar}
            alt=""
          />
          <div className="px-2">
            <p className="text-[17px] text-[#989BA1] font-semibold tracking-wide capitalize">
              {data?.user?.data?.businessName.length > 0
                ? data?.user?.data?.businessName
                : data?.user?.data?.username}
            </p>
            <p className="text-[13px] text-[#989BA1] font-semibold tracking-wide capitalize">
              {data?.projectTitle.slice(0, 45)}...
            </p>
          </div>
        </div>
        <button>
          <BsThreeDotsVertical className="size-[20px] text-[#989BA1]" />
        </button>
      </div>

      {/* Chat box with messages */}
      <div className="w-full h-[540px] justify-between  bg-[#EDEDED] p-3 mt-3 rounded-md relative border-4 border-red-400">
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll custom-scroll-of-message pb-12">
          {/* Display Demo Messages */}

          {chat?.messages?.map((messageData: any, i: number) => (
            <>
              {messageData.senderId === data?.receiverId ? (
                <div
                  key={i}
                  className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:w-[350px] flex md:flex-row-reverse items-start ms-auto gap-5 py-2 max-md:mx-auto"
                >
                  <div>
                    {messageData?.text && (
                      <div className="flex-grow flex flex-col justify-start bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden">
                        <p className="text-[15px] px-5 ">{messageData?.text}</p>
                      </div>
                    )}
                    {messageData?.img && (
                      <div
                        className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                        onClick={() => handleImageClick(messageData.img)}
                      >
                        <img
                          className="w-full h-auto"
                          src={messageData.img}
                          alt="work alat"
                        />
                      </div>
                    )}
                    <p className="text-[#989BA1] text-[12px] pt-1 text-end">
                      {moment(
                        new Date(
                          messageData?.createdAt?.seconds * 1000 +
                            messageData?.createdAt?.nanoseconds / 1000000
                        )
                      ).format("h:mm A")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:flex-row md:w-[350px] flex items-start gap-5 py-2 max-md:mx-auto">
                  <div>
                    {messageData?.text && (
                      <div className="flex-grow flex flex-col bg-white ring-[2px] shadow ring-[#1D75DD]/50 rounded-md p-2 h-full overflow-hidden">
                        <p className="text-[15px] px-5">{messageData?.text}</p>
                      </div>
                    )}
                    {messageData?.img && (
                      <div
                        className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                        onClick={() => handleImageClick(messageData.img)}
                      >
                        <img
                          className="w-full h-auto"
                          src={messageData.img}
                          alt="work alat"
                        />
                      </div>
                    )}
                    <p className="text-[#989BA1] text-[12px] pt-1">
                      {moment(
                        new Date(
                          messageData?.createdAt?.seconds * 1000 +
                            messageData?.createdAt?.nanoseconds / 1000000
                        )
                      ).format("h:mm A")}
                    </p>
                  </div>
                </div>
              )}
            </>
          ))}
          {/* <div ref={endRef}></div> */}
        </div>
      </div>
    </div>
  );
}
