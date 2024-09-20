'use client'

import { BsThreeDotsVertical } from "react-icons/bs"
import './Message.css'
import { useEffect, useState } from "react"
import { HiOutlineFaceSmile } from "react-icons/hi2"
import EmojiPicker from "emoji-picker-react"
import { FiSend } from "react-icons/fi"
import { ImAttachment } from "react-icons/im"

type PropsType = {
    data: any
}

export default function MessageBoxForAll({ data }: PropsType) {

    const [demoMessageCollection, setDemoMessageCollection] = useState<any[]>([]); // here it is for the demo message collection fot the message box
    const [messageCollection, setMessageCollection] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null); // Store the selected file as photo url. for now i did it with objectURL only for photo because it is not connected with any cloud
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    const toggleEmojiPicker = () => setShowEmojiPicker(prev => !prev);

    const handleEmojiClick = (emojiObject: any) => {
        setMessageCollection(prev => prev + emojiObject.emoji);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageCollection(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = {
            message: messageCollection,
            file: selectedFile
        };

        setDemoMessageCollection(prev => [...prev, message]);
        // Clear inputs after submission
        setMessageCollection("");
        setSelectedFile(null);
    };

    const handleImageClick = (imgUrl: string) => {
        setModalImage(imgUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);


    // emoji box responsive
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        // Function to update the screen width
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Initial call to set screen width on component mount
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
      <div className="w-full h-full relative">
          {/* Header */}
          <div className="w-full flex justify-between bg-[#EDEDED] p-3 rounded-md">
              <div className="flex items-center">
                  <img
                      className="w-10 h-10 object-cover object-top rounded-full border shadow"
                      src={data?.photoURL}
                      alt=""
                  />
                  <div className="px-2">
                      <p className="text-[17px] text-[#989BA1] font-semibold tracking-wide capitalize">
                          {data?.projectTitle}
                      </p>
                      <p className="text-[13px] text-[#989BA1] font-semibold tracking-wide">
                          {data?.displayName}
                      </p>
                  </div>
              </div>
              <button>
                  <BsThreeDotsVertical className="size-[20px] text-[#989BA1]" />
              </button>
          </div>

          {/* Chat box with messages */}
          <div className="w-full h-[540px] justify-between bg-[#EDEDED] p-3 mt-3 rounded-md relative">
              <div className="w-full h-full overflow-x-hidden overflow-y-scroll custom-scroll-of-message pb-12">
                  <div className="flex items-center gap-2 w-full justify-center">
                      <div className="w-[45%] h-[1px] bg-[#989BA1]"></div>
                      <p className="text-[13px] text-[#989BA1]">August 09</p>
                      <div className="w-[45%] h-[1px] bg-[#989BA1]"></div>
                  </div>

                  <div className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:flex-row md:w-[350px] flex items-start gap-5 py-2 max-md:mx-auto">
                      <img
                          className="w-10 h-10 rounded-full border shadow object-cover object-top flex-shrink-0"
                          src={data?.photoURL}
                          alt="work alat"
                      />
                      <div>
                          <div className="flex-grow flex flex-col bg-white ring-[2px] shadow ring-[#1D75DD]/50 rounded-md p-2 h-full overflow-hidden">
                              <p className="text-[15px] px-5">{data?.message}</p>
                          </div>
                          <p className="text-[#989BA1] text-[12px] pt-1">12:25 pm</p>
                      </div>
                  </div>


                  {/* Display Demo Messages */}
                  {demoMessageCollection.map((messageData: any, i: number) => (
                      <div key={i} className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:w-[350px] flex md:flex-row-reverse items-start ms-auto gap-5 py-2 max-md:mx-auto">
                          <img
                              className="w-10 h-10 rounded-full border shadow object-cover object-top flex-shrink-0"
                              src="https://st2.depositphotos.com/1010683/6767/i/450/depositphotos_67675279-stock-photo-asian-female-customer-services-operator.jpg"
                              alt="work alat"
                          />
                          <div>
                              {messageData?.message && (
                                  <div className="flex-grow flex flex-col bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden">
                                      <p className="text-[15px] px-5">{messageData?.message}</p>
                                  </div>
                              )}
                              {messageData?.file && (
                                  <div
                                      className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                                      onClick={() => handleImageClick(messageData.file)}
                                  >
                                      <img className="w-full h-auto" src={messageData.file} alt="work alat" />
                                  </div>
                              )}
                              <p className="text-[#989BA1] text-[12px] pt-1 text-end">12:25 pm</p>
                          </div>
                      </div>
                  ))}
              </div>

              <div>
                  {/* Input Section (Inside Chat Box) */}
                  <div className="absolute bottom-2 left-0 right-0 px-3">
                      <form onSubmit={handleSubmit}>
                          <div className="bg-white w-full flex max-sm:justify-between items-center p-1 rounded-md shadow-md border border-gray-300 box-border overflow-hidden">
                              <input
                                  value={messageCollection}
                                  onChange={handleMessageChange}
                                  type="text"
                                  name="messageTxt"
                                  className="sm:w-auto w-[160px] py-1 px-3 sm:flex-grow rounded-none border-none outline-none bg-transparent"
                                  placeholder="Write message here"
                              />

                              <div className="flex items-center">
                                  {/* File Attachment Preview */}
                                  {selectedFile && (
                                      <div className="w-[50px] h-[50px] overflow-hidden mx-1">
                                          <img src={selectedFile} className="w-full h-full object-cover" alt="Preview" />
                                      </div>
                                  )}

                                  {/* File attachment */}
                                  <label htmlFor="photo" className="mx-1 cursor-pointer">
                                      <ImAttachment className="text-gray-500 w-4 h-4" />
                                      <input
                                          id="photo"
                                          className="hidden"
                                          type="file"
                                          onChange={handleFileChange}
                                      />
                                  </label>

                                  {/* Emoji Picker */}
                                  <div>
                                      <div onClick={toggleEmojiPicker} className="p-1 me-1 cursor-pointer">
                                          <HiOutlineFaceSmile className="size-[20px] text-black/50" />
                                      </div>
                                      {showEmojiPicker && (
                                          <div className="absolute bottom-12 right-1 z-50">
                                              <EmojiPicker width={
                                                  (screenWidth && screenWidth < 450) ? "250px" : "360px"
                                              } onEmojiClick={handleEmojiClick} />
                                          </div>
                                      )}
                                  </div>

                                  {/* Submit Button */}
                                  <button
                                      type="submit"
                                      className="bg-[#07242B] p-2 rounded flex items-center justify-center text-white hover:bg-[#0A2F36] transition-all"
                                  >
                                      <FiSend className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>




                  {/* Fullscreen Image Modal */}
                  {isModalOpen && modalImage && (
                      <div
                          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                          onClick={closeModal}
                      >
                          <img src={modalImage} className="max-w-full max-h-full" alt="Full-size preview" />
                      </div>
                  )}
              </div>
          </div>
      </div>
  )
}
