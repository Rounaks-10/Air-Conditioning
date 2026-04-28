import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // 🔥 load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
    }
  })

  return (
    <AppContext.Provider value={{ token, setToken,navigate }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;