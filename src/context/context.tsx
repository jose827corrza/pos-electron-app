import { createContext, useState } from 'react';

export interface Context {
  isDarkMode: boolean;
  toggleDarkMode: (state: boolean) => void;
  count: number;
  incrementCount: () => void;
}



export const appContext = createContext<{count: Context['count'], toggleDarkMode?: Context['toggleDarkMode'], isDarkMode?: Context['isDarkMode'], incrementCount?: Context['incrementCount']} | null>(null);

export const AppContextProvider:React.FC<React.ReactNode> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [count, setCount] = useState(0);

  const toggleDarkMode = (newColor: boolean) => {
    setIsDarkMode(newColor);
  }

  const incrementCount = () => {
    setCount(count + 1);
  }
    return (
        <appContext.Provider value={{isDarkMode, toggleDarkMode, count, incrementCount}}>
            {children}
        </appContext.Provider>
    )
}
