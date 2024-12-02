import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  role: "professional" | "client";
}

interface SignupProfessional {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  professionalService: string;
}

interface UserContextType {
  userId: String | null;
  setUserId : (userId : String) => void;
  uType : String | null;
  setUType : (userId : String) => void;
  userData : String | null;
  payPayment : String | null;
  setPayPayment : (payPayment : String) => void;
  setUserData : (userData : object) => void;
  user: User | null;
  setUser: (user: User) => void;
  projectData : Object | null;
  setProjectData : (projectData : any) => void;
  tempUserData :  String | null;
  setTempUserData :(userData : any) => void;
  verifyToken : (token :any ,userType : any, auth) => any;
  findAllServices : () => any;
  signupProfessional : SignupProfessional;
  setSignupProfessional : (signupProfessional : SignupProfessional) => void;
  professionalSignupFunction : (data : SignupProfessional) => any;
  verifyOtp : (data : any) => any;
  verifyOtpWoId : (data : any) => any;
  signinProfessional : (data : any) => any;
  sendPhoneOtp(data  : any) : any;
  sendEmailOtp : (data : any) => any;
  verifyPhoneOtp : (userId : any, userType : any, otp : any) => any; 
  verifyPhoneWoOtp : (verificationId : any, userType : any, otp : any)  => any;
  addProfessionalDetails :  (data : any) => any; 
  addLeadsToProfessioal : (data : any) => any; 
  continueWithGoogleProfessional : (data  : any, userType :   any) => any;
  forgotPassword : (data : any) => any;
  changeForgotPassword : (data : any) => any;
  logout : (data : any) => any;

  //PRofessional
  intoClient : (data : any) => any;
  professionalDetails : (data : any) => any;
  professionalDetailsP1 : (data : any) => any;
  addProfessionalDetailsP1 : (data : any) => any;
  professionalDetailsP2 : (data : any) => any;
  addProfessionalDetailsP2  : (data : any) => any;
  changeEmail : (data : any) => any;
  purchaseMembership : (data : any) => any;
  confirmMembership : (data : any) => any;
  getMembershipData : (data : any) => any;
  requestCancelMembershipData : (data : any) => any;
  walletTransactionData : (data : any) => any;
  pasAsGo : (data : any) => any;
  buyPoints : (data : any) => any;
  confirmWalletPurchase : (data : any) => any;
  showLeads : (data : any) => any;
  showSingleLead : (data : any) => any;
  filterLead : (data : any) => any;
  checkBid : (data : any) => any;
  applyJob : (data : any) => any;
  payAsGoSession : (data : any) => any;
  payAsGoSessionData : (data : any) => any
  


  //GENERAL
  changePicture : (data : any) => any;
  lastDatesDetails : (data : any) => any;
  changePassword : (data : any) => any;
  changeTwoFact : (data : any) => any;
  kycDetailsUpload : (data : any) => any;
  kycDocumentDetailsUpload : (data : any) => any;
  getChatPage : (data : any) => any;
  getNotificationPage : (data : any) => any;
  setMark : (data : any) => any;
  setChat : (data : any) => any;
  setRequest : (data : any) => any;
  setReminder : (data : any) => any;
  setChatNotification : (data : any) => any;
  dashboardData : (data : any) => any;
  findServiceCategory : (data : any) => any;
  findAllTickets : (data : any) => any;
  createTicket : (data : any) => any;
  findSingleTicket : (data : any) => any;
  respondTicket : (data : any) => any;
  getPointsBudget : (data : any) => any;
  generateInvoice : (data : any) => any;
  walletPointsData : (data : any) => any;
  phoneVerifyPage : (data : any) => any;
  userChatDetilas : (data : any) => any;
  sendPhoneOtpWid : (data : any) => any;
  sendEmailOtpWid : (data : any) => any;

  

  //Client Context
  clientSignup : (data : any) => any;
  clientDetailsAdd : (data : any) => any;
  sendEmailOtpClient : (data : any) => any;
  getClientsData : (data : any) => any;
  addClientsData : (data : any) => any;
  clientDetails : (data : any) => any;
  getPhoneNo : (data : any) => any;
  intoProfessoinal  : (data : any) => any;
  searchJobQuestions : (data : any) => any;
  postProject : (data : any) => any;

  // Files
  allActiveProjectsClient :  (data : any) => any;
  allActiveProjectsProfessoinal : (data : any) => any
  markAsAwardedClient : (data : any) => any;
  singleProjectDetails : (data : any) => any;
  awardProject : (data : any) => any;
  addProjectTasks : (data : any) => any;
  markAsCompleted : (data : any) => any;
  clientGivingReview : (data : any) => any;
  professionalGivingReview : (data : any) => any;
  clientCancelProject : (data : any) => any;
  professionlalAwardedChoice : (data : any) => any;
  AllProjectHistory : (data : any) => any;


