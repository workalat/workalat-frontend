// "use client"

// import { projectsData } from '@/utils/projectClientsData';
// import React, { useEffect, useState } from 'react'
// import ProjectsHeader from '../ProjectsHeader/ProjectsHeader';
// import { PiFilesLight, PiUploadFill } from 'react-icons/pi';
// import { IoDocumentText } from 'react-icons/io5';
// import { BsImages } from 'react-icons/bs';
// import { BiSolidVideos } from 'react-icons/bi';

// import { useUserContext } from "@/context/user_context";
// import { useParams, useRouter } from "next/navigation";
// import { useSnackbar } from "@/context/snackbar_context";
// import Cookies from 'js-cookie';
// import VerifyUser from "@/app/middleware/VerifyUser"
// import axios from 'axios';

// export default function ProjectFiles({ params }: any) {
//     const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
//     const [filterFiles, setFilterFiles] = useState<string>("all");

//     const [loading2, setLoading2] = useState(true);
//     let router = useRouter();
//     let { singleProjectDetails} = useUserContext();
//     const { generateSnackbar } = useSnackbar();
//     let [data, setData] = useState({ projectFileURL: [] });
//     let [userData, setUserData]= useState({});
//     let [files, setFiles] = useState([]);




//     useEffect(() => {
//         async function getUser() {
//             try {
//                 let projectId = params.id;
//                 console.log(projectId);
//                 console.log(window.location.pathname);
//                 setLoading2(true);
//                 let token = Cookies.get("token");
//                 let ver = await VerifyUser(token, "client");
//                 if (ver.status === "success" && ver.userType === "client") {
//                     setUserData(ver);
//                     let res = await singleProjectDetails({ clientId: ver.userId, projectId: projectId, need: "files" });
//                     console.log(res);
//                     if (res.status !== 400 || res.data?.status == "success") {
//                         setData(res?.data?.data);
//                         setLoading2(false);
//                     } else {
//                         generateSnackbar("Some error occurred, Please Try Again.", "error");
//                         router.push("/client/my-projects/");
//                     }
//                 } else {
//                     router.push("/login");
//                 }
//             } catch (e) {
//                 generateSnackbar("Some error occurred, Please Try Again.", "error");
//             }
//         };
//         getUser();
//     }, [window.location.pathname]);


    
//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//     // console.log(files);
//     handleFilesUpload(e);
//   };


  
//   const handleFilesUpload = async (event) => {
//     try {
//       if(!files || files.length<1 ){
//              return generateSnackbar("Please Fill all Data.", "error");
//       }
//       else{
//         event.preventDefault();
//       // console.log(userData);
//       // console.log(files);
  
//       const formData = new FormData();
//       formData.append('userId', userData.userId);
//       formData.append('userType', userData.userType);
//       formData.append('projectId', params.id);
      
//       // Append all selected files to the form data under the kycDocuments key
//       files.forEach((file) => {
//           formData.append('projectFiles', file);
//       });
      
//       // Send the form data to the server to upload the files
//     //   setLoading(true);
//         const res = await axios.post('/uploadProjectFile', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         console.log(res);
//         if(res.status === 200 || res.response.data?.status === "success"){
//           // generateSnackbar(res.data?.msg , "success");
//           generateSnackbar("Files uploaded Successfully." ,"success");
//         //   setLoading(false);
//         //   closeModal();
//       }
//       else{
//         //   setLoading(false);
//           generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
//       }  
//         // Handle success (e.g., show a success message)
//       }
//     } catch (error) {
//         generateSnackbar("Some Error Occur, Please try Again." ,"error")
//     }
// };

  
  

//     // Filter files based on selection
//     const filteredFiles = data?.projectFileURL?.filter((file) => {
//         if (filterFiles === "all") {
//             return true;
//         } else if (filterFiles === "doc") {
//             return file.fileType.includes("pdf") || file.fileType.includes("doc") || file.fileType.includes("msword");
//         } else if (filterFiles === "img") {
//             return file.fileType.includes("image");
//         } else if (filterFiles === "video") {
//             return file.fileType.includes("video");
//         }
//         return false;
//     });

