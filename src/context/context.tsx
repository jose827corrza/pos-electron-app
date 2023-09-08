import { createContext, useState } from 'react';

export interface Context {
  isDarkMode: boolean;
  toggleDarkMode: (state: boolean) => void;
  count: number;
  incrementCount: () => void;
  Auth: Auth
  uid: string
  setUserId: (usrId: string) => void
}

export interface Auth {
  uid: string;
}



export const appContext = createContext<{ uid: Context['uid'], setUserId: Context['setUserId'], Auth: Context['Auth'] ,count: Context['count'], toggleDarkMode?: Context['toggleDarkMode'], isDarkMode?: Context['isDarkMode'], incrementCount?: Context['incrementCount']} | null>(null);

export const AppContextProvider:React.FC<React.ReactNode> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [count, setCount] = useState(0);
  const [uid, setUid] = useState('');

  const toggleDarkMode = (newColor: boolean) => {
    setIsDarkMode(newColor);
  }

  const incrementCount = () => {
    setCount(count + 1);
  }

  const setUserId = (usrId: string) => {
    setUid(usrId)
  }
    return (
        <appContext.Provider value={{isDarkMode, toggleDarkMode, count, incrementCount, uid, setUserId}}>
            {children}
        </appContext.Provider>
    )
}
