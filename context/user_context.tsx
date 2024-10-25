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
  setProjectData : (projectData : Object) => void;
  tempUserData :  String | null;
  setTempUserData :(userData : object) => void;
  verifyToken : (data : object) => object;
  findAllServices : () => Array<String>;
  signupProfessional : SignupProfessional;
  setSignupProfessional : (signupProfessional : SignupProfessional) => void;
  professionalSignupFunction : (data : SignupProfessional) => object;
  verifyOtp : (data : object) => object;
  signinProfessional : (data : object) => object;
  sendPhoneOtp(data  : object) : object;
  sendEmailOtp : (data : object) => object;
  verifyPhoneOtp : (data : object) => object; 
  addProfessionalDetails :  (data : object) => object; 
  addLeadsToProfessioal : (data : object) => object; 
  continueWithGoogleProfessional : (data : object) => object;
  forgotPassword : (data : object) => object;
  changeForgotPassword : (data : object) => object;
  logout : (data : object) => object;

  //PRofessional
  intoClient : (data : object) => object;
  professionalDetails : (data : object) => object;
  professionalDetailsP1 : (data : object) => object;
  addProfessionalDetailsP1 : (data : object) => object;
  professionalDetailsP2 : (data : object) => object;
  addProfessionalDetailsP2  : (data : object) => object;
  changeEmail : (data : object) => object;
  purchaseMembership : (data : object) => object;
  confirmMembership : (data : object) => object;
  getMembershipData : (data : object) => object;
  requestCancelMembershipData : (data : object) => object;
  walletTransactionData : (data : object) => object;
  pasAsGo : (data : object) => object;
  buyPoints : (data : object) => object;
  confirmWalletPurchase : (data : object) => object;
  showLeads : (data : object) => object;
  showSingleLead : (data : object) => object;
  filterLead : (data : object) => object;
  checkBid : (data : object) => object;
  applyJob : (data : object) => object;
  payAsGoSession : (data : object) => object;
  payAsGoSessionData : (data : object) => object
  


  //GENERAL
  changePicture : (data : object) => object;
  lastDatesDetails : (data : object) => object;
  changePassword : (data : object) => object;
  changeTwoFact : (data : object) => object;
  kycDetailsUpload : (data : object) => object;
  kycDocumentDetailsUpload : (data : object) => object;
  getChatPage : (data : object) => object;
  getNotificationPage : (data : object) => object;
  setMark : (data : object) => object;
  setChat : (data : object) => object;
  setRequest : (data : object) => object;
  setReminder : (data : object) => object;
  setChatNotification : (data : object) => object;
  dashboardData : (data : object) => object;
  findServiceCategory : (data : object) => object;
  findAllTickets : (data : object) => object;
  createTicket : (data : object) => object;
  findSingleTicket : (data : object) => object;
  respondTicket : (data : object) => object;
  getPointsBudget : (data : object) => object;
  generateInvoice : (data : object) => object;
  walletPointsData : (data : object) => object;
  phoneVerifyPage : (data : object) => object;
  userChatDetilas : (data : object) => object;

  

  //Client Context
  clientSignup : (data : object) => object;
  clientDetailsAdd : (data : object) => object;
  getClientsData : (data : object) => object;
  addClientsData : (data : object) => object;
  clientDetails : (data : object) => object;
  getPhoneNo : (data : object) => object;
  intoProfessoinal  : (data : object) => object;
  searchJobQuestions : (data : object) => object;
  postProject : (data : object) => object;

  // Files
  allActiveProjectsClient :  (data : object) => object;
  allActiveProjectsProfessoinal : (data : object) => object
  markAsAwardedClient : (data : object) => object;
  singleProjectDetails : (data : object) => object;
  awardProject : (data : object) => object;
  addProjectTasks : (data : object) => object;
  markAsCompleted : (data : object) => object;
  clientGivingReview : (data : object) => object;
  professionalGivingReview : (data : object) => object;
  clientCancelProject : (data : object) => object;
  professionlalAwardedChoice : (data : object) => object;
  AllProjectHistory : (data : object) => object;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function getUserFromLocalStorage(): User | null {
  const storedUser = localStorage.getItem('user');

  return storedUser ? JSON.parse(storedUser) : null;
}

function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    
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
    
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}




