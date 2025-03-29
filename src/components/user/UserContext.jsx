import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    avatar: "",
  });

  // Dùng useMemo để chỉ thay đổi khi avatar thay đổi
  const contextValue = useMemo(
    () => ({ userProfile, setUserProfile }),
    [userProfile]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useUser = () => useContext(UserContext);