//     return (
//         <>
//             {
//                 loading2 ? (
//                     <div className="w-[100%] h-screen flex justify-center items-center">
//                         <div className="loader m-auto" />
//                     </div>
//                 ) : (
//                     <>
//                         <div>
//                             <div className="bg-white relative">
//                                 {/* Left Image */}
//                                 <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
//                                 {/* Right Image */}
//                                 <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

//                                 {/* Content */}
//                                 {/* header for dynamic pages */}
//                                 <ProjectsHeader isActive={"files"} data={data} />
//                                 <div className="relative z-10 container mx-auto max-w-7xl px-6">
//                                     <div className="h-full">
//                                         <div className="flex h-full items-stretch">
//                                             <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
//                                                 <h4 className='font-bold text-lg text-[#E88B00] pt-2 pb-3'>Filter</h4>
//                                                 <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
//                                                     <ul className="flex flex-col gap-2">
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('all')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "all" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <PiFilesLight size={20} /> All Files ({data?.projectFileURL?.length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('doc')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "doc" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <IoDocumentText size={20} /> Documents ({filteredFiles.filter(file => file.fileType.includes('pdf') || file.fileType.includes('doc')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('img')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "img" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BsImages size={20} /> Images ({filteredFiles.filter(file => file.fileType.includes('image')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('video')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "video" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BiSolidVideos size={20} /> Videos ({filteredFiles.filter(file => file.fileType.includes('video')).length})
//                                                             </button>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>

//                                             <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full">
//                                                 <div className="flex py-2 justify-end">
//                                                     <label className='bg-main text-white text-sm px-3 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer'>
//                                                         <PiUploadFill size={17} /> Upload Files
//                                                         <input type="file" value={files} name='projectFiles' id='projectFiles' onChange={handleFileChange} multiple className='hidden' />
//                                                     </label>
//                                                 </div>

//                                                 <div className="p-3 border mb-5 h-[350px] border-dashed rounded-lg border-black/40">
//                                                     <div className="w-full h-full">
//                                                         <div className="overflow-x-auto">
//                                                             <table className='min-w-full'>
//                                                                 <thead className='text-[#E88B00] font-semibold'>
//                                                                     <tr>
//                                                                         <th className='px-4 text-start'>Name</th>
//                                                                         <th className='px-4 text-start'>Size</th>
//                                                                         <th className='px-4 text-start'>Uploaded by</th>
//                                                                         <th className='px-4 text-start'>Date</th>
//                                                                         <th className='px-4 text-start'></th>
//                                                                     </tr>
//                                                                 </thead>
//                                                                 <tbody>
//                                                                     {
//                                                                         filteredFiles.map((file, i) => (
//                                                                             <tr key={i}>
//                                                                                 <td className='flex items-center gap-2 px-4 py-2'>
//                                                                                     <PiFilesLight size={20} />
//                                                                                     {file.fileName}
//                                                                                 </td>
//                                                                                 <td className='px-4 py-2'>{(file.fileSize / 1024).toFixed(2)} KB</td>
//                                                                                 <td className='px-4 font-bold py-2 capitalize'>{file.uploadedBy}</td>
//                                                                                 <td className='px-4 py-2'>{new Date(file.date).toLocaleDateString()}</td>
//                                                                                 <td className='px-4 py-2'>
//                                                                                     <a href={file?.url} target="_blank" rel="noopener noreferrer" download={file?.fileName}>
//                                                                                         <button className='px-4 py-1 text-black border border-black rounded-md bg-white'>Download</button>
//                                                                                     </a>
//                                                                                 </td>
//                                                                             </tr>
//                                                                         ))
//                                                                     }
//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )
//             }
//         </>
//     )
// }




// "use client"

// import { projectsData } from '@/utils/projectClientsData';
// import React, { useEffect, useState } from 'react'
// import ProjectsHeader from '../ProjectsHeader/ProjectsHeader';
// import { PiFilesLight, PiUploadFill } from 'react-icons/pi';
// import { IoDocumentText } from 'react-icons/io5';
// import { BsImages } from 'react-icons/bs';
// import { BiSolidVideos } from 'react-icons/bi';

// import { useUserContext } from "@/context/user_context";
// import { useParams, useRouter } from "next/navigation";
// import { useSnackbar } from "@/context/snackbar_context";
// import Cookies from 'js-cookie';
// import VerifyUser from "@/app/middleware/VerifyUser"
// import axios from 'axios';
// import { Box, Modal } from '@mui/material';

// const FilePill = ({ file, onRemove }) => (
//   <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
//     {file.name}
//     <button onClick={() => onRemove(file)} className="ml-2 text-green-600 hover:text-green-800">
//       &times;
//     </button>
//   </div>
// );

// export default function ProjectFiles({ params }: any) {
//     const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
//     const [filterFiles, setFilterFiles] = useState<string>("all");

//     const [loading2, setLoading2] = useState(true);
//     let router = useRouter();
//     let { singleProjectDetails } = useUserContext();
//     const { generateSnackbar } = useSnackbar();
//     let [existingFiles, setExistingFiles] = useState([]);
//     let [newFiles, setNewFiles] = useState([]);
//     let [selectedFiles, setSelectedFiles] = useState([]);
//     let [userData, setUserData] = useState({});
//     const [showUploadPopup, setShowUploadPopup] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);

//     useEffect(() => {
//         async function getUser() {
//             try {
//                 let projectId = params.id;
//                 console.log(projectId);
//                 console.log(window.location.pathname);
//                 setLoading2(true);
//                 let token = Cookies.get("token");
//                 let ver = await VerifyUser(token, "client");
//                 if (ver.status === "success" && ver.userType === "client") {
//                     setUserData(ver);
//                     let res = await singleProjectDetails({ clientId: ver.userId, projectId: projectId, need: "files" });
//                     console.log(res);
//                     if (res.status !== 400 || res.data?.status == "success") {
//                         setExistingFiles(res?.data?.data.projectFileURL);
//                         setLoading2(false);
//                     } else {
//                         generateSnackbar("Some error occurred, Please Try Again.", "error");
//                         router.push("/client/my-projects/");
//                     }
//                 } else {
//                     router.push("/login");
//                 }
//             } catch (e) {
//                 generateSnackbar("Some error occurred, Please Try Again.", "error");
//             }
//         };
//         getUser();
//     }, [window.location.pathname]);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024); // 100MB limit
//         setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
//     };

//     const handleFilesUpload = async () => {
//         if (selectedFiles.length === 0) {
//             return generateSnackbar("Please select files to upload.", "error");
//         }

//         try {
//             const formData = new FormData();
//             formData.append('userId', userData.userId);
//             formData.append('userType', userData.userType);
//             formData.append('projectId', params.id);
            
//             selectedFiles.forEach((file) => {
//                 formData.append('projectFiles', file);
//             });

//             setShowUploadPopup(true);

//             const res = await axios.post('/uploadProjectFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percentCompleted);
//                 }
//             });

//             if (res.status === 200 || res.data?.status === "success") {
//                 generateSnackbar("Files uploaded Successfully.", "success");
//                 // setNewFiles(prevFiles => [...prevFiles, ...res.data.uploadedFiles]);
//                 router.refresh();
//                 // setSelectedFiles([]);
//             } else {
//                 generateSnackbar(res.data?.message || "Some Error Occurred, Please try Again.", "error");
//             }
//         } catch (error) {
//             generateSnackbar("Some Error Occurred, Please try Again.", "error");
//         } finally {
//             setShowUploadPopup(false);
//             setUploadProgress(0);
//         }
//     };

//     const allFiles = [...existingFiles, ...newFiles];
//     const filteredFiles = allFiles.filter((file) => {
//         if (filterFiles === "all") {
//             return true;
//         } else if (filterFiles === "doc") {
//             return file.fileType.includes("pdf") || file.fileType.includes("doc") || file.fileType.includes("msword");
//         } else if (filterFiles === "img") {
//             return file.fileType.includes("image");
//         } else if (filterFiles === "video") {
//             return file.fileType.includes("video");
//         }
//         return false;
//     });

//     return (
//         <>
//             {
//                 loading2 ? (
//                     <div className="w-[100%] h-screen flex justify-center items-center">
//                         <div className="loader m-auto" />
//                     </div>
//                 ) : (
//                     <>
//                         <div>
//                             <div className="bg-white relative">
//                                 <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
//                                 <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

//                                 <ProjectsHeader isActive={"files"} data={{ projectFileURL: allFiles }} />
//                                 <div className="relative z-10 container mx-auto max-w-7xl px-6">
//                                     <div className="h-full">
//                                         <div className="flex h-full items-stretch">
//                                             <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
//                                                 <h4 className='font-bold text-lg text-[#E88B00] pt-2 pb-3'>Filter</h4>
//                                                 <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
//                                                     <ul className="flex flex-col gap-2">
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('all')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "all" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <PiFilesLight size={20} /> All Files ({allFiles.length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('doc')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "doc" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <IoDocumentText size={20} /> Documents ({allFiles.filter(file => file.fileType.includes('pdf') || file.fileType.includes('doc')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('img')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "img" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BsImages size={20} /> Images ({allFiles.filter(file => file.fileType.includes('image')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('video')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "video" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BiSolidVideos size={20} /> Videos ({allFiles.filter(file => file.fileType.includes('video')).length})
//                                                             </button>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>

//                                             <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full">
//                                                 <div className="flex flex-wrap mb-4">
//                                                     {selectedFiles.map((file, index) => (
//                                                         <FilePill 
//                                                             key={index} 
//                                                             file={file} 
//                                                             onRemove={(fileToRemove) => setSelectedFiles(files => files.filter(f => f !== fileToRemove))} 
//                                                         />
//                                                     ))}
//                                                 </div>
//                                                 <div className="flex py-2 justify-end">
//                                                     <label className='bg-main text-white text-sm px-3 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer'>
//                                                         <PiUploadFill size={17} /> Select Files
//                                                         <input type="file" onChange={handleFileChange} multiple className='hidden' />
//                                                     </label>
//                                                     {selectedFiles.length > 0 && (
//                                                         <button 
//                                                             onClick={handleFilesUpload} 
//                                                             className='ml-2 bg-green-500 text-white text-sm px-3 py-2 rounded-md'
//                                                         >
//                                                             Upload Files
//                                                         </button>
//                                                     )}
//                                                 </div>

//                                                 <div className="p-3 border mb-5 h-[350px] border-dashed rounded-lg border-black/40">
//                                                     <div className="w-full h-full">
//                                                         <div className="overflow-x-auto">
//                                                             <table className='min-w-full'>
//                                                                 <thead className='text-[#E88B00] font-semibold'>
//                                                                     <tr>
//                                                                         <th className='px-4 text-start'>Name</th>
//                                                                         <th className='px-4 text-start'>Size</th>
//                                                                         <th className='px-4 text-start'>Uploaded by</th>
//                                                                         <th className='px-4 text-start'>Date</th>
//                                                                         <th className='px-4 text-start'></th>
//                                                                     </tr>
//                                                                 </thead>
//                                                                 <tbody>
//                                                                     {
//                                                                         filteredFiles.map((file, i) => (
//                                                                             <tr key={i}>
//                                                                                 <td className='flex items-center gap-2 px-4 py-2'>
//                                                                                     <PiFilesLight size={20} />
//                                                                                     {file.fileName}
//                                                                                 </td>
//                                                                                 <td className='px-4 py-2'>{(file.fileSize / 1024).toFixed(2)} KB</td>
//                                                                                 <td className='px-4 font-bold py-2 capitalize'>{file.uploadedBy}</td>
//                                                                                 <td className='px-4 py-2'>{new Date(file.date).toLocaleDateString()}</td>
//                                                                                 <td className='px-4 py-2'>
//                                                                                     <a href={file?.url} target="_blank" rel="noopener noreferrer" download={file?.fileName}>
//                                                                                         <button className='px-4 py-1 text-black border border-black rounded-md bg-white'>Download</button>
//                                                                                     </a>
//                                                                                 </td>
//                                                                             </tr>
//                                                                         ))
//                                                                     }
//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <Modal open={showUploadPopup}>
//                         <Box className="w-full h-full flex justify-center items-center">
//                         <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
//                             <img src="/images/loader.gif" alt="Loading..." className="w-60" />
//                             <h1 className="text-center font-bold text-xl ml-2">Uploading Files...</h1>
//                         </Box>
//                         </Box>
//                     </Modal>
            
//                     </>
//                 )
//             }
//         </>
//     )
// }




// "use client"

// import { projectsData } from '@/utils/projectClientsData';
// import React, { useEffect, useState } from 'react'
// import ProjectsHeader from '../ProjectsHeader/ProjectsHeader';
// import { PiFilesLight, PiUploadFill } from 'react-icons/pi';
// import { IoDocumentText } from 'react-icons/io5';
// import { BsImages } from 'react-icons/bs';
// import { BiSolidVideos } from 'react-icons/bi';

// import { useUserContext } from "@/context/user_context";
// import { useParams, useRouter } from "next/navigation";
// import { useSnackbar } from "@/context/snackbar_context";
// import Cookies from 'js-cookie';
// import VerifyUser from "@/app/middleware/VerifyUser"
// import axios from 'axios';
// import { Box, Modal } from '@mui/material';

// const FilePill = ({ file, onRemove }) => (
//   <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
//     {file.name}
//     <button onClick={() => onRemove(file)} className="ml-2 text-green-600 hover:text-green-800">
//       &times;
//     </button>
//   </div>
// );

// export default function ProjectFiles({ params }: any) {
//     const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
//     const [filterFiles, setFilterFiles] = useState<string>("all");

//     const [loading2, setLoading2] = useState(true);
//     let router = useRouter();
//     let { singleProjectDetails } = useUserContext();
//     const { generateSnackbar } = useSnackbar();
//     let [existingFiles, setExistingFiles] = useState([]);
//     let [newFiles, setNewFiles] = useState([]);
//     let [selectedFiles, setSelectedFiles] = useState([]);
//     let [userData, setUserData] = useState({});
//     const [showUploadPopup, setShowUploadPopup] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);

//     useEffect(() => {
//         async function getUser() {
//             try {
//                 let projectId = params.id;
//                 console.log(projectId);
//                 console.log(window.location.pathname);
//                 setLoading2(true);
//                 let token = Cookies.get("token");
//                 let ver = await VerifyUser(token, "client");
//                 if (ver.status === "success" && ver.userType === "client") {
//                     setUserData(ver);
//                     let res = await singleProjectDetails({ clientId: ver.userId, projectId: projectId, need: "files" });
//                     console.log(res);
//                     if (res.status !== 400 || res.data?.status == "success") {
//                         setExistingFiles(res?.data?.data.projectFileURL);
//                         setLoading2(false);
//                     } else {
//                         generateSnackbar("Some error occurred, Please Try Again.", "error");
//                         router.push("/client/my-projects/");
//                     }
//                 } else {
//                     router.push("/login");
//                 }
//             } catch (e) {
//                 generateSnackbar("Some error occurred, Please Try Again.", "error");
//             }
//         };
//         getUser();
//     }, [window.location.pathname]);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024); // 100MB limit
//         setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
//     };

//     const handleFilesUpload = async () => {
//         if (selectedFiles.length === 0) {
//             return generateSnackbar("Please select files to upload.", "error");
//         }

//         try {
//             const formData = new FormData();
//             formData.append('userId', userData.userId);
//             formData.append('userType', userData.userType);
//             formData.append('projectId', params.id);
            
//             selectedFiles.forEach((file) => {
//                 formData.append('projectFiles', file);
//             });

//             setShowUploadPopup(true);

//             const res = await axios.post('/uploadProjectFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percentCompleted);
//                 }
//             });

//             if (res.status === 200 || res.data?.status === "success") {
//                 generateSnackbar("Files uploaded Successfully.", "success");
//                 // setNewFiles(prevFiles => [...prevFiles, ...res.data.uploadedFiles]);
//                 router.refresh();
//                 // setSelectedFiles([]); 
//             } else {
//                 generateSnackbar(res.data?.message || "Some Error Occurred, Please try Again.", "error");
//             }
//         } catch (error) {
//             generateSnackbar("Some Error Occurred, Please try Again.", "error");
//         } finally {
//             setShowUploadPopup(false);
//             setUploadProgress(0);
//         }
//     };

//     const allFiles = [...existingFiles, ...newFiles];
//     const filteredFiles = allFiles.filter((file) => {
//         if (filterFiles === "all") {
//             return true;
//         } else if (filterFiles === "doc") {
//             return file.fileType.includes("pdf") || file.fileType.includes("doc") || file.fileType.includes("msword");
//         } else if (filterFiles === "img") {
//             return file.fileType.includes("image");
//         } else if (filterFiles === "video") {
//             return file.fileType.includes("video");
//         }
//         return false;
//     });

//     return (
//         <>
//             {
//                 loading2 ? (
//                     <div className="w-[100%] h-screen flex justify-center items-center">
//                         <div className="loader m-auto" />
//                     </div>
//                 ) : (
//                     <>
//                         <div className="min-h-screen pb-20"> {/* Added padding to prevent overlap */}
//                             <div className="bg-white relative">
//                                 <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
//                                 <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

//                                 <ProjectsHeader isActive={"files"} data={{ projectFileURL: allFiles }} />
//                                 <div className="relative z-10 container mx-auto max-w-7xl px-6">
//                                     <div className="h-full">
//                                         <div className="flex h-full items-stretch">
//                                             <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
//                                                 <h4 className='font-bold text-lg text-[#E88B00] pt-2 pb-3'>Filter</h4>
//                                                 <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
//                                                     <ul className="flex flex-col gap-2">
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('all')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "all" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <PiFilesLight size={20} /> All Files ({allFiles.length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('doc')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "doc" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <IoDocumentText size={20} /> Documents ({allFiles.filter(file => file.fileType.includes('pdf') || file.fileType.includes('doc')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('img')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "img" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BsImages size={20} /> Images ({allFiles.filter(file => file.fileType.includes('image')).length})
//                                                             </button>
//                                                         </li>
//                                                         <li>
//                                                             <button
//                                                                 onClick={() => setFilterFiles('video')}
//                                                                 className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "video" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
//                                                             >
//                                                                 <BiSolidVideos size={20} /> Videos ({allFiles.filter(file => file.fileType.includes('video')).length})
//                                                             </button>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>

//                                             <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full">
//                                                 <div className="flex flex-wrap mb-4">
//                                                     {selectedFiles.map((file) => (
//                                                         <FilePill key={file.name} file={file} onRemove={(removedFile) => setSelectedFiles(selectedFiles.filter((f) => f !== removedFile))} />
//                                                     ))}
//                                                 </div>
//                                                 <div className="mb-3 flex items-center justify-between">
//                                                     <label className="w-full flex items-center justify-center h-16 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
//                                                         <span className="text-gray-600">Choose files...</span>
//                                                         <input type="file" multiple className="hidden" onChange={handleFileChange} />
//                                                     </label>
//                                                     <button onClick={handleFilesUpload} className="ml-3 bg-[#E88B00] text-white py-2 px-4 rounded">Upload</button>
//                                                 </div>

//                                                 <div className="border border-black/20 rounded-md p-4">
//                                                     <h4 className="font-bold text-lg text-[#E88B00]">Existing Files</h4>
//                                                     <div className="mt-3">
//                                                         {filteredFiles.length === 0 ? (
//                                                             <p>No files found.</p>
//                                                         ) : (
//                                                             filteredFiles.map((file) => (
//                                                                 <div key={file.fileId} className="flex justify-between items-center py-2 border-b border-gray-200">
//                                                                     <span>{file.fileName}</span>
//                                                                     <button onClick={() => window.open(file.fileURL)} className="text-blue-600">Download</button>
//                                                                 </div>
//                                                             ))
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <Modal
//                             open={showUploadPopup}
//                             onClose={() => setShowUploadPopup(false)}
//                         >
//                             <Box className="bg-white p-6 rounded-md w-1/3 mx-auto mt-32">
//                                 <h2 className="text-lg font-bold mb-4">Uploading Files...</h2>
//                                 <div className="w-full bg-gray-200 rounded h-2">
//                                     <div className="bg-green-500 h-2" style={{ width: `${uploadProgress}%` }}></div>
//                                 </div>
//                                 <p className="mt-2">{uploadProgress}%</p>
//                             </Box>
//                         </Modal>
//                     </>
//                 )
//             }
//         </>
//     )
// }



"use client"

import { projectsData } from '@/utils/projectClientsData';
import React, { useEffect, useState } from 'react'
import ProjectsHeader from '../ProjectsHeader/ProjectsHeader';
import { PiFilesLight, PiUploadFill } from 'react-icons/pi';
import { IoDocumentText } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { BiSolidVideos } from 'react-icons/bi';

import { useUserContext } from "@/context/user_context";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import axios from 'axios';
import { Box, Modal } from '@mui/material';

const FilePill = ({ file, onRemove }) => (
  <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
    {file.name}
    <button onClick={() => onRemove(file)} className="ml-2 text-green-600 hover:text-green-800">
      &times;
    </button>
  </div>
);

export default function ProjectFiles({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
    const [filterFiles, setFilterFiles] = useState<string>("all");

    const [loading2, setLoading2] = useState(true);
    let router = useRouter();
    let { singleProjectDetails } = useUserContext();
    const { generateSnackbar } = useSnackbar();
    let [existingFiles, setExistingFiles] = useState([]);
    let [newFiles, setNewFiles] = useState([]);
    let [selectedFiles, setSelectedFiles] = useState([]);
    let [userData, setUserData] = useState({});
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        async function getUser() {
            try {
                let projectId = params.id;
                console.log(projectId);
                console.log(window.location.pathname);
                setLoading2(true);
                let token = Cookies.get("token");
                let ver = await VerifyUser(token, "client");
                if (ver.status === "success" && ver.userType === "client") {
                    setUserData(ver);
                    let res = await singleProjectDetails({ clientId: ver.userId, projectId: projectId, need: "files" });
                    console.log(res);
                    if (res.status !== 400 || res.data?.status == "success") {
                        setExistingFiles(res?.data?.data.projectFileURL);
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
        };
        getUser();
    }, [window.location.pathname]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024); // 100MB limit
        setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleFilesUpload = async () => {
        if (selectedFiles.length === 0) {
            return generateSnackbar("Please select files to upload.", "error");
        }

        try {
            const formData = new FormData();
            formData.append('userId', userData.userId);
            formData.append('userType', userData.userType);
            formData.append('projectId', params.id);
            
            selectedFiles.forEach((file) => {
                formData.append('projectFiles', file);
            });

            setShowUploadPopup(true);

            const res = await axios.post('/uploadProjectFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (res.status === 200 || res.data?.status === "success") {
                generateSnackbar("Files uploaded Successfully.", "success");
                router.refresh();
            } else {
                generateSnackbar(res.data?.message || "Some Error Occurred, Please try Again.", "error");
            }
        } catch (error) {
            generateSnackbar("Some Error Occurred, Please try Again.", "error");
        } finally {
            setShowUploadPopup(false);
            setUploadProgress(0);
        }
    };

    const allFiles = [...existingFiles, ...newFiles];
    const filteredFiles = allFiles.filter((file) => {
        if (filterFiles === "all") {
            return true;
        } else if (filterFiles === "doc") {
            return file.fileType.includes("pdf") || file.fileType.includes("doc") || file.fileType.includes("msword");
        } else if (filterFiles === "img") {
            return file.fileType.includes("image");
        } else if (filterFiles === "video") {
            return file.fileType.includes("video");
        }
        return false;
    });

    return (
        <>
            {
                loading2 ? (
                    <div className="w-full h-screen flex justify-center items-center">
                        <div className="loader m-auto" />
                    </div>
                ) : (
                    <>
                        <div className="min-h-screen pb-20"> {/* Added padding to prevent overlap */}
                            <div className="bg-white relative">
                                <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
                                <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

                                <ProjectsHeader isActive={"files"} data={{ projectFileURL: allFiles }} />
                                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                                    <div className="h-full">
                                        <div className="flex h-full items-stretch">
                                            <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
                                                <h4 className='font-bold text-lg text-[#E88B00] pt-2 pb-3'>Filter</h4>
                                                <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
                                                    <ul className="flex flex-col gap-2">
                                                        <li>
                                                            <button
                                                                onClick={() => setFilterFiles('all')}
                                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "all" ? "bg-[#E88B00] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                                            >
                                                                <PiFilesLight size={20} /> All Files ({allFiles.length})
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={() => setFilterFiles('doc')}
                                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "doc" ? "bg-[#E88B00] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                                            >
                                                                <IoDocumentText size={20} /> Documents ({allFiles.filter(file => file.fileType.includes('pdf') || file.fileType.includes('doc')).length})
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={() => setFilterFiles('img')}
                                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "img" ? "bg-[#E88B00] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                                            >
                                                                <BsImages size={20} /> Images ({allFiles.filter(file => file.fileType.includes('image')).length})
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={() => setFilterFiles('video')}
                                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "video" ? "bg-[#E88B00] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                                            >
                                                                <BiSolidVideos size={20} /> Videos ({allFiles.filter(file => file.fileType.includes('video')).length})
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full">
                                                <div className="flex flex-wrap mb-4">
                                                    {selectedFiles.map((file) => (
                                                        <FilePill key={file.name} file={file} onRemove={(removedFile) => setSelectedFiles(selectedFiles.filter((f) => f !== removedFile))} />
                                                    ))}
                                                </div>
                                                <div className="mb-3 flex items-center justify-between">
                                                    <label className="w-full flex items-center justify-center h-16 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                                                        <span className="text-gray-600">Choose files...</span>
                                                        <input type="file" multiple className="hidden" onChange={handleFileChange} />
                                                    </label>
                                                    <button onClick={handleFilesUpload} className="ml-3 bg-[#E88B00] text-white py-2 px-4 rounded">Upload</button>
                                                </div>

                                                <div className="border border-black/20 rounded-md p-4">
                                                    <h4 className="font-bold text-lg text-[#E88B00]">Existing Files</h4>
                                                    <div className="mt-3">
                                                        {filteredFiles.length === 0 ? (
                                                            <p>No files found.</p>
                                                        ) : (
                                                            <table className="w-full border-collapse">
                                                                <thead>
                                                                    <tr className="bg-gray-100">
                                                                        <th className="border border-gray-300 px-4 py-2">File Name</th>
                                                                        <th className="border border-gray-300 px-4 py-2">Uploaded By</th>
                                                                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                                                                        <th className="border border-gray-300 px-4 py-2">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {filteredFiles.map((file) => (
                                                                        <tr key={file.fileId} className="hover:bg-gray-50">
                                                                            <td className="border border-gray-300 px-4 py-2">{file.fileName}</td>
                                                                            <td className="border border-gray-300 px-4 py-2">{file.uploadedBy}</td>
                                                                            <td className="border border-gray-300 px-4 py-2">{new Date(file.timestamp).toLocaleString()}</td>
                                                                            <td className="border border-gray-300 px-4 py-2">
                                                                                <button onClick={() => window.open(file.fileURL)} className="text-blue-600">Download</button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal
                            open={showUploadPopup}
                            onClose={() => setShowUploadPopup(false)}
                        >
                            <Box className="bg-white p-6 rounded-md w-1/3 mx-auto mt-32">
                                <h2 className="text-lg font-bold mb-4">Uploading Files...</h2>
                                <div className="w-full bg-gray-200 rounded h-2">
                                    <div className="bg-green-500 h-2" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                                <p className="mt-2">{uploadProgress}%</p>
                            </Box>
                        </Modal>
                    </>
                )
            }
        </>
    )
}
