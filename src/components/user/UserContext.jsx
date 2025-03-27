import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    avatar: "",
  });

  // Dùng useMemo để chỉ thay đổi khi avatar thay đổi
  const contextValue = useMemo(() => ({ userProfile, setUserProfile }), [userProfile.avatar]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
