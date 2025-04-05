import { useContext } from "react";
import AppContext from "./AppContext";

const useApp = () => useContext(AppContext);

export default useApp;
