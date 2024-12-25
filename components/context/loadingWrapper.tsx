import React, { useState, FC, useContext } from "react";

type loadingType = boolean;

interface LoadingContextType {
  loading: loadingType;
  setLoading: React.Dispatch<React.SetStateAction<loadingType>>;
}

interface Props {
  children: React.ReactNode;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

const LoadingHolder: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext=()=>useContext(LoadingContext)

export default LoadingHolder
