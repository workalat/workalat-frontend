import { create } from 'zustand'


export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading : true,
  fetchUserInfo : async (uid) =>{
    if(!uid){
        return set({currentUser : null, isLoading : false});
    }
    try{
      
      const token = Cookies.get("token");
      const pathSegment = pathname.split("/")[1];

      if(pathSegment === "login" || pathSegment === "register"){
        return set({currentUser : null, isLoading : false});
      }
      if (!token) {
        set({currentUser : null, isLoading : false});

        return;
      }
      
      let ver = await VerifyUser(token, pathSegment);

      if (ver.status === "success") {
        set({currentUser : {
          avatar : ver.userPicture,
          email : ver.userEmail,
          id : ver.userId,
          username : ver.userName
        }, isLoading : false});
      } else {
        set({currentUser : null, isLoading : false});
        setLoading2(false);
      }

        // let docRef = doc(db, "users", uid);
        // let docSnap = await getDoc(docRef);

        // if(docSnap.exists()){
        //     set({currentUser : docSnap.data(), isLoading : false});
        // }else{
            
        //     set({currentUser : null, isLoading : false});
        // }
    }
    catch(e){
        console.log(e);
      set({currentUser : null ,isLoading : false});
    }
  }
}))