// User provider component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUser();

  let[userData, setUserData] = useState({
    token : Cookies.get("token") || "",
    userId :  Cookies.get("userId") || "",
    userName : Cookies.get("userName")  || "",
    userPicture : Cookies.get("userPicture")  ||  "",
    userRegisterAs : Cookies.get("userRegisterAs")  ||  "",
    userType : Cookies.get("userType")  ||  "",
    
  })
  let [userId, setUserId] = useState(Cookies.get('userId') || "" );
  let [uType, setUType] = useState(Cookies.get('uType') || "" );
  let [payPayment,setPayPayment] = useState("unpaid");

  useEffect(()=>{
    setPayPayment(payPayment);
  },[payPayment])


  let[tempUserData, setTempUserData] = useState({
    userId : Cookies.get("userId") || "" ,
    userEmail :Cookies.get("userEmail") || "" ,
    userPhone :  Cookies.get("userPhone") || "",
    userType : Cookies.get("userType") || "",
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
 

  let [projectData, setProjectData]= useState({
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



  async function verifyToken(token :string ,userType : string, auth ){
    try{  
      console.log(token, userType, auth);
      const verifyToken = await axios.post('/verify', {
        type : userType,
        token : token,
        auth
      });
      // console.log(verifyToken);
      return(verifyToken);
      
    }
    catch(e){
      return(e);
    }
};

async function findAllServices(){
  try{  
    const allServices = await axios.get('/getAllService');
    // console.log(allServices);
    return(allServices);
    
  }
  catch(e){
    return(e);
  }
}


  let [signupProfessional, setSignupProfessional] = useState({
      fullName : "",
      email : "",
      password : "",
      confirmPassword : "",
      userType : "professional",
      professionalService : "",
  })
 

  async function professionalSignupFunction(userData : SignupProfessional){
        try{
          // console.log(userData);
          const response = await axios.post('/signupEmail', {
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

  async function verifyOtp({otp, userId, userType, type : type = "auth"})  {
    try{
      // console.log(otp, userId, userType);
      const response = await axios.post('/verify-emailOtp', {
        userId : userId,
        otp : otp,
        userType : userType,
        type : type
      });
      // console.log(response);

      return(response)
    }
    catch(e){
      return(e);
    }
};


async function signinProfessional({email, password, userType}){
  console.log(email, password,userType)
  try{
    if(userType === "professional"){
      const response = await axios.post('/signinEmail', {
        email : email,
        pass : password,
        userType : userType
      });
  
      if(response.data.userStatus === 'success' || response.data.userStatus === 'SUCCESS'){
        const verifyToken = await axios.post('/verify', {
          type : "professional",
          token : response.data?.token,
          auth : true
        });
        
        setUserData({
          token : response.data?.token,
          userId : verifyToken.data?.userId,
          userName : verifyToken.data?.data[0]?.fullName,
          userPicture : verifyToken.data?.data[0]?.pictureLink,
          userType : verifyToken.data?.userType,
          userRegisterAs : verifyToken.data?.data[0]?.registerAs,
        })
    
        Cookies.set("token", response.data?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", verifyToken.data?.userType, { secure: true, sameSite: 'None',expires: 30 });

        return({response : response ,tokenData : verifyToken, isTwoFactAuth : false});
      }
      else if(response.data.userStatus === 'PENDING'){
        setUserData({
          userId : response.data?.data[0]?.userId,
          userType : response.data?.data[0]?.userType,
        });
        setTempUserData({...tempUserData, "userEmail" : response.data?.data[0]?.email});
        setUserId(response.data?.data[0]?.userId);
        Cookies.set("userType", response.data?.data[0]?.userType, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userId", response.data?.data[0]?.userId, { secure: true, sameSite: 'None',expires: 30 });
        return({response : response , isTwoFactAuth : true});
      }   
    }
    else{
      const response = await axios.post('/signinEmail', {
        email : email,
        pass : password,
        userType : userType
      });
  
      // console.log("Response", response);
  
      if(response.data.userStatus === 'success' || response.data.userStatus === 'SUCCESS'){
        const verifyToken = await axios.post('/verify', {
          type : "client",
          token : response.data?.token,
          auth : true
        });
        // console.log("Token", verifyToken)
        setUserData({
          token : response.data?.token,
          userId : verifyToken.data?.userId,
          userName : verifyToken.data?.data[0]?.fullName,
          userPicture : verifyToken.data?.data[0]?.pictureLink,
          userType : verifyToken.data?.userType,
          userRegisterAs : verifyToken.data?.data[0]?.registerAs,
        })
    
        // console.log( verifyToken.data?.userType);
        Cookies.set("token", response.data?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", verifyToken.data?.userType,  { secure: true, sameSite: 'None',expires: 30 });
        return({response : response ,tokenData : verifyToken, isTwoFactAuth : false});
      }
      else if(response.data.userStatus === 'PENDING'){
        setUserData({
          userId : response.data?.data[0]?.userId,
          userType : response.data?.data[0]?.userType,
        });
        setTempUserData({...tempUserData, "userEmail" :response.data?.data[0]?.email});
        setUserId(response.data?.data[0]?.userId);
        Cookies.set("userType",response.data?.data[0]?.userType, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userId", response.data?.data[0]?.userId, { secure: true, sameSite: 'None',expires: 30 });
        // Cookies.set("userType", response.data?.data[0]?.userId, { secure: true, sameSite: 'None',expires: 30 });
        return({response : response , isTwoFactAuth : true});
      } 

    }
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

  async function sendPhoneOtp({userId, userType, phoneNo}){
    // console.log(userId, userType, phoneNo)
    try{
      const response = await axios.post('/sendPhoneOtp', {
        userId : userId,
        userType : userType,
        phoneNo : phoneNo
      });
      // console.log(response);
      return(response);
    }
    catch(e){
      // console.log(e);
      return(e);
    }
  };
  async function sendEmailOtp({userId, userType, email}){
    try{
      const response = await axios.post('/sendEmailOtp', {
        userId : userId,
        userType : userType,
        userEmail : email
      });
      // console.log(response);
      return(response);
    }
    catch(e){
      // console.log(e);
      return(e);
    }
  };

  async function verifyPhoneOtp(userId, userType, otp){
      console.log(userId, userType, otp);
      try{
        const response = await axios.post('/verify-phoneOtp', {
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

  async function addProfessionalDetails({name, companyName,website,bio,companySize,skills,isData,userId,selectedPostcodes}){
    // console.log("REached");
    // console.log(name, companyName,website,bio,companySize,skills,isData,userId,selectedPostcodes);
    console.log(userId)
    try{
      const response = await axios.post('/addDetailsProfessionals', {
        userId : userId,
        name,
        companyName,
        companyWebsite : website,
        companySize,
        bio,
        skills,
        postCode : selectedPostcodes
        });
        console.log(response);  
        return(response)
      }
      catch(e){
        return(e);
      }
};

async function addLeadsToProfessioal({userId, services}){
  // console.log(userId, services);
  try{
    const response = await axios.post('/addProfessionalServices', {
      userId : userId,
      services
      });
      // console.log(response);  
      return(response)
    }
    catch(e){
      return(e);
    }
};

async function continueWithGoogleProfessional(data  : object, userType : string) {
  // console.log(data, userType);
  
    try{
      if(data){
        if(userType === "professional"){
        let d = {
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
        const response = await axios.post('/signinGoogle', d);
          console.log(response);  
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
          const response = await axios.post('/signinGoogle', d);
            console.log(response);  
            return(response)
        }
      }
      }
      catch(e){
        return(e);
      }
};



///////////////////////////////CLIENTS CONTEXT////////////////////////////, 
async function clientSignup({phoneNo, country, countryCode}){
  // console.log(phoneNo);
  // console.log(country);
  // console.log(countryCode);
  try{
    const response = await axios.post('/signup-phone', {
      phoneNo,
      country,
      countryCode
      });
      console.log(response);  
      return(response)
    }
    catch(e){
      return(e);
    }
};


async function clientDetailsAdd({clientId, email, name, pass, confirmPass, userType}){
  // console.log(clientId, email, name, pass, confirmPass, userType)
  
  try{
    const response = await axios.post('/signupEmail', {
      clientId: clientId,
      email: email,
      name: name,
      pass: pass,
      confirmPass: confirmPass,
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


async function forgotPassword({email, userType}){
    // console.log(email, userType);
    try{
      const response = await axios.post('/forgetPasswordLoginEmail', {
        userEmail : email,
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

async function changeForgotPassword({userId, password}){
  // console.log(email, userType);
  try{
    const response = await axios.post('/changePasswordLogin', {
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

async function getClientsData({userId}){
  // console.log(userId);
  try{
    const response = await axios.post('/getPersonalClientInfo', {
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

async function clientDetails({ userId}){
  try{
    const response = await axios.post('/clientDetails', {
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

async function addClientsData({userId, name, bio}){
  try{
    const response = await axios.post('/addPersonalClientInfo', {
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
async function changePicture({userId, name, bio}){
  try{
    const response = await axios.post('/addPersonalClientInfo', {
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

async function lastDatesDetails({userId, userType}){
  try{
    const response = await axios.post('/lastChangeDetails', {
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

async function changePassword({userId, userType, oldPassword, newPassword}){
  try{
    const response = await axios.post('/changePassword', {
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
async function changeTwoFact({userId, userType, current_value}){
  try{
    const response = await axios.post('/twoFactSwitch', {
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

async function getPhoneNo({userId, userType}){
  try{
    const response = await axios.post('/getUserPhone', {
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

async function kycDetailsUpload({data, userId, userType}){
  // console.log(data,userId, userType);
  try{
    const response = await axios.post('/kycDetails', {
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

async function kycDocumentDetailsUpload(formData){
  console.log(formData);
  try{
    const response = await axios.post('/kycDocuments', formData);
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function phoneVerifyPage({userId, userType, phoneNo}){
  try{
    const response = await axios.post('/phoneVerifyPage', {
      userId,
      userType,
      phoneNo
    });
      console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}


async function getChatPage({ userId, userType}){
  // console.log(data,userId, userType);
  try{
    const response = await axios.post('/getChatPage', {
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
async function setMark({ userId, userType,current_value}){
  // console.log(data,userId, userType);
  try{
    const response = await axios.post('/markAsUnavailable', {
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
async function setChat({ userId, userType,current_value}){
  // console.log(data,userId, userType);
  try{
    const response = await axios.post('/activeChat', {
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
async function setRequest({ userId, userType,current_value}){
  // console.log(data,userId, userType);
  try{
    const response = await axios.post('/changeRequest', {
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
    const response = await axios.post('/reminderToReply', {
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
    const response = await axios.post('/chatNotifications', {
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
    const response = await axios.post('/getNotificationPage', {
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
    const response = await axios.post('/clientSwitchToProfessional', {
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


async function intoClient({ userId}){
  try{
    const response = await axios.post('/professionalSwitchToClient', {
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
    const response = await axios.post('/dashboardData', {
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
    const response = await axios.post('/professionalDetails', {
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
    const response = await axios.post('/getPersonalInfoProfP1', {
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
    const response = await axios.post('/getPersonalInfoProfP2', {
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
    const response = await axios.post('/addPersonalnfoProfP1', {
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
    const response = await axios.post('/addPersonalInfoProfP2', {
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
    const response = await axios.post('/changeEmail', {
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
    const response = await axios.post('/findServiceCategory', {
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
    const response = await axios.post('/findAllTickets', {
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
    const response = await axios.post('/findSingleTicket', {
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
    const response = await axios.post('/createTicket', {
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
      // console.log(response);
      return(response);
  }
  catch(e){
    return(e);
  }
}

async function respondTicket({ ticketId, userId,userType, ticketStatus, userMessage}){
  try{
    console.log(ticketId, userId,userType, ticketStatus, userMessage);
    const response = await axios.post('/respondTicket', {
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
    const response = await axios.post('/getJobsQuestions', {
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
    const response = await axios.post('/getPointsCategory', {
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
    const response = await axios.post('/purchaseMembership', {
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
    const response = await axios.post('/addpurchaseMembershipData', {
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
    const response = await axios.post('/getMembershipData', {
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
    const response = await axios.post('/requestCancelMembership', {
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
    const response = await axios.post('/generateInvoice', {
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
    const response = await axios.get('/getPointsWallet');
      // console.log(response);
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
    const response = await axios.post('/walletTransactionData', {
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
    const response = await axios.post('/changePayAsYouGo', {
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
    const response = await axios.post('/walletTopupProfessional', {
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
    const response = await axios.post('/addWalletTopupProfessional', {
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

async function showLeads({ userId}){
  try{
    const response = await axios.post('/showLeads', {
      userId
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
    const response = await axios.post('/showSingleProjectLead', {
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
    const response = await axios.post('/payAsYouGoProject', {
      professionalId,
      projectId
      });
      // console.log(response);
      return(response);
  }
  catch(e){
    // console.log(e);
    return(e);
  }
}

async function payAsGoSessionData({sessionId}){
  try{
    const response = await axios.post('/addPayAsYouGoProjectDetails', {
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
    const response = await axios.post('/projectFilter', {
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
    const response = await axios.post('/postProject', {
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
    const response = await axios.post('/professionalCheckBid', {
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
    const response = await axios.post('/confirmBid', {
      professionalId,
        projectId,
        proposal,
        proposalType
      });
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
    const response = await axios.post('/getAwardedDetails', {
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
    const response = await axios.post('/showAllAwardedProf', {
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
    const response = await axios.post('/markAsAwarded', {
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
    const response = await axios.post('/markAsCompleted', {
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
    const response = await axios.post('/clientReviewSubmitting', {
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
    const response = await axios.post('/professionalReviewSubmitting', {
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
    const response = await axios.post('/getSingleProjectClient', {
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
    const response = await axios.post('/awardProject', {
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
    const response = await axios.post('/cancelProject', {
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
    const response = await axios.post('/acceptAwardedProjects', {
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
    const response = await axios.post('/addProjectTaskList', {
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
    const response = await axios.post('/projectHistory', {
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
    const response = await axios.post('/logout', {
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
    const response = await axios.post('/userChatDetails', {
      userId,userType
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
      signinProfessional,
      sendPhoneOtp,
      sendEmailOtp,
      verifyPhoneOtp,
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
      AllProjectHistory
       }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
