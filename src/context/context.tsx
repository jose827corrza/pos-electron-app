import { Auth } from 'firebase/auth';
import { createContext, useState } from 'react';

export interface Contexto {
  isDarkMode: boolean;
  toggleDarkMode: (state: boolean) => void;
  count: number;
  incrementCount: () => void;
  auth: Auth | undefined
  uid: string
  setUserId: (usrId: string) => void
  setAuthUser: (auth: Auth) => void
}

// export interface Auth {
//   id: string;
// }



// export const appContext = createContext<{ uid: Context['uid'], setUserId: Context['setUserId'], Auth: Context['Auth'] ,count: Context['count'], toggleDarkMode?: Context['toggleDarkMode'], isDarkMode?: Context['isDarkMode'], incrementCount?: Context['incrementCount']} | null>(null);
export const appContext = createContext< Contexto | null>(null);

export const AppContextProvider:React.FC<React.ReactNode> = ({children}) => {
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [count, setCount] = useState(0);
  const [uid, setUid] = useState('');
  const [auth, setAuth] = useState<Auth>();

  const toggleDarkMode = (newColor: boolean) => {
    setIsDarkMode(newColor);
  }

  const incrementCount = () => {
    setCount(count + 1);
  }

  const setUserId = (usrId: string) => {
    setUid(usrId)
  }

  const setAuthUser = (auth: Auth) => {
    setAuth(auth);
  }

    return (
        <appContext.Provider value={{auth, setAuthUser, isDarkMode, toggleDarkMode, count, incrementCount, uid, setUserId}}>
            {children}
        </appContext.Provider>
    )
}
