import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user : true,
  isCurrentUserBlocked : false,
  isReceiverBlocked : false,


  changeChat : (chatId, user) =>{
    let currentUser =  useUserStore.getState().currentUser;
    if(user?.bloacked?.includes(currentUser?.id)){
      return  set({
        chatId ,
        user : true,
        isCurrentUserBlocked : true,
        isReceiverBlocked : false,
      })
    }

    //Check if reciver is blocked
    else if(currentUser?.bloacked?.includes(user.id)){
      return  set({
        chatId ,
        user : user,
        isCurrentUserBlocked : false,
        isReceiverBlocked : true,

      })
    }
    else{
      return  set({  
        chatId ,
        user ,
        isCurrentUserBlocked : false,
        isReceiverBlocked : false,
      })
    }

  },

  changeBlock : ()=>{
    set(state =>({...state, isReceiverBlocked : !state.isReceiverBlocked}))
  }

}))