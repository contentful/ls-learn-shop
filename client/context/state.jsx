import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const useSharedState = () => {
  const mainContext = useContext(AppContext);
  if (!mainContext) {
    throw new Error("has to be in AppContext");
  }

  return mainContext;
};

const AppContextProvider = ({ children }) => {
  const [xrayMode, setXrayMode] = useState(false);
  const [sharedState, setSharedState] = useState({ xrayMode: false });

  return (
    <AppContext.Provider
      setXrayMode={setXrayMode}
      value={{ xrayMode, setXrayMode }}
    >
      {children}
    </AppContext.Provider>
  );
};

// export function AppWrapper({ children }) {
//   const [xrayMode, setXrayMode] = useState(false);
//   const [sharedState, setSharedState] = useState({ xrayMode: false });

//   return (
//     <AppContext.Provider value={sharedState}>{children} </AppContext.Provider>
//   );
// }

export { AppContextProvider, useSharedState };

// export function useAppContext() {
//   return useContext(AppContext);
// }
