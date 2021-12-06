import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

import api from "../pages/api/api";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      let storedUser;
      if (localStorage.getItem("user"))
        storedUser = JSON.parse(localStorage.getItem("user")) || null;
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }
      if (storedUser) setUser(storedUser);
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api
        .post("/login", { username, password })
        .then((res) => res)
        .catch((err) => err.response.data);
      console.log("res", res);
      if (res.status !== 201) throw res.message;
      const { token, ...temp } = res.data;
      if (token) {
        console.log("Got token");
        Cookies.set("token", token, { expires: 3000 });
        api.defaults.headers.Authorization = `Bearer ${token.token}`;
        const user = { token, ...temp };
        localStorage.setItem("user", JSON.stringify(temp));
        setUser(user);
        console.log("Got user", user);
      }
    } catch (error) {
      console.log("in catch auth.js");
      throw error;
    }
  };
  const signUp = async (email, username, password, phoneNumber) => {
    const res = await api
      .post("/register", {
        email,
        username,
        password,
        phoneNumber
      })
      .then((res) => res)
      .catch((err) => err.response.data);
    console.log("res", res);
    if (res.status !== 201) throw res.message;
    const { token, ...temp } = res.data;
    if (token) {
      console.log("Got token");
      Cookies.set("token", token, { expires: 3000 });
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
      const user = { token, ...temp };
      localStorage.setItem("user", JSON.stringify(temp));
      setUser(user);
      console.log("Got user signup", user);
    }
  };

  const logout = (username, password) => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    delete api.defaults.headers.Authorization;
    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }) => {
//     const router = useRouter()
//     // if (typeof window === 'undefined') {
//     //   global.window = {};
//     // }
//   const { isAuthenticated, isLoading } = useAuth();
//   if (
//     isLoading ||
//     (!isAuthenticated && history.basePath !== "/sign-in")
//   ) {
//     return (
//       <div>
//         <Loader active inline="centered" />
//       </div>
//     );
//   }
//   return children;
// };
