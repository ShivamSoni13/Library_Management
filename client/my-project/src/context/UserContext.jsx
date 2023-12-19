import { createContext, useState } from "react";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [filter,setFilter]=useState("");
  const [customers,setCustomers]=useState([]);

  return (
    <UserContext.Provider value={{ user, setUser,filter,setFilter,customers,setCustomers }}>
      {children}
    </UserContext.Provider>
  );
};