  //Milestone 3
  showLeadsAdmin : () => any;
  showSingleLeadsData : (data : any) => any;
  showLeadsBids : (data : any) => any;
  changeLeadsStatus : (data : any) => any;
  declineProposal : (data : any) => any;
  showCategory : () => any;
  addCategories : (data : any) => any;
  showAllServiceAdmin : () => any;
  addServicesAdmin : (data : any) => any;
  showAllQuestions : () => any;
  addAllQuestions : (data : any) => any;
  showAllAssignedQuestions : () => any; 
  showAllKycData : (data : any) => any;
  showSingleKycData : (data : any ) => any;
  changeKycStatus : (data : any) => any;
  showAllCertificate : () => any;
  showSingleCertificate : (data : any ) => any;
  changeCertificateStatus : (data : any) => any;
  dashboarData : () => any;
  showAllTickets : () => any;
  addJobsQuestions : (data : any ) => any;
  allUsers : () => any;
  singleUser : (data : any ) => any;
  changeUserStatus : (data : any ) => any;
  addPoints : (data : any ) => any;
  loginAdmin : (data : any ) => any;
  verifyAdmin : (data : any ) => any;
  allAdmin : () => any;
  createNewAdmin : (data : any ) => any;
  showAllReviews : () => any;
  deleteReview : (data : any ) => any;
  ActivitiesData  : () => any;
  refundTransaction : (data : any ) => any;
  membershipPageData : () => any;
  changeMembershipStatus : (data : any ) => any;
  creditAndWallet : () => any;
  editCategory : (data : any ) => any;
  deleteCategory : (data : any ) => any;
  editService :  (data : any ) => any;
  deleteService : (data : any ) => any;
  walletPage : () => any;
  addPointsWallet : (data : any ) => any;
  editPointsWallet : (data : any ) => any;
  deletePointsWallet : (data : any ) => any;
  pointsPage : ( ) => any;
  addPointsRule : (data : any ) => any;
  editPointsRule : (data : any ) => any;
  deletePointsPoints : (data : any ) => any;
  deleteQuestions : (data : any ) => any;
  deleteJobsQuestions  : (data : any ) => any;
  editJobsQuestions : (data : any ) => any;
  logoutAdmin : (data : any ) => any;
  
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function getUserFromLocalStorage(): User | null {
  const storedUser = localStorage.getItem('user');

  return storedUser ? JSON.parse(storedUser) : null;
}

function useUser() {
  const [user, setUser]  : any  = useState<User | null>(null);

  useEffect(() => {
    const storedUser  : any  = getUserFromLocalStorage();
    
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return { user, setUser };
}

function useUserContext() {
    
  const context  = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}




// User provider component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser }  : any  = useUser();

  let[userData, setUserData] : any = useState({
    token : Cookies.get("token") || "",
    userId :  Cookies.get("userId") || "",
    userName : Cookies.get("userName")  || "",
    userPicture : Cookies.get("userPicture")  ||  "",
    userRegisterAs : Cookies.get("userRegisterAs")  ||  "",
    userType : Cookies.get("userType")  ||  "",
    
  })
  let [userId, setUserId]  : any  = useState(Cookies.get('userId') || "" );
  let [uType, setUType]  : any  = useState(Cookies.get('uType') || "" );
  let [payPayment,setPayPayment]  : any  = useState("unpaid");

  useEffect(()=>{
    setPayPayment(payPayment);
  },[payPayment])


  let[tempUserData, setTempUserData]  : any  = useState({
    userId : Cookies.get("userId") || "" ,
    userEmail :Cookies.get("userEmail") || "" ,
    userPhone :  Cookies.get("userPhone") || "",
    userType : Cookies.get("userType") || "",
    userName : "",
    userPassword : "",
    userConfirmPassword : "",
    phoneVerificationId : "",
    emailVerificationId : "",
    country_code : "",
    country_calling_code : "",
    isEmailVerify : false,
    isPhoneVerify : false,
    userPrimaryService : Cookies.get("userPrimaryService") || "",
    professionalFormData : {
      name : Cookies.get("name") || "",
      companyName :  Cookies.get("companyName") || "",
      website : Cookies.get("website")  || "",
      bio : Cookies.get("bio")  ||  "",
      companySize : Cookies.get("companySize")  ||  "",
      skills : Cookies.get("skills")  ||  "",
      userId : Cookies.get("userId")  ||  "",
      isData : Cookies.get("isData")  ||  false,
    },
  });
 

  let [projectData, setProjectData]  : any  = useState({
    userId : "",
    serviceCategory : "",
    serviceNeeded : "",
    serviceLocationPostal : "", 
    serviceLocationCountry : "",
    serviceQuestions : [],
    serviceFrequency : "",
    serviceFrequencyDays : "",
    projectPriceString : "",
    projectMaxPrice : 0,
    projectPriceTitle : "",
    projectUrgentStatus : "",
    pointsNeeded : 0,
    serviceTitle : "",
    serviceDes : "",
    postCodeRegion : "",
  })



  async function verifyToken(token :any ,userType : any, auth ){
    try{  
      const verifyToken  : any    = await axios.post('/verify', {
        type : userType,
        token : token,
        auth
      });
      return(verifyToken);
      
    }
    catch(e){
      return(e);
    }
};

async function findAllServices(){
  try{  
    const allServices  : any  = await axios.get('/getAllService');
    // console.log(allServices);
    return(allServices);
    
  }
  catch(e){
    return(e);
  }
}


  let [signupProfessional, setSignupProfessional]  : any  = useState({
      fullName : "",
      email : "",
      password : "",
      confirmPassword : "",
      userType : "professional",
      professionalService : "",
  })
 

  async function professionalSignupFunction(userData :  any ){
        try{
          const response  : any  = await axios.post('/signupEmail', {
            clientId : "",
            name : userData.fullName,
            email : userData.email,
            pass : userData.password,
            confirmPass : userData.confirmPassword,
            userType : userData.userType,
            professionalService : tempUserData.userPrimaryService,
          });
          setTempUserData({...tempUserData, userEmail : userData.email});
          Cookies.set("userEmail", userData.email, { secure: true, sameSite: 'None' });
          Cookies.set("userId", response.data?.data[0]?.userId, { secure: true, sameSite: 'None' });
          return(response)
        }
        catch(e){
          return(e);
        }
  };

  async function verifyOtp({otp, userId, userType, type : type = "auth"}  : any )  {
    try{
      const response  : any  = await axios.post('/verify-emailOtp', {
        userId : userId,
        otp : otp,
        userType : userType,
        type : type
      });

      return(response)
    }
    catch(e){
      return(e);
    }
};

async function verifyOtpWoId({otp, verificationId, userType,}  : any )  {
  try{
    const response  : any  = await axios.post('/verifyEmailOtpWoId', {
      verificationId : verificationId,
      otp : otp,
      userType : userType,
    });

    return(response)
  }
  catch(e){
    return(e);
  }
};


async function signinProfessional({email, password, userType} : any ){
  try{
    // if(userType === "client"){
      const response  : any = await axios.post('/signinEmail', {
        email : email,
        pass : password,
      });
  
      if(response?.data?.userStatus === "success" ||  response?.data?.userStatus === "SUCCESS"){
        const verifyToken  : any  = await axios.post('/verify', {
          type : response?.data?.userType,
          token : response?.data?.token,
          auth : true
        });
        
        setUserData({
          token : response?.data?.token,
          userId : verifyToken?.data?.userId,
          userName : verifyToken?.data?.data[0]?.fullName,
          userPicture : verifyToken?.data?.data[0]?.pictureLink,
          userType : verifyToken?.data?.userType,
          userRegisterAs : verifyToken?.data?.data[0]?.registerAs,
        })
    
        Cookies.set("token", response?.data?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", verifyToken?.data?.userType, { secure: true, sameSite: 'None',expires: 30 });

        return({response : response ,tokenData : verifyToken, isTwoFactAuth : false});
      }
      else if(response?.data?.userStatus === 'PENDING'){
        setUserData({
          ...userData,
          userId : response?.data?.data[0]?.userId,
          userType : response?.data?.data[0]?.userType,
        });
        setTempUserData({...tempUserData, "userEmail" : response.data?.data[0]?.email});
        setUserId(response?.data?.data[0]?.userId);
        Cookies.set("userType", response?.data?.data[0]?.userType, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userId", response?.data?.data[0]?.userId, { secure: true, sameSite: 'None',expires: 30 });
        return({response : response , isTwoFactAuth : true});
      }     
  }
  catch(e){
    return(e);
  }
}

  async function sendPhoneOtp({userId, userType, phoneNo}  : any ){
    try{
      const response  : any = await axios.post('/sendPhoneOtp', {
        userId : userId,
        userType : userType,
        phoneNo : phoneNo
      });
      return(response);
    }
    catch(e){
      return(e);
    }
  };
  async function sendEmailOtp({userId, userType, email}  : any ){
    try{
      const response  : any = await axios.post('/sendEmailOtp', {
        userId : userId,
        userType : userType,
        userEmail : email
      });
      return(response);
    }
    catch(e){
      // console.log(e);
      return(e);
    }
  };



  async function sendPhoneOtpWid({userId, userType, phoneNo}  : any ){
    try{
      const response  : any = await axios.post('/resendPhoneOtpWId', {
        userId : userId,
        userType : userType,
        phoneNo : phoneNo
      });
      return(response);
    }
    catch(e){
      return(e);
    }
  };
  async function sendEmailOtpWid({userType, email}  : any ){
    try{
      const response  : any = await axios.post('/resendEmailOtpWId', {
        userType : userType,
        userEmail : email
      });
      return(response);
    }
    catch(e){
      // console.log(e);
      return(e);
    }
  };

  async function verifyPhoneOtp(userId : any, userType : any, otp : any){
    try{
      const response  : any  = await axios.post('/verify-phoneOtp', {
        userId : userId,
        otp : otp,
        userType : userType
        });
        // console.log(response);
  
        return(response)
      }
      catch(e){
        return(e);
      }
};

  async function verifyPhoneWoOtp(verificationId : any, userType : any, otp : any){
      try{
        const response  : any  = await axios.post('/verifyPhoneOtpWoId', {
          verificationId : verificationId,
          otp : otp,
          userType : userType
          });
          return(response)
        }
        catch(e){
          return(e);
        }
  };

  async function addProfessionalDetails({name, companyName,website,bio,companySize,skills,isData,userId,selectedPostcodes}  : any ){
    try{
      const response : any = await axios.post('/addDetailsProfessionals', {
        userId : userId,
        name,
        companyName,
        companyWebsite : website,
        companySize,
        bio,
        skills,
        postCode : selectedPostcodes
        });
        return(response)
      }
      catch(e){
        return(e);
      }
};

async function addLeadsToProfessioal({userId, services}  : any ){
  // console.log(userId, services);
  try{
    const response = await axios.post('/addProfessionalServices', {
      userId : userId,
      services
      });
      return(response)
    }
    catch(e){
      return(e);
    }
};

async function continueWithGoogleProfessional(data  : any, userType :   any) {
  // console.log(data, userType);
  
    try{
      if(data){
        if(userType === "professional"){
        let d  : any = {
          userFName : data.given_name,
          userLName : data.family_name,
          userFullName : data.name,      
          email : data.email,
          userPictureLink : data.picture,
          userType : userType,
          userRegisterAs : "professional",
          verify : data.email_verified,
          professionalService : tempUserData.userPrimaryService || Cookies.get("userPrimaryService")
        }
        const response  : any  = await axios.post('/signinGoogle', d);
          return(response)
        }
        else{
          let d = {
            userFName : data.given_name,
            userLName : data.family_name,
            userFullName : data.name,      
            email : data.email,
            userPictureLink : data.picture,
            userType : userType,
            userRegisterAs : "client",
            verify : data.email_verified,
            professionalService : ""
          }
          const response  : any  = await axios.post('/signinGoogle', d);
            return(response)
        }
      }
      }
      catch(e){
        return(e);
      }
};



///////////////////////////////CLIENTS CONTEXT////////////////////////////, 
async function clientSignup({phoneNo, country, countryCode}  : any ){
  try{
    const response  : any  = await axios.post('/signup-phone', {
      phoneNo,
      country,
      countryCode
      });
      return(response)
    }
    catch(e){
      return(e);
    }
};



async function sendEmailOtpClient({email}  : any ){
  // console.log(clientId, email, name, pass, confirmPass, userType)
  
  try{
    const response  : any  = await axios.post('/clientSendEmailOtp', {
      email: email,
      });
      // console.log(response);  
      return(response)
    }
    catch(e){
      return(e);
    }
};

async function clientDetailsAdd({email, name, pass, confirmPass, userType,phone ,country, countryCode,isPhoneVerify, isEmailVerify}  : any ){
  // console.log(clientId, email, name, pass, confirmPass, userType)
  
  try{
    const response  : any  = await axios.post('/signupEmail', {
      email: email,
      phone : phone,
      name: name,
      pass: pass,
      confirmPass : confirmPass,
      country : country,
      countryCode : countryCode,
      isPhoneVerify : isPhoneVerify, 
      isEmailVerify : isEmailVerify,
      userType: userType,
      professionalService : ""

      });
      // console.log(response);  
      return(response)
    }
    catch(e){
      return(e);
    }
};


async function forgotPassword({email} : any ){
    // console.log(email, userType);
    try{
      const response  : any  = await axios.post('/forgetPasswordLoginEmail', {
        userEmail : email,
        });
        // console.log(response);
        return(response);
    }
    catch(e){
      // console.log(e);
      return(e);
    }
}

async function changeForgotPassword({userId, password}  : any ){
  // console.log(email, userType);
  try{
    const response  : any  = await axios.post('/changePasswordLogin', {
      userId : userId,
      newPassword : password
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }

}

async function getClientsData({userId}  : any ){
  // console.log(userId);
  try{
    const response  : any  = await axios.post('/getPersonalClientInfo', {
      userId : userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }

}

async function clientDetails({ userId}  : any ){
  try{
    const response  : any  = await axios.post('/clientDetails', {
      clientId : userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function addClientsData({userId, name, bio}  : any ){
  try{
    const response  : any  = await axios.post('/addPersonalClientInfo', {
      userId : userId,
      name,
      bio
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function changePicture({userId, name, bio}  : any ){
  try{
    const response  : any  = await axios.post('/addPersonalClientInfo', {
      userId : userId,
      name,
      bio
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function lastDatesDetails({userId, userType}  : any ){
  try{
    const response  : any  = await axios.post('/lastChangeDetails', {
      userId : userId,
      userType
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function changePassword({userId, userType, oldPassword, newPassword}  : any ){
  try{
    const response  : any  = await axios.post('/changePassword', {
      userId : userId,
      userType,
      oldPassword,
      newPassword
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function changeTwoFact({userId, userType, current_value}  : any ){
  try{
    const response  : any  = await axios.post('/twoFactSwitch', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function getPhoneNo({userId, userType}  : any ){
  try{
    const response  : any  = await axios.post('/getUserPhone', {
      userId : userId,
      userType,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function kycDetailsUpload({data, userId, userType}  : any ){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/kycDetails', {
      userId : userId,
      userType,
      firstName : data.firstName,
      lastName : data.lastName,
      email : data.email,
      phoneNo : data.phoneNumber,
      postcode : data.postCode,
      address : data.address

      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function kycDocumentDetailsUpload(formData  : any ){
  try{
    const response  : any  = await axios.post('/kycDocuments', formData);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function phoneVerifyPage({userId, userType, phoneNo}  : any ){
  try{
    const response  : any  = await axios.post('/phoneVerifyPage', {
      userId,
      userType,
      phoneNo
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function getChatPage({ userId, userType} : any ){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/getChatPage', {
      userId : userId,
      userType,

      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function setMark({ userId, userType,current_value} : any ){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/markAsUnavailable', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function setChat({ userId, userType,current_value}  : any ){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/activeChat', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function setRequest({ userId, userType,current_value}  : any ){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/changeRequest', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function setReminder({ userId, userType,current_value}){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/reminderToReply', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function setChatNotification({ userId, userType,current_value}){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/chatNotifications', {
      userId : userId,
      userType,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function getNotificationPage({ userId, userType}){
  // console.log(data,userId, userType);
  try{
    const response  : any  = await axios.post('/getNotificationPage', {
      userId : userId,
      userType,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function intoProfessoinal({ userId}){
  try{
    const response  : any  = await axios.post('/clientSwitchToProfessional', {
      clientId : userId,
      });
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function intoClient({ userId}){
  try{
    const response  : any  = await axios.post('/professionalSwitchToClient', {
      professionalId : userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function dashboardData({ userId, userType}){
  try{
    const response  : any  = await axios.post('/dashboardData', {
      userId : userId,
      userType : userType,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }


}

async function professionalDetails({ userId}){
  try{
    const response  : any  = await axios.post('/professionalDetails', {
      professionalId : userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function professionalDetailsP1({ userId}){
  try{
    const response  : any  = await axios.post('/getPersonalInfoProfP1', {
      userId : userId,
      });
      // console.log(response);
      return(response); 
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function professionalDetailsP2({ userId}){
  try{
    const response  : any  = await axios.post('/getPersonalInfoProfP2', {
      userId : userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function addProfessionalDetailsP1({ userId, name}){
  try{
    const response  : any  = await axios.post('/addPersonalnfoProfP1', {
      userId : userId,
      name : name
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function addProfessionalDetailsP2({ userId, companyName,companyTitle,postalCode  ,primaryService,services,bio,companyWebsite,address}){
  try{
    const response  : any  = await axios.post('/addPersonalInfoProfP2', {
      userId : userId,
      companyName : companyName,
      companyTitle : companyTitle,
      postalCode : postalCode,
      primaryService : primaryService,
      services : services,
      bio : bio,
      companyWebsite : companyWebsite,
      address : address,
      completeProfileRegistration : true
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function changeEmail({ userId , email,newEmail, userType}){
  try{
    const response  : any  = await axios.post('/changeEmail', {
      userId : userId,
      email,
      newEmail,
      userType
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function findServiceCategory({ serviceName}){
  try{
    const response  : any  = await axios.post('/findServiceCategory', {
      serviceName
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function findAllTickets({ userId , userType}){
  try{
    const response  : any  = await axios.post('/findAllTickets', {
        userId,
        userType
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function findSingleTicket({ ticketId ,}){
  try{
    const response  : any  = await axios.post('/findSingleTicket', {
      ticketId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function createTicket({ department, subject, relatedProject, relatedProjectId, createdBy, creatorName ,creatorId, ticketStatus, message}){
  try{
    const response  : any  = await axios.post('/createTicket', {
      ticketDepartment : department,
      ticketSubject : subject,
      ticketRelatedProject : relatedProject,
      ticketProjectId :  relatedProjectId,
      ticketCreatedBy : createdBy, //client/professional/admin
      ticketCreatorId : creatorId,
      ticketCreatorName : creatorName,
      ticketStatus : ticketStatus, //active / closed / admin /customer
      ticketMessages : message,
      });
      console.log(response);
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function respondTicket({ ticketId, userId,userType, ticketStatus, userMessage}){
  try{
    console.log(ticketId, userId,userType, ticketStatus, userMessage);
    const response  : any  = await axios.post('/respondTicket', {
      ticketId,
      userId,
      userType,
      ticketStatus,
      userMessage
      });
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function searchJobQuestions({ category , service}){
  try{
    const response  : any  = await axios.post('/getJobsQuestions', {
      category,
      service
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function getPointsBudget({ category}){
  try{
    const response  : any  = await axios.post('/getPointsCategory', {
      category,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function purchaseMembership({ professionalId}){
  try{
    const response  : any  = await axios.post('/purchaseMembership', {
      professionalId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function confirmMembership({ sessionId}){
  try{
    const response  : any  = await axios.post('/addpurchaseMembershipData', {
      sessionId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function getMembershipData({ userId}){
  try{
    const response  : any  = await axios.post('/getMembershipData', {
      userId,
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function requestCancelMembershipData({ professionalId, trxId}){
  try{
    const response  : any  = await axios.post('/requestCancelMembership', {
      professionalId,
      trxId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function generateInvoice({ sessionId}){
  try{
    const response  : any  = await axios.post('/generateInvoice', {
      sessionId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function walletPointsData(){
  try{
    const response  : any  = await axios.get('/getPointsWallet');
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}
async function walletTransactionData({ userId}){
  console.log(userId);
  try{
    const response  : any  = await axios.post('/walletTransactionData', {
      userId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function pasAsGo({professionalId ,current_value}){
  try{
    const response  : any  = await axios.post('/changePayAsYouGo', {
      professionalId,
      current_value
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function buyPoints({professionalId ,amount,points}){
  try{
    const response  : any  = await axios.post('/walletTopupProfessional', {
      professionalId,
      amount,
      points
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function confirmWalletPurchase({ sessionId}){
  try{
    const response  : any  = await axios.post('/addWalletTopupProfessional', {
      sessionId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function showLeads({ userId, choice}){
  try{
    const response  : any  = await axios.post('/showLeads', {
      userId,
      choice
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showSingleLead({ projectId}){
  try{
    const response  : any  = await axios.post('/showSingleProjectLead', {
      projectId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function payAsGoSession({projectId ,professionalId}){
  try{
    const response  : any  = await axios.post('/payAsYouGoProject', {
      professionalId,
      projectId
      });
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function payAsGoSessionData({sessionId}){
  try{
    const response  : any  = await axios.post('/addPayAsYouGoProjectDetails', {
      sessionId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}



async function filterLead({ service, services, location,minBudget,maxBudget,timeStamp,todayTimeStamp,professionalId}){
  try{
    const response  : any  = await axios.post('/projectFilter', {
      service,
      services,
      location,
      minBudget,
      maxBudget,
      timeStamp,
      todayTimeStamp,
      professionalId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function postProject({project} ){
  console.log(project);
  try{
    const response  : any  = await axios.post('/postProject', {
      userId  : project.userId,
      serviceCategory : project.serviceCategory,
      serviceNeeded : project.serviceNeeded,
      serviceLocationPostal : project.serviceLocationPostal,
      serviceLocationTown : project.postCodeRegion,
      serviceQuestions : project.serviceQuestions,
      serviceFrequency : project.serviceFrequency,
      serviceFrequencyDays : project.serviceFrequencyDays,
      projectPriceTitle : project.projectPriceString,
      projectPriceString : project.projectPriceTitle,
      projectMaxPrice : project.projectMaxPrice,
      projectUrgentStatus : project.projectUrgentStatus,
      pointsNeeded : project.pointsNeeded,
      serviceTitle : project.serviceTitle,
      serviceDes : project.serviceDes,
      });
      
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function checkBid({userId,projectId }){
  try{
    const response  : any  = await axios.post('/professionalCheckBid', {
      userId,
      projectId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function applyJob({ professionalId, projectId, proposal,proposalType}){
  console.log(professionalId, projectId, proposal,proposalType)
  try{
    const response  : any  = await axios.post('/confirmBid', {
      professionalId,
        projectId,
        proposal,
        proposalType
      });
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}



//PRoject Related APIS

async function allActiveProjectsClient({ clientId, }){
  try{
    const response  : any  = await axios.post('/getAwardedDetails', {
      clientId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function allActiveProjectsProfessoinal({ userId, }){
  try{
    const response  : any  = await axios.post('/showAllAwardedProf', {
      userId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function markAsAwardedClient({ clientId,projectId }){
  console.log(clientId,projectId )
  try{
    const response  : any  = await axios.post('/markAsAwarded', {
      clientId,
      projectId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function markAsCompleted({ userId,userType,projectId }){
  try{
    const response  : any  = await axios.post('/markAsCompleted', {
      userId,userType,projectId,
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function clientGivingReview({ professionalId,projectId,rating,review }){
  try{
    const response  : any  = await axios.post('/clientReviewSubmitting', {
      professionalId,projectId,rating,review,
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function professionalGivingReview({ clientId,projectId,rating,review }){
  try{
    const response  : any  = await axios.post('/professionalReviewSubmitting', {
      clientId,projectId,rating,review,
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function singleProjectDetails({ projectId,userId,need , userType}){
  // console.log(clientId,projectId )
  try{
    const response  : any  = await axios.post('/getSingleProjectClient', {
      projectId,userId,need ,userType
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function awardProject({ projectId,professionalId,clientId,projectConfirmAmount }){
  console.log(projectId,professionalId,clientId,projectConfirmAmount )
  try{
    const response  : any  = await axios.post('/awardProject', {
      projectId,clientId,professionalId,projectConfirmAmount
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function clientCancelProject({ clientId,projectId}){
  try{
    const response  : any  = await axios.post('/cancelProject', {
      projectId,clientId
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function professionlalAwardedChoice({ professionalId,projectId,choice}){
  try{
    const response  : any  = await axios.post('/acceptAwardedProjects', {
      professionalId,projectId,choice
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function addProjectTasks({ userId,userType,projectId,taskListName,taskListDes }){
  try{
    const response  : any  = await axios.post('/addProjectTaskList', {
      userId,userType,projectId,taskListName,taskListDes 
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function AllProjectHistory({ userId,userType }){
  try{
    const response  : any  = await axios.post('/projectHistory', {
      userId,userType
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function logout({ token,userType }){
  try{
    const response  : any  = await axios.post('/logout', {
      token,userType
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function userChatDetilas({ userId ,userType }){
  try{
    const response  : any  = await axios.post('/userChatDetails', {
      userId,userType
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}





/////////////////////////Milestone 3 , Admin Panel //////////////////////

async function showLeadsAdmin(){
  try{
    const response  : any  = await axios.post('/showAllLeads');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function showSingleLeadsData({id}){
  try{
    const response  : any  = await axios.post('/showSingleLeadsAdmin',{
      projectId : id
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function showLeadsBids({id}){
  try{
    const response  : any  = await axios.post('/showsingleProjectBids',{
      projectId : id,
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function changeLeadsStatus({id, choice}){
  try{
    const response  : any  = await axios.post('/changeLeadsStatus',{
      projectId : id,
      choice : choice
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function declineProposal({projectId, professoinalId}){
  try{
    const response  : any  = await axios.post('/declineProposal',{
      projectId,
      professoinalId
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function addCategories({category}){
  try{
    const response  : any  = await axios.post('/addCategory',{
      category
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showCategory(){
  try{
    const response  : any  = await axios.get('/showCategory');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function showAllServiceAdmin(){
  try{
    const response  : any  = await axios.post('/allServiceAdmin');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function addServicesAdmin({category, service}){
  try{
    const response  : any  = await axios.post('/addService', {
      category,
      service
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showAllQuestions(){
  try{
    const response  : any  = await axios.get('/showAllQuestions');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function addAllQuestions({questionTitle, questionType,questionChoices}){
  try{
    const response  : any  = await axios.post('/addQuestions',{
      questionTitle,
      questionType,
      questionChoices
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function deleteQuestions({questionId} : any){
  try{
    const response  : any  = await axios.post('/deleteQuestions',{
      questionId
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}




async function showAllAssignedQuestions(){
  try{
    const response  : any  = await axios.get('/showAllAssignedQuestions');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function addJobsQuestions({mode, type,slugs} : any){
  try{
    const response  : any  = await axios.post('/addJobsQuestions', {
      mode, type,slugs
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
};


async function editJobsQuestions({questionId, questionTitle,questionType,questionChoices,questionSlug} : any){
  try{
    const response  : any  = await axios.post('/editQuestions', {
      questionId, questionTitle,questionType,questionChoices,questionSlug
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function deleteJobsQuestions({mode, type} : any){
  try{
    const response  : any  = await axios.post('/deleteJobsQuestions', {
      mode, type
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}



async function showAllKycData({userType}){
  try{
    const response  : any  = await axios.post('/showAllKyc', {
      userType
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showSingleKycData({userType, id}){
  try{
    const response  : any  = await axios.post('/showSingleKyc', {
      userType,
      userId : id
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function changeKycStatus({userId, userType,adminComment,choice}){
  try{
    const response  : any  = await axios.post('/kycApproval', {
      userId, userType,adminComment,choice
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showAllCertificate(){
  try{
    const response  : any  = await axios.post('/showallCertificate');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showSingleCertificate({id}){
  try{
    const response  : any  = await axios.post('/showSingleCertificate',{
      certificationId : id
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function changeCertificateStatus({professionalId, certificationId,adminComment,choice}){
  try{
    const response  : any  = await axios.post('/certificationApproval', {
      professionalId, certificationId,adminComment,choice
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function dashboarData(){
  try{
    const response  : any  = await axios.post('/dashboard');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function showAllTickets(){
  try{
    const response  : any  = await axios.get('/allTicketsData');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function allUsers(){
  try{
    const response  : any  = await axios.post('/allUserAdmin');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function singleUser({userId, userType} : any){
  try{
    const response  : any  = await axios.post('/getSingleUserAdmin', {
      userId,
      userType
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function changeUserStatus({userId, userType, choice} : any){
  try{
    const response  : any  = await axios.post('/changeUserStatusAdmin', {
      userId,
      userType,
      choice
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function addPoints({userId, points} : any){
  try{
    const response  : any  = await axios.post('/addPointsProfessional', {
      userId,
      points
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}



async function loginAdmin({email, password} : any){
  try{
    const response  : any  = await axios.post('/adminLogin', {
      email,
      password
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function verifyAdmin({adminToken} : any){
  try{
    const response  : any  = await axios.post('/verifyAdmin', {
      adminToken
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function allAdmin(){
  try{
    const response  : any  = await axios.get('/showAllAdmin');
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function createNewAdmin({admin_name,admin_email,admin_password,admin_status} : any){
  try{
    const response  : any  = await axios.post('/addAdmins', {
      admin_name,
      admin_email,
      admin_password,
      admin_status,
    });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}



async function showAllReviews(){
  try{
    const response  : any  = await axios.get('/showReviews');
      return(response);
  }
  catch(e){
    return(e);
  }
}


async function deleteReview({projectId, totalRatings, userType}){
  try{
    const response  : any  = await axios.post('/deleteReview', {
      projectId,totalRatings,userType
    });
      return(response);
  }
  catch(e){
    return(e);
  }
}


async function ActivitiesData(){
  try{
    const response  : any  = await axios.get('/activities');
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function refundTransaction({transactionId}  : any){
  try{
    const response  : any  = await axios.post('/refudTransaction',{
      transactionId
    });
      return(response);
  }
  catch(e){
    return(e);
  }
}


async function membershipPageData(){
  try{
    const response  : any  = await axios.get('/membership');
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function changeMembershipStatus({professoinalId,choice} : any){
  try{
    const response  : any  = await axios.post('/changeMembershipStatus', {
      professoinalId,choice
    });
      return(response);
  }
  catch(e){
    return(e);
  }
}


async function creditAndWallet(){
  try{
    const response  : any  = await axios.get('/creditAndWallet');
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function editCategory({ oldValue, newValue } : any){
  try{
    const response  : any  = await axios.post('/editCategory', {
      oldValue,
      newValue
      });
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function deleteCategory({ oldValue } : any){
  try{
    const response  : any  = await axios.post('/deleteCategory', {
      oldValue,
      });
      return(response);
  }
  catch(e){
    return(e);
  }
}


async function editService({ category,oldValue, newValue } : any){
  try{
    const response  : any  = await axios.post('/editService', {
      category,
      oldValue,
      newValue
      });
      return(response);
  }
  catch(e){
    return(e);
  }
};


async function deleteService({ category,serviceValue } : any){
  try{
    const response  : any  = await axios.post('/deleteService', {
      category,
      serviceValue,
      });
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function walletPage(){
  try{
    const response  : any  = await axios.get('/showWalletData');
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function addPointsWallet({point, amount} : any){
  try{
    const response  : any  = await axios.post('/addPointsWalletData',{
      point  ,
      amount 
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function editPointsWallet({walletId,newPoint, newAmount} : any){
  try{
    const response  : any  = await axios.post('/editWalletData',{
      walletId,newPoint, newAmount
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};


async function deletePointsWallet({walletId} : any){
  try{
    const response  : any  = await axios.post('/deleteWalletData',{
      walletId
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};



async function pointsPage(){
  try{
    const response  : any  = await axios.get('/showPointsWalletData');
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function deletePointsPoints({walletId} : any){
  try{
    const response  : any  = await axios.post('/deletePointsWalletData',{
      walletId
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};
async function addPointsRule({points,category,frequency,budget} : any){
  try{
    const response  : any  = await axios.post('/addPointsRule',{
      points,category,frequency,budget
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};

async function editPointsRule({walletId,newPoint,newCategory,newFrequency,newBudget} : any){
  try{
    const response  : any  = await axios.post('/editPointsWalletData',{
      walletId,newPoint,newCategory,newFrequency,newBudget
    });
      return(response);
  }
  catch(e){
    return(e);
  }
};










async function logoutAdmin({ token } : any){
  try{
    const response  : any  = await axios.post('/logout-admin', {
      token
      });
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}





  return (
    <UserContext.Provider value={{
      userId,
      setUserId,
      uType,
      setUType,
      userData,
      setUserData,  // function to set user data from local storage or cookies
      tempUserData,
      setTempUserData,
      user,
      setUser,
      verifyToken,
      findAllServices, // function to fetch all services from database
      signupProfessional,  //professional signup state
      setSignupProfessional, //set professional signup state
      professionalSignupFunction,  // function for professional signup
      verifyOtp,
      verifyOtpWoId,
      signinProfessional,
      sendPhoneOtp,
      sendEmailOtp,
      verifyPhoneOtp,
      verifyPhoneWoOtp,
      addProfessionalDetails,
      addLeadsToProfessioal,
      continueWithGoogleProfessional,
      postProject,

      //GENERAL
      forgotPassword,
      changeForgotPassword,
      changePicture,
      lastDatesDetails,
      changePassword,
      changeTwoFact,
      getPhoneNo ,
      kycDetailsUpload,
      kycDocumentDetailsUpload,
      getChatPage,
      setMark,
      setChat,
      getNotificationPage,
      setRequest,
      setReminder,
      setChatNotification,
      dashboardData,
      findServiceCategory,
      findAllTickets,
      createTicket,
      findSingleTicket,
      respondTicket,
      getPointsBudget,
      generateInvoice,
      walletPointsData,
      markAsCompleted,
      logout,
      phoneVerifyPage ,
      userChatDetilas,
      sendPhoneOtpWid,
      sendEmailOtpWid,

      //PRofessional
      intoClient,
      professionalDetails,
      professionalDetailsP1,
      professionalDetailsP2,
      changeEmail,
      projectData,
      setProjectData,
      purchaseMembership,
      confirmMembership,
      getMembershipData,
      requestCancelMembershipData,
      walletTransactionData,
      pasAsGo,
      buyPoints,
      confirmWalletPurchase,
      showLeads,
      showSingleLead,
      filterLead,
      checkBid,
      applyJob,
      payPayment,
      setPayPayment,
      payAsGoSession,
      payAsGoSessionData,
      addProfessionalDetailsP2,
      addProfessionalDetailsP1,

      //Clietn Context
      clientSignup,
      clientDetailsAdd,
      sendEmailOtpClient,
      getClientsData,
      addClientsData,
      clientDetails ,
      intoProfessoinal,
      searchJobQuestions,


      //Files
      allActiveProjectsClient,
      allActiveProjectsProfessoinal,
      markAsAwardedClient,
      singleProjectDetails,
      awardProject,
      addProjectTasks,
      clientGivingReview,
      clientCancelProject,
      professionalGivingReview,
      professionlalAwardedChoice,
      AllProjectHistory,


      //Milestone 3 
      showLeadsAdmin,
      showSingleLeadsData,
      showLeadsBids,
      changeLeadsStatus,
      declineProposal,
      showCategory,
      addCategories,
      showAllServiceAdmin,
      addServicesAdmin,
      showAllQuestions,
      addAllQuestions,
      showAllAssignedQuestions,
      showAllKycData,
      showSingleKycData,
      changeKycStatus,
      showAllCertificate,
      showSingleCertificate,
      changeCertificateStatus,
      dashboarData,
      showAllTickets,
      addJobsQuestions,
      allUsers,
      singleUser,
      changeUserStatus,
      addPoints,
      loginAdmin,
      verifyAdmin,
      allAdmin,
      createNewAdmin,
      showAllReviews,
      deleteReview,
      ActivitiesData,
      refundTransaction,
      membershipPageData,
      changeMembershipStatus,
      creditAndWallet,
      editCategory,
      deleteCategory,
      editService,
      deleteService,
      walletPage,
      addPointsWallet,
      editPointsWallet,
      deletePointsWallet,
      pointsPage,
      addPointsRule,
      editPointsRule,
      deletePointsPoints,
      deleteQuestions,
      deleteJobsQuestions,
      editJobsQuestions,
      logoutAdmin,

       }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
