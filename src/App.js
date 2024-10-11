import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SuperAdmin from "./components/SuperAdmin";
import SignUpPage from "./components/CreateAdmin";
import AdminData from "./components/AdminData";
import Successfull from "./components/Successfull";
import Utility from "./components/Utility";
import Wallet from "./components/Wallet";
import DataAdmin from "./components/DataAdmin";
import GameHistory from "./components/GameHistory";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        {children} 
      </div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  React.useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<SuperAdmin />} />
      <Route
        path="*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/create" element={<SignUpPage />} />
              <Route path="/admindata" element={<AdminData />} />
              <Route path="/success" element={<Successfull />} />
              <Route path="/utility" element={<Utility />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dataadmin" element={<DataAdmin />} />
              <Route path="/gamehistory" element={<GameHistory />} />

            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
