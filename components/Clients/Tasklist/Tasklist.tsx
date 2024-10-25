"use client"
import { projectsData } from "@/utils/projectClientsData";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { useEffect, useState } from "react";
import TaskListModal from "./TaskListModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from "js-cookie";
import VerifyUser from "@/app/middleware/VerifyUser";

export default function Tasklist({ params }: any) {
  const dynamicData = projectsData?.find(
    (data) => data?.projectId == params?.id
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAllTasks, setShowAllTasks] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let [data, setData]  : any  = useState({});
  const [loading2, setLoading2]  : any  = useState(true);
  let router  : any  = useRouter();
  let { singleProjectDetails, addProjectTasks }  : any  = useUserContext();
  const { generateSnackbar }  : any  = useSnackbar();
  const [currentPath, setCurrentPath]  : any  = useState("");
  let [userData, setUserData]  : any  = useState({});
  let [lists, setLists]  : any  = useState([]);
  let [tasks, setTasks]   = useState({
    name: "",
    des: "",
  });

  const formatDate = (dateInMs:   any ) => {
    return new Date(parseInt(dateInMs)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    getUser();
  }, []);

  async function getUser() {
    try {
      let projectId  : any  = params.id;
      setLoading2(true);
      let token   : any  = Cookies.get("token");
      let ver  : any = await VerifyUser(token, "client");
      if (ver?.status === "success" && ver?.userType === "client") {
        setUserData(ver);
        let res  : any  = await singleProjectDetails({
          userId   : ver.userId, userType: ver.userType,
          projectId: projectId,
          need: "tasklist",
        });
        if (res?.status !== 400 || res?.data?.status == "success") {
          setData(res?.data?.data);
          setLists(res?.data?.data?.taskLists);
          setLoading2(false);
        } else {
          generateSnackbar("Some error occurred, Please Try Again.", "error");
          router.push("/client/my-projects/");
        }
      } else {
        router.push("/login");
      }
    } catch (e) {
      generateSnackbar("Some error occurred, Please Try Again.", "error");
    }
  }

  const handleTaskUpload = async (e  : any ) => {
    e.preventDefault();
    if (!tasks?.name || !tasks?.des) {
      return generateSnackbar("Please Fill in all the Fields", "error");
    }

    try {
      let res  : any  = await addProjectTasks({
        userType: userData.userType,
        userId: userData.userId,
        projectId: params.id,
        taskListName: tasks.name,
        taskListDes: tasks.des,
      });
      
      if (res?.status !== 400 || res?.data?.status == "success") {
        // Update the lists array with the new task
        const newTask = {
          date: Date.now().toString(),
          name: userData.name || "User",
          taskListName: tasks.name,
          taskListDes: tasks.des
        };
        setLists([newTask, ...lists]);
        setTasks({ name: "", des: "" });
        closeModal();
        setData(res?.data?.data);
        generateSnackbar("Task created successfully!", "success");
      } else {
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    } catch (error) {
      generateSnackbar("Some Error Occur, please Try Again.", "error");
    }
  };

  const displayedTasks = showAllTasks ? lists : lists.slice(0, 5);

  return (
    <>
      {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
          <div className="bg-white relative">
            <img
              className="absolute z-0 left-0 top-[40px] w-[600px]"
              src="/CIRCLES.png"
              alt="workalat"
            />
            <img
              className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]"
              src="/CIRCLES.png"
              alt="workalat"
            />

            <ProjectsHeader isActive={"tasklist"} data={data} />
            <div className="relative z-10 container mx-auto max-w-7xl px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recent Tasks Section */}
                <div className="md:col-span-2">
                  {lists.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold mb-4">Recent Tasks</h3>
                      {displayedTasks.map((task, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold text-main">
                              {task.taskListName}
                            </h4>
                            <span className="text-sm text-gray-500 capitalize">
                              {formatDate(task.date)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{task.taskListDes}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="capitalize">Created by: {task.name}</span>
                          </div>
                        </div>
                      ))}
                      {lists.length > 5 && (
                        <button
                          onClick={() => setShowAllTasks(!showAllTasks)}
                          className="w-full py-2 text-main font-semibold hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {showAllTasks ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-lg">No tasks created yet</p>
                    </div>
                  )}
                </div>

                {/* Create Task Section */}
                <div className="md:col-span-1 pt-[10%]">
                  <div className="text-center">
                    <img
                      src="/icons/tasksList.svg"
                      className="size-12 mx-auto"
                      alt="whatworks"
                    />
                    <h4 className="font-semibold text-xl py-2">
                      Get more done, faster
                    </h4>
                    <p className="text-lg py-1">
                      Organize your work, set deadlines, prioritize and assign
                      tasks.
                    </p>

                    {
                        (data?.projectStatusAdmin === true ) && (
                          <>
                          <button
                            onClick={openModal}
                            className="bg-white text-md font-semibold py-2 px-5 mt-4 border-2 shadow border-black/40 rounded-md"
                          >
                            Add Task-list
                          </button>
                          </>
                        )
                      }
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <TaskListModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                content={
                  <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                    <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                      <button className="ms-auto block" onClick={closeModal}>
                        <IoCloseCircleOutline className="size-[20px]" />
                      </button>
                      
                          <div className="w-full text-start">
                            <h4 className="font-semibold text-[20px] capitalize">
                              Create New Task List
                            </h4>
                          </div>
                      <div className="w-full border-t border-black mt-3 py-2 px-3">
                        <form onSubmit={handleTaskUpload}>
                          <div className="py-2">
                            <label
                              className="block pb-1 font-semibold"
                              htmlFor="name"
                            >
                              Name{" "}
                              <span className="font-normal">(required)</span>
                            </label>
                            <textarea
                              required
                              id="name"
                              name="name"
                              value={tasks.name}
                              onChange={(e) => {
                                setTasks({
                                  ...tasks,
                                  name: e.target.value,
                                });
                              }}
                              className="h-[70px] rounded-md shadow-lg ring-1 ring-black/30 outline-none border-none w-full appearance-none py-1 px-2"
                            />
                          </div>
                          <div className="py-2">
                            <label
                              className="block pb-1 font-semibold"
                              htmlFor="desc"
                            >
                              Description
                            </label>
                            <textarea
                              id="des"
                              name="des"
                              value={tasks.des}
                              onChange={(e) => {
                                setTasks({ ...tasks, des: e.target.value });
                              }}
                              className="h-[130px] rounded-md shadow-lg ring-1 ring-black/30 outline-none border-none w-full appearance-none py-1 px-2"
                            />
                          </div>

                          <div className="flex gap-3 pt-3">
                            <button
                              type="button"
                              className="px-5 py-2 text-white font-semibold bg-main flex gap-2 items-center justify-center rounded-md"
                              onClick={closeModal}
                            >
                              Cancel <IoMdClose className="size-5 text-white" />
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 text-black font-semibold bg-secondary flex gap-2 items-center justify-center rounded-md"
                            >
                              Create
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
}