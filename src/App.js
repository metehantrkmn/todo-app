import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/Home";
import Signup from "./layout/Signup";
import Login from "./layout/Login";
import ConditionalRouters from "./components/ConditionalRouters";
import { createContext, useState } from "react";
import FileNotFound from "./pages/FileNotFound";
import { useContext } from "react";

export const UserContext = createContext();

function AuthenticationContext({ children, auth, setAuth }) {
  return (
    <UserContext.Provider
      value={{ authentication: auth, setAuthentication: setAuth }}
    >
      {children}
    </UserContext.Provider>
  );
}

function App() {
  const [authenticated, setIsAuthenticated] = useState(false);

  function setAuthentication() {
    setIsAuthenticated(!authenticated);
  }

  return (
    /* 
    <Routes>
      <Route exact path="/Home" element={<Home />} />
      <Route exact path="/Signup" element={<Signup />} />
      <Route exact path="/Login" element={<Login />} />
    </Routes> */
    <>
      <AuthenticationContext auth={authenticated} setAuth={setAuthentication}>
        {/* <ConditionalRouters token={null}></ConditionalRouters> */}
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<FileNotFound />} />
        </Routes>
        {console.log(authenticated)}
      </AuthenticationContext>
    </>
  );
}

export default App;
